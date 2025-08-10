import React, { useState, forwardRef, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { TextLayerData } from "./TextLayer";

export const LogoPreview = forwardRef<HTMLDivElement, {
  Icon?: React.ComponentType<any>;
  size?: number;
  color?: string;
  borderWidth?: number;
  rotate?: number;
  bgRounded?: number;
  bgPadding?: number;
  bgShadow?: number;
  bgColor?: string;
  fillColor?: string;
  fillOpacity?: number;
  textLayers?: TextLayerData[];
  selectedTextId?: string | null;
  setSelectedTextId?: (id: string | null) => void;
  updateTextLayer?: (id: string, updates: Partial<TextLayerData>) => void;
}>(({
  Icon = undefined,
  size = 256,
  color = "#fd7200",
  borderWidth = 8,
  rotate = 0,
  bgRounded = 24,
  bgPadding = 0,
  bgShadow = 2,
  bgColor = "#ffffff",
  fillColor = "#ffffff",
  fillOpacity = 1,
  textLayers = [],
  selectedTextId = null,
  setSelectedTextId = () => {},
  updateTextLayer = () => {},
}, ref) => {
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState(600);

  const shadowMap = [
    "shadow-none",
    "shadow-sm",
    "shadow-md",
    "shadow-lg",
    "shadow-xl",
    "shadow-2xl",
  ];
  const shadowClass = shadowMap[bgShadow] || "shadow-md";

  const getCanvasSize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 300; // sm
      if (width < 768) return 400; // md
      if (width < 1024) return 500; // lg
      return 600; // xl and above
    }
    return 600; // default
  };

  useEffect(() => {
    const updateCanvasSize = () => {
      setCanvasSize(getCanvasSize());
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const CANVAS_SIZE = canvasSize;
  const bgSize = CANVAS_SIZE - 2 * bgPadding;

  const handleTextMouseDown = (e: React.MouseEvent | React.TouchEvent, layer: TextLayerData) => {
    e.stopPropagation();
    setSelectedTextId(layer.id);
    
    const rect = (ref as any)?.current?.getBoundingClientRect();
    if (rect) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      setDragOffset({
        x: clientX - rect.left - layer.x,
        y: clientY - rect.top - layer.y
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent | TouchEvent) => {
    if (!isDragging || !selectedTextId) return;

    const rect = (ref as any)?.current?.getBoundingClientRect();
    if (rect) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const newX = clientX - rect.left - dragOffset.x;
      const newY = clientY - rect.top - dragOffset.y;

      updateTextLayer(selectedTextId, {
        x: Math.max(0, Math.min(bgSize - 100, newX)),
        y: Math.max(0, Math.min(bgSize - 50, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('touchmove', handleMouseMove as any, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('touchmove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, selectedTextId, dragOffset, updateTextLayer]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === (ref as any)?.current) {
      setSelectedTextId(null);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`relative flex items-center justify-center overflow-hidden rounded-lg border border-border bg-background w-full max-w-full`}
            style={{
              width: CANVAS_SIZE,
              height: CANVAS_SIZE,
              maxWidth: '100%',
              maxHeight: '100%',
              aspectRatio: '1 / 1',
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleCanvasClick}
          >
            <div
              ref={ref}
              className={`flex items-center justify-center ${shadowClass} transition-all duration-200 relative`}
              style={{
                width: bgSize,
                height: bgSize,
                background: bgColor,
                borderRadius: bgRounded,
              }}
            >
              {Icon && (
                <Icon
                  size={size}
                  stroke={color}
                  strokeWidth={borderWidth}
                  fill={fillColor}
                  fillOpacity={fillOpacity}
                  style={{
                    transform: `rotate(${rotate}deg)`,
                    display: "block",
                  }}
                />
              )}

              {textLayers.map((layer) => (
                <div
                  key={layer.id}
                  className={`absolute pointer-events-auto cursor-move select-none ${
                    selectedTextId === layer.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{
                    left: layer.x,
                    top: layer.y,
                    transform: `rotate(${layer.rotation}deg)`,
                    fontFamily: layer.fontFamily,
                    fontSize: layer.fontSize,
                    fontWeight: layer.fontWeight,
                    color: layer.color,
                    textAlign: layer.textAlign as any,
                    opacity: layer.opacity,
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseDown={(e) => handleTextMouseDown(e, layer)}
                  onTouchStart={(e) => handleTextMouseDown(e, layer)}
                >
                  {layer.text}
                </div>
              ))}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
          <p className="text-xs">Downloadable zone</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

LogoPreview.displayName = "LogoPreview";
