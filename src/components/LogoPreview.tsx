import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

// Accept props for icon, size, color, border, rotation, and background
export function LogoPreview({
  Icon = undefined, // React component for the icon
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
}: {
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
}) {
  const [hovered, setHovered] = useState(false);

  // Tailwind shadow classes
  const shadowMap = [
    "shadow-none",
    "shadow-sm",
    "shadow-md",
    "shadow-lg",
    "shadow-xl",
    "shadow-2xl",
  ];
  const shadowClass = shadowMap[bgShadow] || "shadow-md";

  // Canvas size
  const CANVAS_SIZE = 500;
  const bgSize = CANVAS_SIZE - 2 * bgPadding;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`relative flex items-center justify-center border-dashed border-2 overflow-hidden`}
            style={{
              width: CANVAS_SIZE,
              height: CANVAS_SIZE,
              minWidth: CANVAS_SIZE,
              minHeight: CANVAS_SIZE,
              maxWidth: CANVAS_SIZE,
              maxHeight: CANVAS_SIZE,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Background layer */}
            <div
              className={`flex items-center justify-center ${shadowClass}`}
              style={{
                width: bgSize,
                height: bgSize,
                background: bgColor,
                borderRadius: bgRounded,
                transition: "all 0.2s",
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
        <TooltipContent className="px-3 py-1 rounded-md bg-accent">
          <p className="text-xs">Downloadable zone</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
