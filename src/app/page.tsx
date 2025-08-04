"use client";

import { useState, useRef, useEffect } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { LogoPreview } from "@/components/LogoPreview";
import { IconControls } from "@/components/IconControls";
import { BackgroundControls } from "@/components/BackgroundControls";
import { TextLayer, TextRenderer, TextLayerData } from "@/components/TextLayer";
import * as LucideIconsImport from "lucide-react";
import * as TablerIconsImport from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Download,
  Palette,
  Save,
  Zap,
  Undo2,
  Type,
  Shuffle,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const LucideIcons = LucideIconsImport as unknown as Record<
  string,
  React.ComponentType<any>
>;
const TablerIcons = TablerIconsImport as unknown as Record<
  string,
  React.ComponentType<any>
>;
const DEFAULT_ICON_LUCIDE = "Zap";
const DEFAULT_ICON_TABLER = "IconZap";

export default function Home() {
  const [iconName, setIconName] = useState(DEFAULT_ICON_LUCIDE);
  const [iconLibrary, setIconLibrary] = useState<"lucide" | "tabler">("lucide");
  const [iconSize, setIconSize] = useState(400);
  const [iconRotate, setIconRotate] = useState(0);
  const [iconBorderWidth, setIconBorderWidth] = useState(2.2);
  const [iconColor, setIconColor] = useState("#222222");
  const [fillColor, setFillColor] = useState("#ffffff");
  const [fillOpacity, setFillOpacity] = useState(0.41);
  const [bgRounded, setBgRounded] = useState(50);
  const [bgPadding, setBgPadding] = useState(15);
  const [bgShadow, setBgShadow] = useState(2);
  const [bgColor, setBgColor] = useState(
    "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)"
  );
  const [activeTab, setActiveTab] = useState<"icon" | "background" | "text">("icon");

  const [textLayers, setTextLayers] = useState<TextLayerData[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);

  let Icon: React.ComponentType<any> | undefined = undefined;
  if (iconLibrary === "tabler") {
    Icon = TablerIcons[iconName] || TablerIcons[DEFAULT_ICON_TABLER];
  } else {
    Icon = LucideIcons[iconName] || LucideIcons[DEFAULT_ICON_LUCIDE];
  }

  const previewRef = useRef<HTMLDivElement>(null);

  const [resolution, setResolution] = useState("1x");
  const [format, setFormat] = useState("png");
  const [isDownloading, setIsDownloading] = useState(false);

  // Randomizer arrays - only use icons that exist in both libraries
  const randomIcons = ["Zap", "Heart", "Star", "Smile", "Coffee", "Music", "Camera", "Gift", "Leaf", "Rocket", "Diamond", "Crown", "Fire", "Moon", "Sun", "Cloud", "Tree", "Flower", "Car", "Plane", "Ship", "Bike", "Book", "Pen", "Phone", "Laptop", "Gamepad", "Headphones", "Microphone", "Speaker", "Lightbulb", "Settings", "Home", "User", "Mail", "Search", "Plus", "Minus", "Check", "X", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
  const randomColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9", "#F8C471", "#82E0AA", "#F1948A", "#85C1E9", "#D7BDE2", "#F9E79F", "#A9DFBF", "#FAD7A0", "#D5A6BD", "#A3E4D7"];
  const randomGradients = [
    "linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 100%)",
    "linear-gradient(45deg, #A8E6CF 0%, #DCEDC8 100%)",
    "linear-gradient(45deg, #FFD3B6 0%, #FFAAA5 100%)",
    "linear-gradient(45deg, #D4A5A5 0%, #392F5A 100%)",
    "linear-gradient(45deg, #FF9A9E 0%, #FECFEF 100%)",
    "linear-gradient(45deg, #A8E6CF 0%, #88D8C0 100%)",
    "linear-gradient(45deg, #FFD3B6 0%, #FF8B94 100%)",
    "linear-gradient(45deg, #FF9A9E 0%, #FAD0C4 100%)",
    "linear-gradient(45deg, #A8E6CF 0%, #DCEDC8 100%)",
    "linear-gradient(45deg, #FFD3B6 0%, #FFAAA5 100%)"
  ];

  const presets = [
    {
      id: 1,
      name: "Classic",
      icon: "Zap",
      bgColor: "#000000",
      iconColor: "#ffffff",
      fillOpacity: 0,
    },
    {
      id: 2,
      name: "Sunny",
      icon: "Zap",
      bgColor: "#fbbf24",
      iconColor: "#000000",
      fillOpacity: 0,
    },
    {
      id: 3,
      name: "Pink",
      icon: "Zap",
      bgColor: "#ec4899",
      iconColor: "#ffffff",
      fillOpacity: 0,
    },
    {
      id: 4,
      name: "Nature",
      icon: "Zap",
      bgColor: "#10b981",
      iconColor: "#ffffff",
      fillOpacity: 0,
    },
    {
      id: 5,
      name: "Cat",
      icon: "Cat",
      bgColor: "#ec4899",
      iconColor: "#000000",
      fillOpacity: 0,
    },
  ];

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsDownloading(true);
    try {
      let scale = 1;
      switch (resolution) {
        case "0.5x":
          scale = 0.5;
          break;
        case "2x":
          scale = 2;
          break;
        case "4x":
          scale = 4;
          break;
        case "8x":
          scale = 8;
          break;
        case "fullres":
          scale = 10;
          break;
        default:
          scale = 1;
      }
      
      let dataUrl;
      if (format === "svg") {
        dataUrl = await import("html-to-image").then((mod) =>
          mod.toSvg(previewRef.current!)
        );
      } else if (format === "jpg") {
        dataUrl = await import("html-to-image").then((mod) =>
          mod.toJpeg(previewRef.current!, { quality: 1, pixelRatio: scale })
        );
      } else {
        dataUrl = await import("html-to-image").then((mod) =>
          mod.toPng(previewRef.current!, { pixelRatio: scale })
        );
      }
      
      const link = document.createElement("a");
      link.download = `logo.${format}`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  const applyPreset = (preset: any) => {
    setIconName(preset.icon);
    setBgColor(preset.bgColor);
    setIconColor(preset.iconColor);
    setFillOpacity(preset.fillOpacity);
    toast.success(`Applied ${preset.name} preset`);
  };

  const randomizeLogo = () => {
    // Random icon
    const randomIcon = randomIcons[Math.floor(Math.random() * randomIcons.length)];
    
    // Random icon library
    const randomLibrary = Math.random() > 0.5 ? "lucide" : "tabler";
    setIconLibrary(randomLibrary);
    
    // Set icon name based on library
    if (randomLibrary === "tabler") {
      setIconName("Icon" + randomIcon);
    } else {
      setIconName(randomIcon);
    }
    
    // Random icon properties
    setIconSize(Math.floor(Math.random() * 300) + 200); // 200-500px
    setIconRotate(Math.floor(Math.random() * 360) - 180); // -180 to 180 degrees
    setIconBorderWidth(Math.random() * 3 + 1); // 1-4px
    setIconColor(randomColors[Math.floor(Math.random() * randomColors.length)]);
    setFillColor(randomColors[Math.floor(Math.random() * randomColors.length)]);
    setFillOpacity(Math.random() * 0.8 + 0.2); // 0.2-1.0
    
    // Random background properties
    setBgRounded(Math.floor(Math.random() * 200) + 50); // 50-250px
    setBgPadding(Math.floor(Math.random() * 60) + 10); // 10-70px
    setBgShadow(Math.floor(Math.random() * 4) + 1); // 1-4 shadow levels
    setBgColor(randomGradients[Math.floor(Math.random() * randomGradients.length)]);
    
    toast.success("🎲 Logo randomized!");
  };

  useEffect(() => {
    if (selectedTextId) {
      setActiveTab("text");
    }
  }, [selectedTextId]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <LucideIconsImport.MousePointer2 className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Logo Tweak</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Undo2 className="w-4 h-4" />
            Undo
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Presets:</span>
            <div className="flex gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className="w-8 h-8 rounded border-2 border-border hover:border-primary transition-colors flex items-center justify-center"
                  style={{ backgroundColor: preset.bgColor }}
                  title={preset.name}
                >
                  <Zap className="w-4 h-4" style={{ color: preset.iconColor }} />
                </button>
              ))}
            </div>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={randomizeLogo}
                  className="gap-2"
                >
                  <Shuffle className="w-4 h-4" />
                  Random
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
                <p className="text-xs">Generate a random logo design</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <ModeToggle />
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className="w-64 border-r border-border bg-card p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("icon")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "icon"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Zap className="w-5 h-5" />
              <span className="font-medium">Icon</span>
            </button>
            
            <button
              onClick={() => setActiveTab("background")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "background"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Palette className="w-5 h-5" />
              <span className="font-medium">Background</span>
            </button>

            <button
              onClick={() => setActiveTab("text")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "text"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Type className="w-5 h-5" />
              <span className="font-medium">Text</span>
            </button>
          </nav>
        </aside>

        <main className="w-96 border-r border-border bg-card p-6 overflow-y-auto">
          {activeTab === "icon" ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                  {Icon && <Icon size={20} />}
                </div>
                <span className="font-medium">{iconName}</span>
              </div>
              
              <IconControls
                iconName={iconName}
                setIconName={setIconName}
                iconLibrary={iconLibrary}
                setIconLibrary={setIconLibrary}
                size={iconSize}
                setSize={setIconSize}
                rotate={iconRotate}
                setRotate={setIconRotate}
                borderWidth={iconBorderWidth}
                setBorderWidth={setIconBorderWidth}
                color={iconColor}
                setColor={setIconColor}
                fillColor={fillColor}
                setFillColor={setFillColor}
                fillOpacity={fillOpacity}
                setFillOpacity={setFillOpacity}
                setBgColor={setBgColor}
                setBgPadding={setBgPadding}
                setBgRounded={setBgRounded}
                setBgShadow={setBgShadow}
              />
            </div>
          ) : activeTab === "background" ? (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-6">Background Settings</h3>
              <BackgroundControls
                rounded={bgRounded}
                setRounded={setBgRounded}
                padding={bgPadding}
                setPadding={setBgPadding}
                shadow={bgShadow}
                setShadow={setBgShadow}
                bgColor={bgColor}
                setBgColor={setBgColor}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-6">Text Settings</h3>
              <TextLayer
                textLayers={textLayers}
                setTextLayers={setTextLayers}
                selectedTextId={selectedTextId}
                setSelectedTextId={setSelectedTextId}
                canvasSize={600}
              />
            </div>
          )}
        </main>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-8 bg-muted/20">
            <div className="relative">
              <LogoPreview
                ref={previewRef}
                Icon={Icon}
                size={iconSize}
                color={iconColor}
                borderWidth={iconBorderWidth}
                rotate={iconRotate}
                bgRounded={bgRounded}
                bgPadding={bgPadding}
                bgShadow={bgShadow}
                bgColor={bgColor}
                fillColor={fillColor}
                fillOpacity={fillOpacity}
                textLayers={textLayers}
                selectedTextId={selectedTextId}
                setSelectedTextId={setSelectedTextId}
                updateTextLayer={(id, updates) => {
                  setTextLayers(textLayers.map(layer => 
                    layer.id === id ? { ...layer, ...updates } : layer
                  ));
                }}
              />
            </div>
          </div>

          <div className="border-t border-border bg-card p-4">
            <div className="flex items-center gap-4">
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5x">0.5x</SelectItem>
                  <SelectItem value="1x">1x</SelectItem>
                  <SelectItem value="2x">2x</SelectItem>
                  <SelectItem value="4x">4x</SelectItem>
                  <SelectItem value="8x">8x</SelectItem>
                  <SelectItem value="fullres">FullRes</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                </SelectContent>
              </Select>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Save inside browser"
                      onClick={() => {
                        const iconData = {
                          id: Date.now(),
                          iconName,
                          iconLibrary,
                          iconSize,
                          iconRotate,
                          iconBorderWidth,
                          iconColor,
                          fillColor,
                          fillOpacity,
                          bgRounded,
                          bgPadding,
                          bgShadow,
                          bgColor,
                          textLayers,
                        };
                        let saved = [];
                        try {
                          saved = JSON.parse(
                            localStorage.getItem("logotweak-saved-icons") ||
                              "[]"
                          );
                        } catch {}
                        saved.unshift(iconData);
                        localStorage.setItem(
                          "logotweak-saved-icons",
                          JSON.stringify(saved)
                        );
                        toast.success(
                          "The icon and the tweaks have been saved. You can find them inside icon library."
                        );
                      }}
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
                    Save the icon and the tweaks
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1"
              >
                {isDownloading ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Download Logo
              </Button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
