import React, { useState, forwardRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
}, ref) => {
  const [hovered, setHovered] = useState(false);

  const shadowMap = [
    "shadow-none",
    "shadow-sm",
    "shadow-md",
    "shadow-lg",
    "shadow-xl",
    "shadow-2xl",
  ];
  const shadowClass = shadowMap[bgShadow] || "shadow-md";

  const CANVAS_SIZE = 600;
  const bgSize = CANVAS_SIZE - 2 * bgPadding;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`relative flex items-center justify-center overflow-hidden rounded-lg border border-border bg-background`}
            style={{
              width: CANVAS_SIZE,
              height: CANVAS_SIZE,
              minWidth: CANVAS_SIZE,
              minHeight: CANVAS_SIZE,
              maxWidth: CANVAS_SIZE,
              maxHeight: CANVAS_SIZE,
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Background layer */}
            <div
              ref={ref}
              className={`flex items-center justify-center ${shadowClass} transition-all duration-200`}
              style={{
                width: bgSize,
                height: bgSize,
                background: bgColor,
                borderRadius: bgRounded,
              }}
            >
              {/* Centered icon */}
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
