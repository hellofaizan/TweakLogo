"use client";

import { useState, useRef } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { LogoPreview } from "@/components/LogoPreview";
import { IconControls } from "@/components/IconControls";
import { BackgroundControls } from "@/components/BackgroundControls";
import * as LucideIconsImport from "lucide-react";
import * as TablerIconsImport from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, Palette, Image, Sparkles } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const LucideIcons = LucideIconsImport as unknown as Record<
  string,
  React.ComponentType<any>
>;
const TablerIcons = TablerIconsImport as unknown as Record<
  string,
  React.ComponentType<any>
>;
const DEFAULT_ICON_LUCIDE = "Aperture";
const DEFAULT_ICON_TABLER = "IconAlpha";

export default function Home() {
  // Icon state
  const [iconName, setIconName] = useState(DEFAULT_ICON_LUCIDE);
  const [iconLibrary, setIconLibrary] = useState<"lucide" | "tabler">("lucide");
  const [iconSize, setIconSize] = useState(300);
  const [iconRotate, setIconRotate] = useState(0);
  const [iconBorderWidth, setIconBorderWidth] = useState(2);
  const [iconColor, setIconColor] = useState("#fff");
  const [fillColor, setFillColor] = useState("#ffffff");
  const [fillOpacity, setFillOpacity] = useState(0);
  // Background state
  const [bgRounded, setBgRounded] = useState(50);
  const [bgPadding, setBgPadding] = useState(15);
  const [bgShadow, setBgShadow] = useState(2); // 0: NONE, 1: SM, 2: MD, 3: LG, 4: XL, 5: 2XL
  const [bgColor, setBgColor] = useState(
    "linear-gradient(45deg,rgba(8, 1, 102, 1) 0%, rgba(9, 9, 121, 1) 42%, rgba(0, 94, 255, 1) 100%)"
  );
  // Tab state
  const [tab, setTab] = useState<"logo" | "background">("logo");

  let Icon: React.ComponentType<any> | undefined = undefined;
  if (iconLibrary === "tabler") {
    Icon = TablerIcons[iconName] || TablerIcons[DEFAULT_ICON_TABLER];
  } else {
    Icon = LucideIcons[iconName] || LucideIcons[DEFAULT_ICON_LUCIDE];
  }

  const previewRef = useRef<HTMLDivElement>(null);

  // Add state for resolution and format
  const [resolution, setResolution] = useState("1x");
  const [format, setFormat] = useState("png");
  const [isDownloading, setIsDownloading] = useState(false);

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
        // PNG
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

  return (
    <main>
      {/* SEO-optimized header section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Free Online Logo Generator
          </h1>
          <div className="flex items-center gap-[2px] text-lg md:text-xl mb-6 justify-center">
            Create stunning logos online with Logotweak
            <img src="/logos/logo.png" alt="Logotweak" className="w-5 h-5" />
            <span> the fastest free logo maker</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">
              ✓ 7000+ free icons
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              ✓ No credit card
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              ✓ Instant download
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              ✓ Professional quality
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Left: Live Preview */}
            <article className="flex-1 flex flex-col items-center justify-center">
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
              />

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full max-w-md">
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger className="w-full sm:w-auto">
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
                  <SelectTrigger className="w-full sm:w-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpg">JPG</SelectItem>
                    <SelectItem value="svg">SVG</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {isDownloading ? (
                    <Loader2 className="animate-spin mr-2 h-4 w-4 inline" />
                  ) : (
                    <Download className="mr-2 h-4 w-4 inline" />
                  )}
                  Download Logo
                </Button>
              </div>
            </article>

            {/* Right: Controls */}
            <aside className="w-full lg:w-[400px] flex flex-col gap-4">
              <div className="rounded-xl shadow-lg p-6 bg-card border w-full">
                {/* Tabs */}
                <div className="flex items-start justify-between mb-4 w-full">
                  <div className="flex gap-2 items-center w-full">
                    <Tabs defaultValue="logo" className="w-full">
                      <div className="flex flex-row gap-2 items-center w-full justify-between">
                        <TabsList className="cursor-pointer rounded-md border">
                          <TabsTrigger
                            value="logo"
                            className="rounded-md cursor-pointer"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Logo
                          </TabsTrigger>
                          <TabsTrigger
                            value="background"
                            className="rounded-md cursor-pointer"
                          >
                            <Palette className="w-4 h-4 mr-2" />
                            Background
                          </TabsTrigger>
                        </TabsList>
                        <ModeToggle />
                      </div>
                      <TabsContent value="logo">
                        <div>
                          <h3 className="font-semibold mb-4 text-lg">
                            Icon Settings
                          </h3>
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
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="background">
                        <div>
                          <h3 className="font-semibold mb-4 text-lg">
                            Background Settings
                          </h3>
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
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SEO-optimized features section */}
      <section className="pt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose LogoTweak for Your Logo Design?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The best free online logo generator with professional features and
              instant results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-lg shadow-md border">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Logo Maker</h3>
              <p className="text-muted-foreground">
                Create professional logos online completely free. No hidden
                costs, no registration required.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg shadow-md border">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thousands of Icons</h3>
              <p className="text-muted-foreground">
                Access thousands of beautiful icons from Lucide and Tabler
                libraries. Find the perfect icon for your brand.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg shadow-md border">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
              <p className="text-muted-foreground">
                Download your logo in PNG, JPG, or SVG format. High-resolution
                files ready for print and web use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
