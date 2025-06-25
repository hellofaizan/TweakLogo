"use client";

import * as LucideIconsImport from "lucide-react";
import React, { useMemo, useState, useRef } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import iconNodesJson from "lucide-static/icon-nodes.json";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { TooltipProvider } from "./ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

const LucideIcons = LucideIconsImport as unknown as Record<
  string,
  React.ComponentType<any>
>;

// Get all Lucide icon names from lucide-static
const ALL_ICON_NAMES = Object.keys(iconNodesJson);
const iconNodes = iconNodesJson as Record<string, any>;

function renderLucideSvg(
  iconNode: any,
  size: number = 32,
  color: string = "currentColor"
) {
  // iconNode is an array of [tag, attrs]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      {iconNode.map(([tag, attrs]: [string, any], i: number) =>
        // eslint-disable-next-line react/jsx-key
        React.createElement(tag, { ...attrs, key: i })
      )}
    </svg>
  );
}

export function IconControls({
  iconName,
  setIconName,
  size,
  setSize,
  rotate,
  setRotate,
  borderWidth,
  setBorderWidth,
  color,
  setColor,
  fillColor,
  setFillColor,
  fillOpacity,
  setFillOpacity,
}: {
  iconName: string;
  setIconName: (name: string) => void;
  size: number;
  setSize: (size: number) => void;
  rotate: number;
  setRotate: (deg: number) => void;
  borderWidth: number;
  setBorderWidth: (w: number) => void;
  color: string;
  setColor: (c: string) => void;
  fillColor: string;
  setFillColor: (c: string) => void;
  fillOpacity: number;
  setFillOpacity: (o: number) => void;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(60); // Show 60 icons initially
  const gridRef = useRef<HTMLDivElement>(null);
  const [fillOpen, setFillOpen] = useState(false);
  const [borderOpen, setBorderOpen] = useState(true);

  // Use all icon names from lucide-static, filter by search
  const iconEntries = useMemo(
    () =>
      ALL_ICON_NAMES.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  // Reset visibleCount when search changes
  React.useEffect(() => {
    setVisibleCount(60);
  }, [search]);

  // Handler to load more icons on scroll
  const handleScroll = () => {
    const grid = gridRef.current;
    if (grid && grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 100) {
      setVisibleCount((prev) => Math.min(prev + 60, iconEntries.length));
    }
  };

  const Icon = LucideIcons[iconName];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <button
          className="p-2 border rounded"
          onClick={() => setSheetOpen(true)}
        >
          <Icon size={32} />
        </button>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button
              className="ml-2 px-2 py-1 border rounded text-xs"
              onClick={() => setSheetOpen(true)}
            >
              Browse Icons
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-5">
            <SheetHeader>
              <SheetTitle>Select an Icon</SheetTitle>
            </SheetHeader>
            <input
              type="text"
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-4"
            />
            <TooltipProvider>
              <div
                className="grid grid-cols-5 gap-4 overflow-y-auto"
                ref={gridRef}
                onScroll={handleScroll}
              >
                {iconEntries.slice(0, visibleCount).map((name:string) => (
                  <Tooltip key={name}>
                    <TooltipTrigger>
                      <div
                        className={`flex flex-col items-center p-2 border rounded cursor-pointer ${
                          iconName.toLowerCase() === name.toLowerCase()
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                        onClick={() => {
                          setIconName(
                            name.charAt(0).toUpperCase() + name.slice(1)
                          );
                          setSheetOpen(false);
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={name}
                        onKeyDown={e => {
                          if (e.key === "Enter" || e.key === " ") {
                            setIconName(
                              name.charAt(0).toUpperCase() + name.slice(1)
                            );
                            setSheetOpen(false);
                          }
                        }}
                      >
                        {renderLucideSvg(
                          (iconNodes as Record<string, any>)[name],
                          32
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-accent px-3 py-1 rounded-md">
                      <p className="text-xs">{name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <label className="block text-xs mb-1">Size</label>
        <input
          type="range"
          step={1}
          min={100}
          max={500}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full range range-lg"
        />
        <div className="text-right text-xs">{size} px</div>
      </div>
      <div>
        <label className="block text-xs mb-1">Rotate</label>
        <input
          type="range"
          min={-180}
          max={180}
          value={rotate}
          onChange={(e) => setRotate(Number(e.target.value))}
          className="w-full range range-lg"
        />
        <div className="text-right text-xs">{rotate}&deg;</div>
      </div>
      <div>
        <label className="block text-xs mb-1">Border width</label>
        <input
          type="range"
          min={0}
          max={4}
          step={0.1}
          value={borderWidth}
          onChange={(e) => setBorderWidth(Number(e.target.value))}
          className="w-full range range-lg"
        />
        <div className="text-right text-xs">{borderWidth} px</div>
      </div>
      <Collapsible open={borderOpen} onOpenChange={setBorderOpen}>
        <CollapsibleTrigger asChild>
          <button className="flex items-center gap-2 text-md font-medium hover:bg-accent p-2 rounded transition-colors">
            {borderOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            Border Color
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-2">
          <div className="w-full bg-[#202020] border border-border rounded-md shadow-sm overflow-hidden">
            <ColorPicker
              value={color}
              onChange={setColor}
              height={110}
              hideColorTypeBtns={true}
              hideInputType={true}
              hideAdvancedSliders={true}
              hideColorGuide={true}
              presets={[
                "rgba(255, 255, 255, 1)",
                "rgba(0, 0, 0, 1)",
                "rgba(255, 0, 0, 1)",
                "rgba(0, 255, 0, 1)",
                "rgba(0, 0, 255, 1)",
                "rgba(255, 255, 255, 0.5)",
                "rgba(0, 0, 0, 0.5)",
                "rgba(255, 0, 0, 0.5)",
                "rgba(0, 255, 0, 0.5)",
                "rgba(0, 0, 255, 0.5)",
                "rgba(255, 255, 255, 0.25)",
                "rgba(0, 0, 0, 0.25)",
                "rgba(255, 0, 0, 0.25)",
                "rgba(0, 255, 0, 0.25)",
                "rgba(0, 0, 255, 0.25)",
              ]}
              className="rounded-md p-2"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible open={fillOpen} onOpenChange={setFillOpen}>
        <CollapsibleTrigger asChild>
          <button className="flex items-center gap-2 text-md font-medium hover:bg-accent p-2 rounded transition-colors">
            {fillOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            Fill Settings
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-2">
          <div>
            <label className="block text-xs mb-1">
              Fill opacity <span className="float-right">{Math.round(fillOpacity * 100)}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={fillOpacity}
              onChange={e => setFillOpacity(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="bg-[#202020] border border-border rounded-md shadow-sm">
            <ColorPicker
              value={fillColor}
              onChange={setFillColor}
              height={110}
              hideColorTypeBtns={true}
              hideInputs={true}
              hideOpacity={false}
              hideHue={false}
              hideAdvancedSliders={true}
              hideColorGuide={true}
              hideInputType={true}
              className="rounded-md p-2"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
// To use all Lucide icons, install lucide-static:
// yarn add lucide-static
