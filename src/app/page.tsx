"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { LogoPreview } from "@/components/LogoPreview";
import { IconControls } from "@/components/IconControls";
import { BackgroundControls } from "@/components/BackgroundControls";
import * as LucideIconsImport from "lucide-react";
import * as TablerIconsImport from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Left: Live Preview */}
        <div className="flex-1 flex items-center justify-center">
          <LogoPreview
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
        </div>
        {/* Right: Controls */}
        <div className="w-full md:w-[350px] flex flex-col gap-4">
          <div className="rounded-xl shadow p-6 flex flex-col gap-3">
            {/* Tabs */}
            <div className="flex items-start justify-between">
              <div className="flex gap-2 items-center">
                <Tabs defaultValue="logo">
                  <TabsList className="cursor-pointer rounded-md border border-[#242424]">
                    <TabsTrigger value="logo" className="rounded-md cursor-pointer">Logo</TabsTrigger>
                    <TabsTrigger value="background" className="rounded-md cursor-pointer">Background</TabsTrigger>
                  </TabsList>
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

              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
