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
import { toPng } from "html-to-image";
import { Loader2 } from "lucide-react";
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Left: Live Preview */}
        <div className="flex-1 flex flex-col items-center justify-center">
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
          <div className="flex flex-row items-center gap-2 mt-6">
            <Select value={resolution} onValueChange={setResolution}>
              <SelectTrigger className="">
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
              <SelectTrigger className="">
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
              size={"xl"}
            >
              {isDownloading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4 inline" />
              ) : null}
              Download
            </Button>
          </div>
        </div>
        {/* Right: Controls */}
        <div className="w-full md:w-[350px] flex flex-col gap-4">
          <div className="rounded-xl shadow p-6 flex flex-col gap-3">
            {/* Tabs */}
            <div className="flex items-start justify-between">
              <div className="flex gap-2 items-center">
                <Tabs defaultValue="logo">
                  <div className="flex flex-row gap-2 items-center w-full justify-between">
                    <TabsList className="cursor-pointer rounded-md border border-[#242424]">
                      <TabsTrigger
                        value="logo"
                        className="rounded-md cursor-pointer"
                      >
                        Logo
                      </TabsTrigger>
                      <TabsTrigger
                        value="background"
                        className="rounded-md cursor-pointer"
                      >
                        Background
                      </TabsTrigger>
                    </TabsList>
                    <ModeToggle />
                  </div>
                  <TabsContent value="logo">
                    <div>
                      <h3 className="font-semibold mb-2">Icon Settings</h3>
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
                      <h3 className="font-semibold mb-2">
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
        </div>
      </div>
    </div>
  );
}
