"use client";

import * as LucideIconsImport from "lucide-react";
import * as TablerIconsImport from "@tabler/icons-react";
import React, { useMemo, useState, useRef } from "react";
import dynamic from "next/dynamic";
import iconNodesJson from "lucide-static/icon-nodes.json";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
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
import {
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const DEFAULT_ICON_LUCIDE = "Zap";
const DEFAULT_ICON_TABLER = "IconZap";

const LucideIcons = LucideIconsImport as unknown as Record<
  string,
  React.ComponentType<any>
>;

const TablerIcons = TablerIconsImport as unknown as Record<
  string,
  React.ComponentType<any>
>;

const ALL_ICON_NAMES = Object.keys(iconNodesJson);
const iconNodes = iconNodesJson as Record<string, any>;

const solidPresets = [
  "#080166",
  "#0974f1",
  "#f3f520",
  "#59d102",
  "#f40752",
  "#f74c06",
  "#c11e38",
  "#f83d5c",
  "#b94c98",
  "#7f0012",
  "#f97d5b",
  "#020344",
  "#0968e5",
  "#FF7554",
  "#AF33F2",
  "#F2B705",
];

const ColorPicker = dynamic(() => import("react-best-gradient-color-picker"), {
  ssr: false,
});

function renderLucideSvg(
  iconNode: any,
  size: number = 32,
  color: string = "currentColor"
) {
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
        React.createElement(tag, { ...attrs, key: i })
      )}
    </svg>
  );
}

function toPascalCase(str: string) {
  return str.replace(/(^|_|-)(\w)/g, (_, __, c) => (c ? c.toUpperCase() : ""));
}

export function IconControls({
  iconName,
  setIconName,
  iconLibrary,
  setIconLibrary,
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
  setBgColor,
  setBgPadding,
  setBgRounded,
  setBgShadow,
}: {
  iconName: string;
  setIconName: (name: string) => void;
  iconLibrary: "lucide" | "tabler";
  setIconLibrary: (lib: "lucide" | "tabler") => void;
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
  setBgColor: (c: string) => void;
  setBgPadding: (v: number) => void;
  setBgRounded: (v: number) => void;
  setBgShadow: (v: number) => void;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const [fillOpen, setFillOpen] = useState(false);
  const [borderOpen, setBorderOpen] = useState(true);
  const iconTab = iconLibrary;
  const setIconTab = setIconLibrary;
  const [activeTab, setActiveTab] = useState<"icons" | "saved">("icons");
  const [savedIcons, setSavedIcons] = useState<any[]>([]);

  const lucideIconEntries = useMemo(
    () =>
      ALL_ICON_NAMES.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const tablerIconEntries = useMemo(
    () =>
      Object.keys(TablerIcons)
        .filter((name) => !name.includes("Filled"))
        .filter((name) => name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  React.useEffect(() => {
    setVisibleCount(100);
  }, [search]);

  const handleScroll = () => {
    const grid = gridRef.current;
    if (grid && grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 100) {
      setVisibleCount((prev) => Math.min(prev + 60, lucideIconEntries.length));
    }
  };

  const LucideIcon = LucideIcons[iconName];
  const TablerIcon = TablerIcons[iconName];
  const Icon = iconTab === "lucide" ? LucideIcon : TablerIcon;
  if (!Icon) {
    console.warn(
      "Icon not found:",
      iconName,
      "Available:",
      iconTab === "lucide" ? Object.keys(LucideIcons) : Object.keys(TablerIcons)
    );
  }

  React.useEffect(() => {
    if (sheetOpen && activeTab === "saved") {
      try {
        setSavedIcons(
          JSON.parse(localStorage.getItem("logotweak-saved-icons") || "[]")
        );
      } catch {
        setSavedIcons([]);
      }
    }
  }, [sheetOpen, activeTab]);

  return (
    <div className="space-y-6">
      {/* Icon Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            className="w-10 h-10 border border-border rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
            onClick={() => setSheetOpen(true)}
          >
            {Icon ? (
              <Icon size={20} />
            ) : (
              <span className="text-xs text-red-500">?</span>
            )}
          </button>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 h-10 justify-start"
                onClick={() => setSheetOpen(true)}
              >
                <Search className="w-4 h-4 mr-2" />
                Browse Icons
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4 w-96">
              <SheetHeader className="py-2">
                <SheetTitle>Select an Icon</SheetTitle>
                <SheetDescription>
                  Browse and select an icon from the list below.
                </SheetDescription>
              </SheetHeader>

              {/* Icon library buttons and Saved button */}
              <div className="flex gap-2 mb-4">
                <button
                  className={`px-3 py-1 rounded border cursor-pointer ${
                    iconTab === "lucide" && activeTab !== "saved"
                      ? "bg-primary text-white"
                      : "bg-muted"
                  }`}
                  onClick={() => {
                    setActiveTab("icons");
                    setIconTab("lucide");
                  }}
                >
                  Lucide
                </button>
                <button
                  className={`px-3 py-1 rounded border cursor-pointer ${
                    iconTab === "tabler" && activeTab !== "saved"
                      ? "bg-primary text-white"
                      : "bg-muted"
                  }`}
                  onClick={() => {
                    setActiveTab("icons");
                    setIconTab("tabler");
                  }}
                >
                  Tabler
                </button>
                <button
                  className={`ml-auto px-3 py-1 rounded border cursor-pointer ${
                    activeTab === "saved" ? "bg-primary text-white" : "bg-muted"
                  }`}
                  onClick={() => setActiveTab("saved")}
                >
                  Saved
                </button>
              </div>

              <TooltipProvider>
                <React.Fragment>
                  {activeTab === "saved" ? (
                    <div className="grid grid-cols-3 gap-4 overflow-y-auto p-2 max-h-[60vh]">
                      {savedIcons.length === 0 && (
                        <div className="col-span-5 text-center text-muted-foreground py-8">
                          No saved icons yet.
                        </div>
                      )}
                      {savedIcons.map((item) => {
                        const IconComp =
                          item.iconLibrary === "lucide"
                            ? LucideIcons[item.iconName]
                            : TablerIcons[item.iconName];
                        return (
                          <div
                            key={item.id}
                            className="group relative flex flex-col items-center p-2 border rounded cursor-pointer hover:ring-2 hover:ring-primary transition bg-transparent"
                            onClick={() => {
                              setIconName(item.iconName);
                              setIconLibrary(item.iconLibrary);
                              setSize(item.iconSize);
                              setRotate(item.iconRotate);
                              setBorderWidth(item.iconBorderWidth);
                              setColor(item.iconColor);
                              setFillColor(item.fillColor);
                              setFillOpacity(item.fillOpacity);
                              if (setBgColor) setBgColor(item.bgColor);
                              if (setBgPadding) setBgPadding(item.bgPadding);
                              if (setBgRounded) setBgRounded(item.bgRounded);
                              if (setBgShadow) setBgShadow(item.bgShadow);
                              setSheetOpen(false);
                            }}
                          >
                            <div
                              className="flex items-center justify-center w-14 h-14 mb-1"
                              style={{
                                background: item.bgColor,
                                borderRadius: item.bgRounded,
                                boxShadow: item.bgShadow
                                  ? "0 2px 8px #0002"
                                  : undefined,
                              }}
                            >
                              {IconComp ? (
                                <IconComp
                                  size={32}
                                  stroke={item.iconColor}
                                  strokeWidth={item.iconBorderWidth}
                                  fill={item.fillColor}
                                  fillOpacity={item.fillOpacity}
                                  style={{
                                    transform: `rotate(${item.iconRotate}deg)`,
                                  }}
                                />
                              ) : (
                                <span className="text-xs text-red-500">
                                  Icon not found
                                </span>
                              )}
                            </div>

                            {/* Delete Button - appears on hover */}
                            <button
                              className="absolute -bottom-1 -right-1 w-8 h-8 cursor-pointer rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                const newSavedIcons = savedIcons.filter(
                                  (savedIcon) => savedIcon.id !== item.id
                                );
                                setSavedIcons(newSavedIcons);
                                localStorage.setItem(
                                  "logotweak-saved-icons",
                                  JSON.stringify(newSavedIcons)
                                );
                                toast.success("Icon deleted successfully!");
                              }}
                              title="Delete icon"
                            >
                              <Trash2
                                size={16}
                                className="text-red-500 hover:text-red-600"
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search icons..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div
                        className="grid grid-cols-5 gap-4 overflow-y-auto p-0.5 max-h-[60vh]"
                        ref={gridRef}
                        onScroll={handleScroll}
                      >
                        {(iconTab === "lucide"
                          ? lucideIconEntries
                          : tablerIconEntries
                        )
                          .slice(0, visibleCount)
                          .map((name) => (
                            <Tooltip key={name}>
                              <TooltipTrigger>
                                <div
                                  className={`flex flex-col items-center p-2 border rounded cursor-pointer ${
                                    iconName === toPascalCase(name)
                                      ? "ring-2 ring-primary bg-primary/10"
                                      : "hover:bg-muted"
                                  }`}
                                  onClick={() => {
                                    setIconName(toPascalCase(name));
                                    setIconLibrary(iconTab);
                                    setSheetOpen(false);
                                  }}
                                  tabIndex={0}
                                  role="button"
                                  aria-label={name}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      setIconName(
                                        iconTab === "tabler"
                                          ? "Icon" + toPascalCase(name)
                                          : toPascalCase(name)
                                      );
                                      setIconLibrary(iconTab);
                                      setSheetOpen(false);
                                    }
                                  }}
                                >
                                  {iconTab === "lucide" ? (
                                    renderLucideSvg(
                                      (iconNodes as Record<string, any>)[name],
                                      32
                                    )
                                  ) : TablerIcons[toPascalCase(name)] ? (
                                    React.createElement(
                                      TablerIcons[toPascalCase(name)],
                                      { size: 32 }
                                    )
                                  ) : (
                                    <span className="text-xs text-red-500">
                                      Icon not found
                                    </span>
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
                                <p className="text-xs">{name}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                      </div>
                    </>
                  )}
                </React.Fragment>
              </TooltipProvider>
              <SheetFooter>
                {(iconTab === "lucide"
                  ? visibleCount < lucideIconEntries.length
                  : visibleCount < tablerIconEntries.length) && (
                  <button
                    className="mt-4 px-4 py-2 bg-accent rounded w-full"
                    onClick={() =>
                      setVisibleCount((prev) =>
                        Math.min(
                          prev + 60,
                          iconTab === "lucide"
                            ? lucideIconEntries.length
                            : tablerIconEntries.length
                        )
                      )
                    }
                  >
                    Load More
                  </button>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Size Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Size</label>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{size} px</span>
            <button
              aria-label="Reset size"
              className="text-xs cursor-pointer px-1 text-muted-foreground hover:text-primary focus:outline-none"
              type="button"
              onClick={() => setSize(400)}
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
        <input
          type="range"
          step={1}
          min={100}
          max={500}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full range cursor-pointer range-lg range-primary"
        />
      </div>

      {/* Rotate Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Rotate</label>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{rotate}&deg;</span>
            <button
              aria-label="Reset rotate"
              className="text-xs cursor-pointer px-1 text-muted-foreground hover:text-primary focus:outline-none"
              type="button"
              onClick={() => setRotate(0)}
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
        <input
          type="range"
          min={-180}
          max={180}
          value={rotate}
          onChange={(e) => setRotate(Number(e.target.value))}
          className="w-full range cursor-pointer range-lg range-primary"
        />
      </div>

      {/* Border Width Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Border width</label>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{borderWidth} px</span>
            <button
              aria-label="Reset border width"
              className="text-xs cursor-pointer px-1 text-muted-foreground hover:text-primary focus:outline-none"
              type="button"
              onClick={() => setBorderWidth(0)}
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={4}
          step={0.1}
          value={borderWidth}
          onChange={(e) => setBorderWidth(Number(e.target.value))}
          className="w-full range cursor-pointer range-lg range-primary"
        />
      </div>

      {/* Border Color */}
      <Collapsible open={borderOpen} onOpenChange={setBorderOpen}>
        <CollapsibleTrigger asChild>
          <button className="flex items-center gap-2 text-sm font-medium hover:bg-muted p-2 rounded transition-colors cursor-pointer border-b w-full">
            {borderOpen ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
            Border Color
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="w-full border border-border rounded-lg shadow-sm overflow-hidden relative">
            <ColorPicker
              value={color}
              onChange={setColor}
              width={318}
              height={110}
              hideColorTypeBtns={true}
              hideInputType={true}
              hideAdvancedSliders={true}
              hideColorGuide={true}
              hidePresets={true}
              className="rounded-lg p-2 custom-gradient-picker"
            />
            <div className="flex flex-wrap gap-2 mt-2 pb-3 justify-center">
              {solidPresets.map((preset, idx) => (
                <div
                  key={idx}
                  className="w-7 h-7 rounded cursor-pointer border border-border hover:scale-110 transition-transform"
                  style={{ background: preset }}
                  onClick={() => setColor(preset)}
                  title={preset}
                />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Fill Settings */}
      <Collapsible open={fillOpen} onOpenChange={setFillOpen}>
        <CollapsibleTrigger asChild>
          <button className="flex items-center gap-2 text-sm font-medium hover:bg-muted p-2 rounded transition-colors cursor-pointer border-b w-full">
            {fillOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            Fill Settings
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Fill opacity</label>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{Math.round(fillOpacity * 100)}%</span>
                <button
                  aria-label="Reset fill opacity"
                  className="text-xs cursor-pointer px-1 text-muted-foreground hover:text-primary focus:outline-none"
                  type="button"
                  onClick={() => setFillOpacity(0)}
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={fillOpacity}
              onChange={(e) => setFillOpacity(Number(e.target.value))}
              className="w-full range cursor-pointer range-lg range-primary"
            />
          </div>
          <div className="border border-border rounded-lg shadow-sm relative">
            <ColorPicker
              value={fillColor}
              onChange={setFillColor}
              height={110}
              width={318}
              hideColorTypeBtns={true}
              hideInputs={true}
              hideOpacity={false}
              hideHue={false}
              hideAdvancedSliders={true}
              hideColorGuide={true}
              hideInputType={true}
              hidePresets={true}
              className="rounded-lg p-2 custom-gradient-picker"
            />
            <div className="flex flex-wrap gap-2 mt-2 pb-3 justify-center">
              {solidPresets.map((preset, idx) => (
                <div
                  key={idx}
                  className="w-7 h-7 rounded cursor-pointer border border-border hover:scale-110 transition-transform"
                  style={{ background: preset }}
                  onClick={() => setFillColor(preset)}
                  title={preset}
                />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
