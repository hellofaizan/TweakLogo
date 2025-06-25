"use client";

import ColorPicker from "react-best-gradient-color-picker";

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
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs mb-1">Rounded</label>
        <input
          type="range"
          min={0}
          max={300}
          value={rounded}
          onChange={(e) => setRounded(Number(e.target.value))}
          className="w-full range range-lg"
        />
        <div className="text-right text-xs">{rounded} px</div>
      </div>
      <div>
        <label className="block text-xs mb-1">Padding</label>
        <input
          type="range"
          min={0}
          max={100}
          value={padding}
          onChange={(e) => setPadding(Number(e.target.value))}
          className="w-full range range-lg"
        />
        <div className="text-right text-xs">{padding} px</div>
      </div>
      <div>
        <label className="block text-xs mb-1">Shadow</label>
        <div className="w-full max-w-xs">
          <input
            type="range"
            min={0}
            max={4}
            value={shadow}
            onChange={(e) => {
                console.log(e.target.value);
                setShadow(Number(e.target.value))}}
            className="range range-lg"
          />
          <div className="flex justify-between px-2.5 mt-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
          <div className="flex justify-between px-2.5 mt-2 text-xs">
            {SHADOWS.map((s, i) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {SHADOWS.map((s, i) => (
            <button
              key={s}
              className={`px-2 py-1 rounded border text-xs ${shadow === i ? 'border-primary' : 'border-gray-300'}`}
              onClick={() => {
                console.log(i);
                setShadow(i)}}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs mb-1">Background</label>
        <div className="bg-background border border-border rounded-md shadow-sm">
          <ColorPicker
            value={bgColor}
            onChange={setBgColor}
            width={320}
            height={160}
            presets={[
              "linear-gradient(to right, #ff0000, #0000ff)",
              "radial-gradient(circle, #ffff00, #00ff00)",
              "linear-gradient(to bottom, #ff0000, #0000ff)",
              "linear-gradient(to top, #ff0000, #0000ff)",
              "linear-gradient(to left, #ff0000, #0000ff)",
              "linear-gradient(to right, #ff0000, #0000ff)",
              "linear-gradient(to bottom, #ff0000, #0000ff)",
              "linear-gradient(to top, #ff0000, #0000ff)",
              "linear-gradient(to right, #ff0000, #0000ff)",
              "linear-gradient(to bottom, #ff0000, #0000ff)",
              "linear-gradient(to top, #ff0000, #0000ff)",
              "linear-gradient(to left, #ff0000, #0000ff)",
              "linear-gradient(to right, #ff0000, #0000ff)",
              "linear-gradient(to bottom, #ff0000, #0000ff)",
              "linear-gradient(to top, #ff0000, #0000ff)",
              "linear-gradient(to right, #ff0000, #0000ff)",
              "linear-gradient(to bottom, #ff0000, #0000ff)",
              "linear-gradient(to top, #ff0000, #0000ff)",
            ]}
            className={`rounded-md p-2 `}
          />
        </div>
      </div>
    </div>
  );
}
