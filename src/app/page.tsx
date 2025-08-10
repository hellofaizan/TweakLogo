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
  Share2,
  RotateCcw,
  RotateCw,
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

  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isUndoRedoAction, setIsUndoRedoAction] = useState(false);

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
    const randomIcon = randomIcons[Math.floor(Math.random() * randomIcons.length)];
    
    const randomLibrary = Math.random() > 0.5 ? "lucide" : "tabler";
    setIconLibrary(randomLibrary);
    
    if (randomLibrary === "tabler") {
      setIconName("Icon" + randomIcon);
    } else {
      setIconName(randomIcon);
    }
    
    setIconSize(Math.floor(Math.random() * 300) + 200);
    setIconRotate(Math.floor(Math.random() * 360) - 180);
    setIconBorderWidth(Math.random() * 3 + 1);
    setIconColor(randomColors[Math.floor(Math.random() * randomColors.length)]);
    setFillColor(randomColors[Math.floor(Math.random() * randomColors.length)]);
    setFillOpacity(Math.random() * 0.8 + 0.2);
    
    setBgRounded(Math.floor(Math.random() * 200) + 50);
    setBgPadding(Math.floor(Math.random() * 60) + 10);
    setBgShadow(Math.floor(Math.random() * 4) + 1);
    setBgColor(randomGradients[Math.floor(Math.random() * randomGradients.length)]);
    
    toast.success("🎲 Logo randomized!");
  };

  const saveToHistory = (newState: any) => {
    if (isUndoRedoAction) return;
    
    const currentState = {
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
      timestamp: Date.now(),
    };

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(currentState);
    
    if (newHistory.length > 20) {
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setIsUndoRedoAction(true);
      const prevState = history[historyIndex - 1];
      
      setIconName(prevState.iconName);
      setIconLibrary(prevState.iconLibrary);
      setIconSize(prevState.iconSize);
      setIconRotate(prevState.iconRotate);
      setIconBorderWidth(prevState.iconBorderWidth);
      setIconColor(prevState.iconColor);
      setFillColor(prevState.fillColor);
      setFillOpacity(prevState.fillOpacity);
      setBgRounded(prevState.bgRounded);
      setBgPadding(prevState.bgPadding);
      setBgShadow(prevState.bgShadow);
      setBgColor(prevState.bgColor);
      setTextLayers(prevState.textLayers);
      
      setHistoryIndex(historyIndex - 1);
      toast.success("↶ Undone");
      
      setTimeout(() => setIsUndoRedoAction(false), 100);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setIsUndoRedoAction(true);
      const nextState = history[historyIndex + 1];
      
      setIconName(nextState.iconName);
      setIconLibrary(nextState.iconLibrary);
      setIconSize(nextState.iconSize);
      setIconRotate(nextState.iconRotate);
      setIconBorderWidth(nextState.iconBorderWidth);
      setIconColor(nextState.iconColor);
      setFillColor(nextState.fillColor);
      setFillOpacity(nextState.fillOpacity);
      setBgRounded(nextState.bgRounded);
      setBgPadding(nextState.bgPadding);
      setBgShadow(nextState.bgShadow);
      setBgColor(nextState.bgColor);
      setTextLayers(nextState.textLayers);
      
      setHistoryIndex(historyIndex + 1);
      toast.success("↷ Redone");
      
      setTimeout(() => setIsUndoRedoAction(false), 100);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          undo();
        } else if ((e.key === 'y') || (e.key === 'z' && e.shiftKey)) {
          e.preventDefault();
          redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  useEffect(() => {
    if (!isUndoRedoAction) {
      saveToHistory({});
    }
  }, [iconName, iconLibrary, iconSize, iconRotate, iconBorderWidth, iconColor, fillColor, fillOpacity, bgRounded, bgPadding, bgShadow, bgColor, textLayers]);

  const generateShareUrl = () => {
    const logoData = {
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
    
    const encoded = btoa(JSON.stringify(logoData));
    return `${window.location.origin}${window.location.pathname}?logo=${encoded}`;
  };

  const loadFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const logoParam = urlParams.get('logo');
    
    if (logoParam) {
      try {
        const logoData = JSON.parse(atob(logoParam));
        
        setIconName(logoData.iconName);
        setIconLibrary(logoData.iconLibrary);
        setIconSize(logoData.iconSize);
        setIconRotate(logoData.iconRotate);
        setIconBorderWidth(logoData.iconBorderWidth);
        setIconColor(logoData.iconColor);
        setFillColor(logoData.fillColor);
        setFillOpacity(logoData.fillOpacity);
        setBgRounded(logoData.bgRounded);
        setBgPadding(logoData.bgPadding);
        setBgShadow(logoData.bgShadow);
        setBgColor(logoData.bgColor);
        setTextLayers(logoData.textLayers || []);
        
        toast.success("🎨 Logo loaded from URL!");
      } catch (error) {
        console.error('Failed to load logo from URL:', error);
      }
    }
  };

  useEffect(() => {
    loadFromUrl();
  }, []);

  const shareLogo = async () => {
    const shareUrl = generateShareUrl();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this logo I made!',
          text: 'I created this logo using LogoTweak',
          url: shareUrl,
        });
      } catch (error) {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("🔗 Share link copied to clipboard!");
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("🔗 Share link copied to clipboard!");
    }
  };

  // Responsive canvas size hook
  const [canvasSize, setCanvasSize] = useState(600);

  useEffect(() => {
    const updateCanvasSize = () => {
      const width = window.innerWidth;
      if (width < 640) setCanvasSize(300);
      else if (width < 768) setCanvasSize(400);
      else if (width < 1024) setCanvasSize(500);
      else setCanvasSize(600);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    if (selectedTextId) {
      setActiveTab("text");
    }
  }, [selectedTextId]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <LucideIconsImport.MousePointer2 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <span className="font-bold text-lg md:text-xl">Logo Tweak</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={undo}
                    disabled={historyIndex <= 0}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Undo
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
                  <p className="text-xs">Undo (Ctrl+Z)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={redo}
                    disabled={historyIndex >= history.length - 1}
                    className="gap-2"
                  >
                    <RotateCw className="w-4 h-4" />
                    Redo
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
                  <p className="text-xs">Redo (Ctrl+Y)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-xs md:text-sm font-medium hidden sm:block">Presets:</span>
            <div className="flex gap-1 md:gap-2">
              {presets.slice(0, 3).map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className="w-6 h-6 md:w-8 md:h-8 rounded border-2 border-border hover:border-primary transition-colors flex items-center justify-center"
                  style={{ backgroundColor: preset.bgColor }}
                  title={preset.name}
                >
                  <Zap className="w-3 h-3 md:w-4 md:h-4" style={{ color: preset.iconColor }} />
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={randomizeLogo}
                    className="gap-1 md:gap-2 px-2 md:px-3"
                  >
                    <Shuffle className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Random</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
                  <p className="text-xs">Generate a random logo design</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareLogo}
                    className="gap-1 md:gap-2 px-2 md:px-3"
                  >
                    <Share2 className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
                  <p className="text-xs">Share logo via URL</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <ModeToggle />
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <aside className="hidden lg:block w-64 border-r border-border bg-card p-4">
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

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden border-b border-border bg-card">
          <div className="flex">
            <button
              onClick={() => setActiveTab("icon")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "icon"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Icon</span>
            </button>
            
            <button
              onClick={() => setActiveTab("background")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "background"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Background</span>
            </button>

            <button
              onClick={() => setActiveTab("text")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "text"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Text</span>
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-muted/20">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
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

          {/* Export Controls */}
          <div className="border-t border-border bg-card p-3 md:p-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger className="w-20 md:w-24 text-xs md:text-sm">
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
                  <SelectTrigger className="w-16 md:w-20 text-xs md:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpg">JPG</SelectItem>
                    <SelectItem value="svg">SVG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
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
                  className="flex-1 sm:flex-none"
                >
                  {isDownloading ? (
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  ) : (
                    <Download className="mr-2 h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">Download Logo</span>
                  <span className="sm:hidden">Download</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel - Responsive */}
        <main className="w-full lg:w-96 border-t lg:border-l lg:border-t-0 border-border bg-card p-4 md:p-6 overflow-y-auto max-h-96 lg:max-h-none">
          {activeTab === "icon" ? (
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-muted flex items-center justify-center">
                  {Icon && <Icon size={16} className="md:w-5 md:h-5" />}
                </div>
                <span className="font-medium text-sm md:text-base">{iconName}</span>
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
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Background Settings</h3>
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
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Text Settings</h3>
              <TextLayer
                textLayers={textLayers}
                setTextLayers={setTextLayers}
                selectedTextId={selectedTextId}
                setSelectedTextId={setSelectedTextId}
                canvasSize={canvasSize}
              />
            </div>
          )}
        </main>

      </div>


    </div>
  );
}
