import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { Check, Copy, Pipette, RefreshCw } from 'lucide-react';

// Define color modes
export type ColorMode = 'hex' | 'rgb' | 'hsl';

// Define the shape of the color object
export interface ColorValue {
  hex: string;
  rgb: { r: number; g: number; b: number; a: number };
  hsl: { h: number; s: number; l: number; a: number };
}

// Default color object
const defaultColor: ColorValue = {
  hex: '#3B82F6',
  rgb: { r: 59, g: 130, b: 246, a: 1 },
  hsl: { h: 217, s: 91, l: 60, a: 1 },
};

export interface ColorPickerProps {
  /**
   * Current color value
   */
  value?: string;

  /**
   * Called when a color is selected
   */
  onChange?: (value: string, colorObject: ColorValue) => void;

  /**
   * Default color mode to display
   */
  defaultMode?: ColorMode;

  /**
   * Include alpha channel control
   */
  withAlpha?: boolean;

  /**
   * Show or hide color presets
   */
  showPresets?: boolean;

  /**
   * Custom color presets
   */
  presets?: string[];

  /**
   * Show eyedropper tool (if browser supports it)
   */
  showEyeDropper?: boolean;

  /**
   * Show color format switcher
   */
  showFormatToggle?: boolean;

  /**
   * Display recently used colors
   */
  showRecentColors?: boolean;

  /**
   * Maximum number of recent colors to store
   */
  maxRecentColors?: number;

  /**
   * Format to return color value in
   */
  returnFormat?: ColorMode | 'auto';

  /**
   * Additional class names for container
   */
  className?: string;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Show copy button
   */
  showCopyButton?: boolean;

  /**
   * Aria label
   */
  ariaLabel?: string;

  /**
   * Component size
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Convert hex to RGB
 */
const hexToRgb = (
  hex: string
): { r: number; g: number; b: number; a: number } => {
  // Remove # if present
  hex = hex.replace('#', '');

  // Handle shorthand hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Handle hex with alpha
  let alpha = 1;
  if (hex.length === 8) {
    alpha = parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b, a: alpha };
};

/**
 * Convert RGB to hex
 */
const rgbToHex = ({
  r,
  g,
  b,
  a = 1,
}: {
  r: number;
  g: number;
  b: number;
  a: number;
}): string => {
  const toHex = (value: number) => {
    const hex = Math.round(value).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  // Add alpha if not 1
  if (a < 1) {
    const alphaHex = toHex(a * 255);
    return `${hex}${alphaHex}`;
  }

  return hex;
};

/**
 * Convert RGB to HSL
 */
const rgbToHsl = ({
  r,
  g,
  b,
  a = 1,
}: {
  r: number;
  g: number;
  b: number;
  a: number;
}): { h: number; s: number; l: number; a: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a,
  };
};

/**
 * Convert HSL to RGB
 */
const hslToRgb = ({
  h,
  s,
  l,
  a = 1,
}: {
  h: number;
  s: number;
  l: number;
  a: number;
}): { r: number; g: number; b: number; a: number } => {
  s /= 100;
  l /= 100;
  h = h % 360;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a,
  };
};

/**
 * Validate and normalize HEX color
 */
const validateHex = (color: string): string => {
  // Add # if missing
  if (!color.startsWith('#')) {
    color = '#' + color;
  }

  // Check if valid hex
  if (!/^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(color)) {
    return '#000000';
  }

  return color;
};

/**
 * Generate a full color object from any color input
 */
const generateColorObject = (color: string): ColorValue => {
  // Determine the format of the input color
  if (color.startsWith('#')) {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb);
    return {
      hex: validateHex(color),
      rgb,
      hsl,
    };
  } else if (color.startsWith('rgb')) {
    // Parse RGB color
    const match = color.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
    );
    if (match) {
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      const a = match[4] ? parseFloat(match[4]) : 1;

      const rgb = { r, g, b, a };
      const hex = rgbToHex(rgb);
      const hsl = rgbToHsl(rgb);

      return { hex, rgb, hsl };
    }
  } else if (color.startsWith('hsl')) {
    // Parse HSL color
    const match = color.match(
      /hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/
    );
    if (match) {
      const h = parseInt(match[1], 10);
      const s = parseInt(match[2], 10);
      const l = parseInt(match[3], 10);
      const a = match[4] ? parseFloat(match[4]) : 1;

      const hsl = { h, s, l, a };
      const rgb = hslToRgb(hsl);
      const hex = rgbToHex(rgb);

      return { hex, rgb, hsl };
    }
  }

  // Default to blue if parsing fails
  return defaultColor;
};

/**
 * Format a color object according to the specified mode
 */
const formatColor = (color: ColorValue, mode: ColorMode): string => {
  switch (mode) {
    case 'hex':
      return color.hex;
    case 'rgb':
      const { r, g, b, a } = color.rgb;
      return a < 1
        ? `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`
        : `rgb(${r}, ${g}, ${b})`;
    case 'hsl':
      const { h, s, l, a: alpha } = color.hsl;
      return alpha < 1
        ? `hsla(${h}, ${s}%, ${l}%, ${alpha.toFixed(2)})`
        : `hsl(${h}, ${s}%, ${l}%)`;
    default:
      return color.hex;
  }
};

// Common color presets
const defaultPresets = [
  '#000000', // Black
  '#FFFFFF', // White
  '#F44336', // Red
  '#E91E63', // Pink
  '#9C27B0', // Purple
  '#673AB7', // Deep Purple
  '#3F51B5', // Indigo
  '#2196F3', // Blue
  '#03A9F4', // Light Blue
  '#00BCD4', // Cyan
  '#009688', // Teal
  '#4CAF50', // Green
  '#8BC34A', // Light Green
  '#CDDC39', // Lime
  '#FFEB3B', // Yellow
  '#FFC107', // Amber
  '#FF9800', // Orange
  '#FF5722', // Deep Orange
  '#795548', // Brown
  '#9E9E9E', // Gray
];

const ColorPicker = ({
  value,
  onChange,
  defaultMode = 'hex',
  withAlpha = true,
  showPresets = true,
  presets = defaultPresets,
  showEyeDropper = true,
  showFormatToggle = true,
  showRecentColors = true,
  maxRecentColors = 5,
  returnFormat = 'auto',
  className = '',
  disabled = false,
  showCopyButton = true,
  ariaLabel = 'Color picker',
  size = 'md',
}: ColorPickerProps) => {
  // Check if EyeDropper API is available
  const isEyeDropperSupported =
    typeof window !== 'undefined' && 'EyeDropper' in window;

  // Parse initial color or use default
  const initialColor = value ? generateColorObject(value) : defaultColor;

  // State for color and mode
  const [colorObj, setColorObj] = useState<ColorValue>(initialColor);
  const [mode, setMode] = useState<ColorMode>(defaultMode);
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Refs
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Initialize EyeDropper if supported
  const eyeDropperRef = useRef<any>(null);
  if (typeof window !== 'undefined' && 'EyeDropper' in window) {
    eyeDropperRef.current = new (window as any).EyeDropper();
  }

  // Update color object when value prop changes
  useEffect(() => {
    if (value) {
      setColorObj(generateColorObject(value));
    }
  }, [value]);

  // Helper to get the actual return format
  const getReturnFormat = (): ColorMode => {
    if (returnFormat === 'auto') {
      // If input was in a specific format, return that format
      if (value?.startsWith('#')) return 'hex';
      if (value?.startsWith('rgb')) return 'rgb';
      if (value?.startsWith('hsl')) return 'hsl';
      return mode;
    }
    return returnFormat as ColorMode;
  };

  // Handle color change and call onChange prop
  const handleColorChange = (newColorObj: ColorValue) => {
    setColorObj(newColorObj);

    if (onChange) {
      const format = getReturnFormat();
      const formattedColor = formatColor(newColorObj, format);
      onChange(formattedColor, newColorObj);

      // Add to recent colors
      if (showRecentColors) {
        const hex = newColorObj.hex;
        setRecentColors((prev) => {
          const filtered = prev.filter((c) => c !== hex);
          return [hex, ...filtered].slice(0, maxRecentColors);
        });
      }
    }
  };

  // Handle hex input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = validateHex(e.target.value);
    const newColorObj = generateColorObject(hex);
    handleColorChange(newColorObj);
  };

  // Handle RGB input changes
  const handleRgbChange = (component: 'r' | 'g' | 'b' | 'a', value: number) => {
    const newRgb = { ...colorObj.rgb, [component]: value };
    const newHex = rgbToHex(newRgb);
    const newHsl = rgbToHsl(newRgb);
    const newColorObj = { hex: newHex, rgb: newRgb, hsl: newHsl };
    handleColorChange(newColorObj);
  };

  // Handle HSL input changes
  const handleHslChange = (component: 'h' | 's' | 'l' | 'a', value: number) => {
    const newHsl = { ...colorObj.hsl, [component]: value };
    const newRgb = hslToRgb(newHsl);
    const newHex = rgbToHex(newRgb);
    const newColorObj = { hex: newHex, rgb: newRgb, hsl: newHsl };
    handleColorChange(newColorObj);
  };

  // Handle hue slider change
  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleHslChange('h', parseInt(e.target.value, 10));
  };

  // Handle saturation-lightness area click
  const handleSLAreaChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    // Get the bounding rectangle of the color area
    const rect = e.currentTarget.getBoundingClientRect();

    // Calculate saturation (x-axis) and lightness (y-axis) based on click position
    // Make sure to use clientX and clientY relative to the element's position
    const s = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    );
    const l = Math.max(
      0,
      Math.min(100, 100 - ((e.clientY - rect.top) / rect.height) * 100)
    );

    // Update HSL with both new saturation and lightness values
    const newHsl = { ...colorObj.hsl, s, l };
    const newRgb = hslToRgb(newHsl);
    const newHex = rgbToHex(newRgb);
    const newColorObj = { hex: newHex, rgb: newRgb, hsl: newHsl };

    // Update all values at once
    handleColorChange(newColorObj);
  };

  // Handle alpha slider change
  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    handleHslChange('a', value);
    handleRgbChange('a', value);
  };

  // Handle preset color selection
  const handlePresetClick = (color: string) => {
    if (disabled) return;
    const newColorObj = generateColorObject(color);
    handleColorChange(newColorObj);
  };

  // Handle recent color selection
  const handleRecentClick = (color: string) => {
    if (disabled) return;
    const newColorObj = generateColorObject(color);
    handleColorChange(newColorObj);
  };

  // Handle eye dropper click
  const handleEyeDropperClick = async () => {
    if (disabled || !isEyeDropperSupported || !eyeDropperRef.current) return;

    try {
      const result = await eyeDropperRef.current.open();
      const newColorObj = generateColorObject(result.sRGBHex);
      handleColorChange(newColorObj);
    } catch (error) {
      // User cancelled or API error
      console.log('Eye dropper error or cancelled');
    }
  };

  // Handle copy to clipboard
  const handleCopyClick = () => {
    // Use the current display mode for the color format
    const formatToUse = mode;
    const formattedColor = formatColor(colorObj, formatToUse);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(formattedColor)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    } else {
      console.warn('Clipboard API not available');
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'w-56',
          slider: 'h-3',
          swatch: 'w-4 h-4',
          input: 'text-xs h-7',
          slArea: 'h-32',
        };
      case 'lg':
        return {
          container: 'w-80',
          slider: 'h-5',
          swatch: 'w-6 h-6',
          input: 'text-base h-9',
          slArea: 'h-48',
        };
      case 'md':
      default:
        return {
          container: 'w-64',
          slider: 'h-4',
          swatch: 'w-5 h-5',
          input: 'text-sm h-8',
          slArea: 'h-40',
        };
    }
  };

  const sizeClasses = getSizeClasses();

  // Format current color for display
  const displayColor = formatColor(colorObj, mode);

  return (
    <div
      className={cn(
        'bg-background rounded-lg p-4 border border-border shadow-sm select-none',
        sizeClasses.container,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      ref={colorPickerRef}
      aria-label={ariaLabel}
      role="application"
    >
      {/* Color preview */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            'rounded-md border border-border relative overflow-hidden',
            'w-10 h-10 flex-shrink-0'
          )}
          style={{
            backgroundColor: colorObj.hex,
            opacity: colorObj.rgb.a,
          }}
        >
          {/* Checkerboard pattern for alpha */}
          {colorObj.rgb.a < 1 && (
            <div className="absolute inset-0 opacity-50 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%),linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%)] bg-[length:10px_10px] bg-[position:0_0,5px_5px]" />
          )}
        </div>

        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              value={displayColor}
              onChange={(e) => {
                if (mode === 'hex') {
                  handleHexChange(e);
                }
              }}
              disabled={disabled || mode !== 'hex'}
              spellCheck="false"
              className={cn(
                'w-full bg-background px-2 rounded-md border border-input text-primary',
                'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
                'transition-all duration-200',
                disabled && 'cursor-not-allowed',
                sizeClasses.input
              )}
            />

            {showCopyButton && (
              <button
                type="button"
                onClick={handleCopyClick}
                disabled={disabled}
                className={cn(
                  'absolute right-1 top-1/2 -translate-y-1/2',
                  'p-1 rounded-md hover:bg-muted focus:outline-none focus:bg-muted',
                  'transition-colors duration-200',
                  disabled && 'cursor-not-allowed'
                )}
                title="Copy color"
                aria-label="Copy color to clipboard"
              >
                {copied ? (
                  <Check size={14} className="text-success" />
                ) : (
                  <Copy size={14} className="text-muted-foreground" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Saturation-Lightness area */}
      <div
        className={cn(
          'w-full mb-3 relative rounded-md cursor-crosshair overflow-hidden',
          'border border-border',
          disabled && 'cursor-not-allowed',
          sizeClasses.slArea
        )}
        style={{
          backgroundColor: `hsl(${colorObj.hsl.h}, 100%, 50%)`,
        }}
        onClick={handleSLAreaChange}
      >
        {/* White to transparent gradient (horizontal) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, white, rgba(255, 255, 255, 0))',
          }}
        />

        {/* Black to transparent gradient (vertical) */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), black)',
          }}
        />

        {/* Color indicator */}
        <div
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
          style={{
            left: `${colorObj.hsl.s}%`,
            top: `${100 - colorObj.hsl.l}%`,
          }}
        />
      </div>

      {/* Hue slider */}
      <div className="mb-3">
        <input
          type="range"
          min="0"
          max="359"
          value={colorObj.hsl.h}
          onChange={handleHueChange}
          disabled={disabled}
          className={cn(
            'w-full appearance-none rounded-lg',
            'bg-[linear-gradient(to_right,#f00_0%,#ff0_17%,#0f0_33%,#0ff_50%,#00f_67%,#f0f_83%,#f00_100%)]',
            'cursor-pointer',
            disabled && 'cursor-not-allowed',
            sizeClasses.slider
          )}
          style={{
            // Custom track and thumb styling
            WebkitAppearance: 'none',
            appearance: 'none',
          }}
        />
      </div>

      {/* Alpha slider */}
      {withAlpha && (
        <div className="mb-4 relative overflow-hidden">
          <div
            className={cn(
              'absolute inset-0 rounded-lg overflow-hidden opacity-50 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%),linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%)] bg-[length:10px_10px] bg-[position:0_0,5px_5px]',
              sizeClasses.slider
            )}
          />
          <div
            className={cn('absolute inset-0 rounded-lg', sizeClasses.slider)}
            style={{
              background: `linear-gradient(to right, rgba(${colorObj.rgb.r}, ${colorObj.rgb.g}, ${colorObj.rgb.b}, 0), rgba(${colorObj.rgb.r}, ${colorObj.rgb.g}, ${colorObj.rgb.b}, 1))`,
            }}
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={colorObj.rgb.a}
            onChange={handleAlphaChange}
            disabled={disabled}
            className={cn(
              'w-full appearance-none rounded-lg relative bg-transparent',
              'cursor-pointer',
              disabled && 'cursor-not-allowed',
              sizeClasses.slider
            )}
            style={{
              WebkitAppearance: 'none',
              appearance: 'none',
              margin: '0',
            }}
          />
        </div>
      )}

      {/* Format toggle buttons */}
      {showFormatToggle && (
        <div className="flex border rounded-md border-input mb-4 bg-background">
          {(['hex', 'rgb', 'hsl'] as ColorMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              disabled={disabled}
              className={cn(
                'flex-1 py-1 text-xs uppercase font-medium transition-colors',
                'focus:outline-none focus:bg-muted',
                mode === m
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:bg-muted',
                disabled && 'cursor-not-allowed'
              )}
            >
              {m}
            </button>
          ))}
        </div>
      )}

      {/* RGB inputs */}
      {mode === 'rgb' && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              R
            </label>
            <input
              type="number"
              min="0"
              max="255"
              value={colorObj.rgb.r}
              onChange={(e) =>
                handleRgbChange('r', parseInt(e.target.value, 10) || 0)
              }
              disabled={disabled}
              className={cn(
                'w-full bg-background px-2 rounded-md border border-input',
                'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
                'transition-all duration-200',
                sizeClasses.input
              )}
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              G
            </label>
            <input
              type="number"
              min="0"
              max="255"
              value={colorObj.rgb.g}
              onChange={(e) =>
                handleRgbChange('g', parseInt(e.target.value, 10) || 0)
              }
              disabled={disabled}
              className={cn(
                'w-full bg-background px-2 rounded-md border border-input',
                'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
                'transition-all duration-200',
                sizeClasses.input
              )}
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              B
            </label>
            <input
              type="number"
              min="0"
              max="255"
              value={colorObj.rgb.b}
              onChange={(e) =>
                handleRgbChange('b', parseInt(e.target.value, 10) || 0)
              }
              disabled={disabled}
              className={cn(
                'w-full bg-background px-2 rounded-md border border-input',
                'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
                'transition-all duration-200',
                sizeClasses.input
              )}
            />
          </div>
        </div>
      )}

      {/* HSL inputs */}
      {mode === 'hsl' && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              H
            </label>
            <input
              type="number"
              min="0"
              max="359"
              value={colorObj.hsl.h}
              onChange={(e) =>
                handleHslChange('h', parseInt(e.target.value, 10) || 0)
              }
              disabled={disabled}
              className={cn(
                'w-full bg-background px-2 rounded-md border border-input',
                'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
                'transition-all duration-200',
                sizeClasses.input
              )}
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              S
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={colorObj.hsl.s}
              onChange={(e) =>
                handleHslChange('s', parseInt(e.target.value, 10) || 0)
              }
              disabled={disabled}
              className={cn(
                'w-full bg-background px-2 rounded-md border border-input',
                'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
                'transition-all duration-200',
                sizeClasses.input
              )}
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              L
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={colorObj.hsl.l}
              onChange={(e) =>
                handleHslChange('l', parseInt(e.target.value, 10) || 0)
              }
              disabled={disabled}
              className={cn(
                'w-full bg-background px-2 rounded-md border border-input',
                'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
                'transition-all duration-200',
                sizeClasses.input
              )}
            />
          </div>
        </div>
      )}

      {/* Tools & actions */}
      <div className="flex items-center gap-2 mb-4">
        {/* Eyedropper button */}
        {showEyeDropper && isEyeDropperSupported && (
          <button
            type="button"
            onClick={handleEyeDropperClick}
            disabled={disabled}
            className={cn(
              'p-2 rounded-md border border-input',
              'hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30',
              'transition-colors duration-200',
              disabled && 'cursor-not-allowed'
            )}
            title="Pick color from screen"
            aria-label="Use eye dropper to pick color from screen"
          >
            <Pipette size={16} className="text-muted-foreground" />
          </button>
        )}

        {/* Reset button */}
        <button
          type="button"
          onClick={() => handleColorChange(defaultColor)}
          disabled={disabled}
          className={cn(
            'p-2 rounded-md border border-input',
            'hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30',
            'transition-colors duration-200',
            disabled && 'cursor-not-allowed'
          )}
          title="Reset to default color"
          aria-label="Reset to default color"
        >
          <RefreshCw size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Recent colors */}
      {showRecentColors && recentColors.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-muted-foreground mb-2">Recent</div>
          <div className="flex flex-wrap gap-2">
            {recentColors.map((color, index) => (
              <button
                key={`${color}-${index}`}
                type="button"
                onClick={() => handleRecentClick(color)}
                disabled={disabled}
                className={cn(
                  'rounded-md border border-border overflow-hidden',
                  'focus:outline-none focus:ring-2 focus:ring-primary/30',
                  'transition-all duration-200',
                  disabled && 'cursor-not-allowed',
                  sizeClasses.swatch
                )}
                style={{
                  backgroundColor: color,
                }}
                title={color}
                aria-label={`Select recent color ${color}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Color presets */}
      {showPresets && (
        <div>
          <div className="text-xs text-muted-foreground mb-2">Presets</div>
          <div className="flex flex-wrap gap-2">
            {presets.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handlePresetClick(color)}
                disabled={disabled}
                className={cn(
                  'rounded-md border border-border overflow-hidden',
                  'focus:outline-none focus:ring-2 focus:ring-primary/30',
                  'transition-all duration-200',
                  colorObj.hex === color && 'ring-2 ring-primary',
                  disabled && 'cursor-not-allowed',
                  sizeClasses.swatch
                )}
                style={{
                  backgroundColor: color,
                }}
                title={color}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { ColorPicker };
