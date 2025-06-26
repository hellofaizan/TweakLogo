"use client";

import ColorPicker from "react-best-gradient-color-picker";
import React, { useState, useEffect, useRef } from "react";

const SHADOWS = ["XS", "SM", "MD", "LG", "XL"];

export function BackgroundControls({
  rounded,
  setRounded,
  padding,
  setPadding,
  shadow,
  setShadow,
  bgColor,
  setBgColor,
}: {
  rounded: number;
  setRounded: (v: number) => void;
  padding: number;
  setPadding: (v: number) => void;
  shadow: number;
  setShadow: (v: number) => void;
  bgColor: string;
  setBgColor: (v: string) => void;
}) {
  // Add state to track color mode
  const [colorMode, setColorMode] = useState("gradient");
  const pickerRef = useRef(null);

  // Effect to detect mode change by observing the color value
  useEffect(() => {
    if (typeof bgColor === "string" && bgColor.startsWith("linear-gradient")) {
      setColorMode("gradient");
    } else {
      setColorMode("solid");
    }
  }, [bgColor]);

  // Presets
  const solidPresets = [
    "#080166", "#0974f1", "#f3f520", "#59d102", "#f40752", "#f74c06", "#c11e38", "#f83d5c", "#b94c98", "#7f0012", "#f97d5b", "#020344", "#0968e5", "#FF7554", "#AF33F2", "#F2B705"
  ];
  const gradientPresets = [
    "linear-gradient(45deg,rgba(8, 1, 102, 1) 0%, rgba(9, 9, 121, 1) 42%, rgba(0, 94, 255, 1) 100%)",
    "linear-gradient(45deg,#73B3FF 0%, #3E7EFF 30%, #0922FF 100%)",
    "linear-gradient(90deg,#f3f520 0%, #59d102 100%)",
    "linear-gradient(90deg,#f40752 0%, #f9ab8f 100%)",
    "linear-gradient(90deg,#f74c06 0%, #f9bc2c 100%)",
    "linear-gradient(90deg,#c11e38 0%, #220b34 100%)",
    "linear-gradient(90deg,#f83d5c 0%, #fd4b2f 100%)",
    "linear-gradient(90deg,#b94c98 0%, #f0073b 100%)",
    "linear-gradient(90deg,#0b2c24 0%, #247a4d 100%)",
    "linear-gradient(90deg,#000328 0%, #00458e 100%)",
    "linear-gradient(90deg,#7f0012 0%, #1b0a07 100%)",
    "linear-gradient(90deg,#f97d5b 0%, #f9a87b 100%)",
    "linear-gradient(90deg,#020344 0%, #28b8d5 100%)",
    "linear-gradient(90deg,#0968e5 0%, #091970 100%)",
    "linear-gradient(45deg,#FF7554 0%, #FF3509 100%)",
    "linear-gradient(45deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-xs mb-1">Rounded</label>
          <div className="text-right text-xs">{rounded} px</div>
        </div>
        <input
          type="range"
          min={0}
          max={300}
          value={rounded}
          onChange={(e) => setRounded(Number(e.target.value))}
          className="w-full range range-lg range-primary"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-xs mb-1">Padding</label>
          <div className="text-right text-xs">{padding} px</div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={padding}
          onChange={(e) => setPadding(Number(e.target.value))}
          className="w-full range range-lg range-primary"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-xs mb-1">Shadow</label>
          <div className="text-right text-xs">{SHADOWS[shadow]}</div>
        </div>

        <div className="w-full max-w-xs">
          <input
            type="range"
            min={0}
            max={4}
            value={shadow}
            onChange={(e) => {
              setShadow(Number(e.target.value));
            }}
            className="range range-lg range-primary"
          />
          <div className="flex justify-between px-2.5 mt-1 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
          <div className="flex justify-between px-1.5 mt-1 text-xs">
            {SHADOWS.map((s, i) => (
              <span
                key={s}
                className={`${
                  shadow === i ? "range-primary" : "text-muted-foreground"
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="block text-xs mb-1">Background</label>
        <div className="bg-background border border-border rounded-md shadow-sm w-full max-w-xs mx-auto">
          <ColorPicker
            value={bgColor}
            onChange={setBgColor}
            height={120}
            width={284}
            hidePresets={true}
            className={`rounded-md p-2 w-full custom-gradient-picker`}
          />
          <div className="flex flex-wrap gap-2 mt-2 pb-3 justify-center">
            {(colorMode === "solid" ? solidPresets : gradientPresets).map((preset, idx) => (
              <div
                key={idx}
                className="w-7 h-7 rounded cursor-pointer border border-border"
                style={{ background: preset }}
                onClick={() => setBgColor(preset)}
                title={preset}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
