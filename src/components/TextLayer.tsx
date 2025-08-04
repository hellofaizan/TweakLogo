"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { RotateCcw, Type, Trash2, Move } from "lucide-react";
import { toast } from "sonner";

export interface TextLayerData {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: string;
  textAlign: string;
  opacity: number;
  rotation: number;
}

interface TextLayerProps {
  textLayers: TextLayerData[];
  setTextLayers: (layers: TextLayerData[]) => void;
  selectedTextId: string | null;
  setSelectedTextId: (id: string | null) => void;
  canvasSize: number;
}

const FONT_FAMILIES = [
  { value: "Inter", label: "Inter" },
  { value: "Roboto", label: "Roboto" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "Lato", label: "Lato" },
  { value: "Poppins", label: "Poppins" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Raleway", label: "Raleway" },
  { value: "Oswald", label: "Oswald" },
  { value: "Playfair Display", label: "Playfair Display" },
  { value: "Merriweather", label: "Merriweather" },
  { value: "Georgia", label: "Georgia" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Verdana", label: "Verdana" },
];

const FONT_WEIGHTS = [
  { value: "100", label: "Thin" },
  { value: "200", label: "Extra Light" },
  { value: "300", label: "Light" },
  { value: "400", label: "Normal" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semi Bold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extra Bold" },
  { value: "900", label: "Black" },
];

const TEXT_ALIGN_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

export function TextLayer({ 
  textLayers, 
  setTextLayers, 
  selectedTextId, 
  setSelectedTextId,
  canvasSize 
}: TextLayerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedText = textLayers.find(layer => layer.id === selectedTextId);

  const addTextLayer = () => {
    const newLayer: TextLayerData = {
      id: `text-${Date.now()}`,
      text: "Your Text",
      x: canvasSize / 2 - 50,
      y: canvasSize / 2 - 20,
      fontSize: 24,
      fontFamily: "Inter",
      color: "#000000",
      fontWeight: "400",
      textAlign: "center",
      opacity: 1,
      rotation: 0,
    };

    setTextLayers([...textLayers, newLayer]);
    setSelectedTextId(newLayer.id);
    toast.success("Text layer added!");
  };

  const updateTextLayer = (id: string, updates: Partial<TextLayerData>) => {
    setTextLayers(textLayers.map(layer => 
      layer.id === id ? { ...layer, ...updates } : layer
    ));
  };

  const deleteTextLayer = (id: string) => {
    setTextLayers(textLayers.filter(layer => layer.id !== id));
    if (selectedTextId === id) {
      setSelectedTextId(null);
    }
    toast.success("Text layer deleted!");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedTextId) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;

      updateTextLayer(selectedTextId, {
        x: Math.max(0, Math.min(canvasSize - 100, newX)),
        y: Math.max(0, Math.min(canvasSize - 50, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, selectedTextId, dragOffset]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          onClick={addTextLayer}
          variant="outline"
          className="flex-1"
        >
          <Type className="w-4 h-4 mr-2" />
          Add Text
        </Button>
      </div>

      {textLayers.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Text Layers</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {textLayers.map((layer) => (
              <div
                key={layer.id}
                className={`flex items-center gap-2 p-2 border rounded cursor-pointer transition-colors ${
                  layer.id === selectedTextId ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                }`}
                onClick={() => setSelectedTextId(layer.id)}
              >
                <Type className="w-4 h-4" />
                <span className="flex-1 text-sm truncate">{layer.text}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTextLayer(layer.id);
                  }}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedText && (
        <div className="space-y-4 border-t pt-4">
          <h4 className="text-sm font-medium">Text Properties</h4>
          
          <div className="space-y-2">
            <label className="text-xs font-medium">Text Content</label>
            <Input
              value={selectedText.text}
              onChange={(e) => updateTextLayer(selectedText.id, { text: e.target.value })}
              placeholder="Enter your text..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium">Font Family</label>
            <Select
              value={selectedText.fontFamily}
              onValueChange={(value) => updateTextLayer(selectedText.id, { fontFamily: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONT_FAMILIES.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">Font Size</label>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{selectedText.fontSize}px</span>
                <button
                  onClick={() => updateTextLayer(selectedText.id, { fontSize: 24 })}
                  className="text-xs cursor-pointer px-1 text-muted-foreground hover:text-primary"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>
            <input
              type="range"
              min={8}
              max={72}
              value={selectedText.fontSize}
              onChange={(e) => updateTextLayer(selectedText.id, { fontSize: Number(e.target.value) })}
              className="w-full range cursor-pointer range-lg range-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium">Font Weight</label>
            <Select
              value={selectedText.fontWeight}
              onValueChange={(value) => updateTextLayer(selectedText.id, { fontWeight: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONT_WEIGHTS.map((weight) => (
                  <SelectItem key={weight.value} value={weight.value}>
                    {weight.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium">Text Align</label>
            <Select
              value={selectedText.textAlign}
              onValueChange={(value) => updateTextLayer(selectedText.id, { textAlign: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEXT_ALIGN_OPTIONS.map((align) => (
                  <SelectItem key={align.value} value={align.value}>
                    {align.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium">Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={selectedText.color}
                onChange={(e) => updateTextLayer(selectedText.id, { color: e.target.value })}
                className="w-10 h-10 border border-border rounded cursor-pointer"
              />
              <Input
                value={selectedText.color}
                onChange={(e) => updateTextLayer(selectedText.id, { color: e.target.value })}
                className="flex-1"
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">Opacity</label>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{Math.round(selectedText.opacity * 100)}%</span>
                <button
                  onClick={() => updateTextLayer(selectedText.id, { opacity: 1 })}
                  className="text-xs cursor-pointer px-1 text-muted-foreground hover:text-primary"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={selectedText.opacity}
              onChange={(e) => updateTextLayer(selectedText.id, { opacity: Number(e.target.value) })}
              className="w-full range cursor-pointer range-lg range-primary"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">Rotation</label>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{selectedText.rotation}&deg;</span>
                <button
                  onClick={() => updateTextLayer(selectedText.id, { rotation: 0 })}
                  className="text-xs cursor-pointer px-1 text-muted-foreground hover:text-primary"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>
            <input
              type="range"
              min={-180}
              max={180}
              value={selectedText.rotation}
              onChange={(e) => updateTextLayer(selectedText.id, { rotation: Number(e.target.value) })}
              className="w-full range cursor-pointer range-lg range-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function TextRenderer({ 
  textLayers, 
  selectedTextId, 
  setSelectedTextId,
  canvasSize 
}: {
  textLayers: TextLayerData[];
  selectedTextId: string | null;
  setSelectedTextId: (id: string | null) => void;
  canvasSize: number;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedTextId(null);
    }
  };

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      onClick={handleCanvasClick}
    >
      {textLayers.map((layer) => (
        <div
          key={layer.id}
          className={`absolute pointer-events-auto cursor-move select-none ${
            layer.id === selectedTextId ? 'ring-2 ring-blue-500' : ''
          }`}
          style={{
            left: layer.x,
            top: layer.y,
            transform: `rotate(${layer.rotation}deg)`,
            fontFamily: layer.fontFamily,
            fontSize: layer.fontSize,
            fontWeight: layer.fontWeight,
            color: layer.color,
            textAlign: layer.textAlign as any,
            opacity: layer.opacity,
            userSelect: 'none',
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setSelectedTextId(layer.id);
          }}
        >
          {layer.text}
        </div>
      ))}
    </div>
  );
}
