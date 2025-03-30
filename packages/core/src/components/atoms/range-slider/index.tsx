import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

export interface RangeSliderMark {
  value: number;
  label?: string;
}

export interface RangeSliderProps {
  /**
   * Minimum value of the slider
   */
  min?: number;
  /**
   * Maximum value of the slider
   */
  max?: number;
  /**
   * Step increment between values
   */
  step?: number;
  /**
   * Current value(s) of the slider (controlled mode)
   */
  value?: number | [number, number];
  /**
   * Default value(s) of the slider (uncontrolled mode)
   */
  defaultValue?: number | [number, number];
  /**
   * Label for the slider
   */
  label?: string;
  /**
   * When to show tooltips: 'always', 'hover', or 'never'
   */
  showTooltip?: 'always' | 'hover' | 'never';
  /**
   * Display min/max values
   */
  showMinMaxLabels?: boolean;
  /**
   * Show markers on the track
   */
  showMarkers?: boolean;
  /**
   * Number of markers to display (only if showMarkers is true)
   */
  markerCount?: number;
  /**
   * Show the current value label
   */
  showValueLabel?: boolean;
  /**
   * Function to format the displayed values
   */
  formatValue?: (value: number) => string;
  /**
   * Size of the slider
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Width of the slider container
   */
  width?: string;
  /**
   * Color theme of the slider
   */
  color?: string;
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;
  /**
   * Called when the value changes
   */
  onChange?: (value: number | [number, number]) => void;
  /**
   * Called when user starts dragging
   */
  onChangeStart?: (value: number | [number, number]) => void;
  /**
   * Called when user stops dragging
   */
  onChangeEnd?: (value: number | [number, number]) => void;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Additional CSS classes for the track
   */
  trackClassName?: string;
  /**
   * Additional CSS classes for the filled track
   */
  filledTrackClassName?: string;
  /**
   * Additional CSS classes for the handle
   */
  handleClassName?: string;
  /**
   * ID for the slider
   */
  id?: string;
  /**
   * Aria label for accessibility
   */
  ariaLabel?: string;
  /**
   * Custom marks for the slider
   */
  marks?: RangeSliderMark[];
  /**
   * Show tick marks
   */
  showTicks?: boolean;
  /**
   * Orientation of the slider
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Height for vertical orientation
   */
  height?: string;
}

const RangeSlider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  label,
  showTooltip = 'hover',
  showMinMaxLabels = false,
  showMarkers = false,
  markerCount = 5,
  showValueLabel = false,
  formatValue = (value) => value.toString(),
  size = 'md',
  width = '100%',
  color = 'primary',
  disabled = false,
  onChange,
  onChangeStart,
  onChangeEnd,
  className = '',
  trackClassName = '',
  filledTrackClassName = '',
  handleClassName = '',
  id,
  ariaLabel,
  marks,
  showTicks = false,
  orientation = 'horizontal',
  height = '200px',
}: RangeSliderProps) => {
  const isRange = Array.isArray(defaultValue) || Array.isArray(value);

  // internal state based on controlled or uncontrolled mode
  const [internalValue, setInternalValue] = useState<number | [number, number]>(
    () => {
      if (value !== undefined) {
        return value;
      } else if (defaultValue !== undefined) {
        return defaultValue;
      } else {
        return isRange ? [min, max] : min;
      }
    }
  );

  // element ref for calculations
  const trackRef = useRef<HTMLDivElement>(null);

  // for tooltip and drag state
  const [isDragging, setIsDragging] = useState(false);
  const [activeDragHandle, setActiveDragHandle] = useState<
    'min' | 'max' | null
  >(null);
  const [hoveredHandle, setHoveredHandle] = useState<'min' | 'max' | null>(
    null
  );

  // update internal state if controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // helper to get current values for min and max in range mode
  const getRangeValues = (): [number, number] => {
    if (isRange && Array.isArray(internalValue)) {
      return internalValue;
    }
    return [min, internalValue as number];
  };

  // get current value(s)
  const currentMin = isRange ? (internalValue as [number, number])[0] : min;
  const currentMax = isRange
    ? (internalValue as [number, number])[1]
    : (internalValue as number);

  // percentage for positioning
  const minPercent = ((currentMin - min) / (max - min)) * 100;
  const maxPercent = ((currentMax - min) / (max - min)) * 100;

  // helper to convert mouse/touch position to slider value
  const positionToValue = (position: number, trackRect: DOMRect): number => {
    let percent: number;

    if (orientation === 'horizontal') {
      percent = Math.max(
        0,
        Math.min(100, ((position - trackRect.left) / trackRect.width) * 100)
      );
    } else {
      // for vertical slider, invert the calculation (0% at bottom, 100% at top)
      percent = Math.max(
        0,
        Math.min(
          100,
          100 - ((position - trackRect.top) / trackRect.height) * 100
        )
      );
    }

    // Convert percent to value
    let rawValue = min + (percent / 100) * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;

    // ensure the value is within bounds and respects step
    return Math.max(min, Math.min(max, steppedValue));
  };

  // get position from event
  const getPositionFromEvent = (
    e: MouseEvent | TouchEvent
  ): { clientX: number; clientY: number } => {
    if ('touches' in e) {
      return {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      };
    }
    return {
      clientX: e.clientX,
      clientY: e.clientY,
    };
  };

  // determine which handle to move based on click position
  const getActiveHandleForPosition = (
    position: number,
    trackRect: DOMRect
  ): 'min' | 'max' => {
    if (!isRange) return 'max';

    const clickPercent =
      orientation === 'horizontal'
        ? ((position - trackRect.left) / trackRect.width) * 100
        : 100 - ((position - trackRect.top) / trackRect.height) * 100;

    const minDistance = Math.abs(clickPercent - minPercent);
    const maxDistance = Math.abs(clickPercent - maxPercent);

    // choose the closest handle to the click position
    return minDistance <= maxDistance ? 'min' : 'max';
  };

  // handle mouse/touch down event for track or handle
  const handlePointerDown = (
    e: React.MouseEvent | React.TouchEvent,
    handle?: 'min' | 'max'
  ) => {
    if (disabled) return;

    // avoid text selection during drag
    e.preventDefault();

    const trackRect = trackRef.current?.getBoundingClientRect();
    if (!trackRect) return;

    const nativeEvent = e.nativeEvent;
    const position =
      'touches' in nativeEvent
        ? {
            clientX: nativeEvent.touches[0].clientX,
            clientY: nativeEvent.touches[0].clientY,
          }
        : { clientX: nativeEvent.clientX, clientY: nativeEvent.clientY };

    // if handle is not explicitly provided (track click), determine which one to move
    const activeHandle =
      handle ||
      getActiveHandleForPosition(
        orientation === 'horizontal' ? position.clientX : position.clientY,
        trackRect
      );

    setIsDragging(true);
    setActiveDragHandle(activeHandle);

    // for track clicks, update the value immediately
    if (!handle) {
      const newValue = positionToValue(
        orientation === 'horizontal' ? position.clientX : position.clientY,
        trackRect
      );

      updateValueForHandle(activeHandle, newValue);
    }

    if (onChangeStart) onChangeStart(internalValue);

    // event listeners for drag and drop
    document.addEventListener('mousemove', handlePointerMove);
    document.addEventListener('touchmove', handlePointerMove);
    document.addEventListener('mouseup', handlePointerUp);
    document.addEventListener('touchend', handlePointerUp);
  };

  // update value based on active handle
  const updateValueForHandle = (handle: 'min' | 'max', newValue: number) => {
    if (isRange) {
      const [currentMinVal, currentMaxVal] = getRangeValues();

      if (handle === 'min') {
        // min handle can't go beyond max handle minus step
        const updatedMin = Math.min(newValue, currentMaxVal - step);
        const updatedValue: [number, number] = [updatedMin, currentMaxVal];

        setInternalValue(updatedValue);
        if (onChange) onChange(updatedValue);
      } else {
        // max handle can't go below min handle plus step
        const updatedMax = Math.max(newValue, currentMinVal + step);
        const updatedValue: [number, number] = [currentMinVal, updatedMax];

        setInternalValue(updatedValue);
        if (onChange) onChange(updatedValue);
      }
    } else {
      // single slider case
      setInternalValue(newValue);
      if (onChange) onChange(newValue);
    }
  };

  // handle mouse/touch move event
  const handlePointerMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !trackRef.current || !activeDragHandle) return;

    e.preventDefault();
    const trackRect = trackRef.current.getBoundingClientRect();
    const position = getPositionFromEvent(e);

    const clientPosition =
      orientation === 'horizontal' ? position.clientX : position.clientY;

    const newValue = positionToValue(clientPosition, trackRect);
    updateValueForHandle(activeDragHandle, newValue);
  };

  // handle mouse/touch up event
  const handlePointerUp = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    e.preventDefault();
    setIsDragging(false);
    setActiveDragHandle(null);

    if (onChangeEnd) onChangeEnd(internalValue);

    document.removeEventListener('mousemove', handlePointerMove);
    document.removeEventListener('touchmove', handlePointerMove);
    document.removeEventListener('mouseup', handlePointerUp);
    document.removeEventListener('touchend', handlePointerUp);
  };

  // size variations
  const sizeClasses = {
    track: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    },
    handle: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
    vertical: {
      track: {
        sm: 'w-1',
        md: 'w-2',
        lg: 'w-3',
      },
    },
  };

  // styles for track, filled track, and handles
  const styleProps = {
    container: {
      width: orientation === 'horizontal' ? width : 'auto',
      height: orientation === 'vertical' ? height : 'auto',
    },
    track: {
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
    filledTrack: {
      left: isRange ? `${minPercent}%` : '0%',
      right: `${100 - maxPercent}%`,
      // vertical orientation
      bottom: isRange ? `${minPercent}%` : '0%',
      top: `${100 - maxPercent}%`,
    },
    minHandle: {
      left: `${minPercent}%`,
      // vertical orientation
      bottom: `${minPercent}%`,
    },
    maxHandle: {
      left: `${maxPercent}%`,
      // vertical orientation
      bottom: `${maxPercent}%`,
    },
  };

  // determine when to show tooltips
  const showMinTooltip =
    isRange &&
    (showTooltip === 'always' ||
      (showTooltip === 'hover' &&
        (hoveredHandle === 'min' ||
          (isDragging && activeDragHandle === 'min'))));

  const showMaxTooltip =
    showTooltip === 'always' ||
    (showTooltip === 'hover' &&
      (hoveredHandle === 'max' || (isDragging && activeDragHandle === 'max')));

  // make markers if needed
  const markers = showMarkers
    ? Array.from({ length: markerCount }).map((_, i) => {
        const markerValue = min + (i / (markerCount - 1)) * (max - min);
        const markerPercent = ((markerValue - min) / (max - min)) * 100;
        return { value: markerValue, percent: markerPercent };
      })
    : [];

  // make marks if provided
  const renderMarks = marks
    ? marks.map((mark) => {
        const markPercent = ((mark.value - min) / (max - min)) * 100;
        return { ...mark, percent: markPercent };
      })
    : [];

  // make a unique ID if one isn't provided
  const sliderId = id || `slider-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        orientation === 'horizontal' ? 'w-full' : 'h-full',
        className
      )}
      style={styleProps.container}
    >
      {/* label & value display */}
      {(label || showValueLabel) && (
        <div className="flex items-center justify-between">
          {label && (
            <label id={`${sliderId}-label`} className="text-sm font-medium">
              {label}
            </label>
          )}
          {showValueLabel && (
            <div className="text-sm">
              {isRange
                ? `${formatValue(currentMin)} - ${formatValue(currentMax)}`
                : formatValue(currentMax)}
            </div>
          )}
        </div>
      )}

      {/* main slider */}
      <div
        className={cn(
          'relative',
          orientation === 'vertical' ? 'h-full flex items-center' : 'w-full'
        )}
      >
        {/* track */}
        <div
          ref={trackRef}
          className={cn(
            'rounded-full bg-secondary',
            orientation === 'horizontal'
              ? sizeClasses.track[size]
              : sizeClasses.vertical.track[size],
            orientation === 'horizontal' ? 'w-full' : 'h-full',
            disabled && 'opacity-50',
            trackClassName
          )}
          style={styleProps.track}
          onMouseDown={(e) => handlePointerDown(e)}
          onTouchStart={(e) => handlePointerDown(e)}
          id={sliderId}
          aria-disabled={disabled}
        >
          {/* filled Track */}
          <div
            className={cn(
              'absolute rounded-full',
              `bg-${color}`,
              orientation === 'horizontal'
                ? sizeClasses.track[size]
                : sizeClasses.vertical.track[size],
              filledTrackClassName
            )}
            style={
              orientation === 'horizontal'
                ? {
                    left: styleProps.filledTrack.left,
                    right: styleProps.filledTrack.right,
                  }
                : {
                    bottom: styleProps.filledTrack.bottom,
                    top: styleProps.filledTrack.top,
                  }
            }
          />

          {/* ticks/markers */}
          {showMarkers &&
            markers.map((marker, index) => (
              <div
                key={`marker-${index}`}
                className={cn(
                  'absolute -translate-x-1/2 w-0.5 h-1.5 bg-secondary',
                  orientation === 'vertical' &&
                    'translate-x-0 -translate-y-1/2 h-0.5 w-1.5'
                )}
                style={
                  orientation === 'horizontal'
                    ? {
                        left: `${marker.percent}%`,
                        top: '100%',
                        marginTop: '4px',
                      }
                    : {
                        bottom: `${marker.percent}%`,
                        left: '100%',
                        marginLeft: '4px',
                      }
                }
              />
            ))}

          {/* custom marks */}
          {renderMarks.map((mark, index) => (
            <div
              key={`mark-${index}`}
              className="absolute"
              style={
                orientation === 'horizontal'
                  ? {
                      left: `${mark.percent}%`,
                      top: '100%',
                      transform: 'translateX(-50%)',
                      marginTop: '8px',
                    }
                  : {
                      bottom: `${mark.percent}%`,
                      left: '100%',
                      transform: 'translateY(50%)',
                      marginLeft: '8px',
                    }
              }
            >
              {mark.label && <span className="text-xs">{mark.label}</span>}
              <div
                className={cn(
                  'w-1 h-3 bg-primary rounded-full',
                  orientation === 'vertical' && 'h-1 w-3'
                )}
                style={{ marginTop: mark.label ? '2px' : 0 }}
              />
            </div>
          ))}

          {/* min Handle (for range slider) */}
          {isRange && (
            <div
              className={cn(
                'absolute rounded-full shadow-md border-2 border-primary bg-background',
                'focus-visible:ring-2 focus-visible:ring-primary/50 outline-none',
                disabled
                  ? 'cursor-not-allowed'
                  : 'cursor-grab active:cursor-grabbing',
                sizeClasses.handle[size],
                isDragging &&
                  activeDragHandle === 'min' &&
                  'ring-2 ring-primary/50',
                handleClassName
              )}
              style={
                orientation === 'horizontal'
                  ? {
                      left: styleProps.minHandle.left,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      touchAction: 'none',
                    }
                  : {
                      bottom: styleProps.minHandle.bottom,
                      left: '50%',
                      transform: 'translate(-50%, 50%)',
                      touchAction: 'none',
                    }
              }
              onMouseDown={(e) => {
                handlePointerDown(e, 'min');
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                handlePointerDown(e, 'min');
                e.stopPropagation();
              }}
              onMouseEnter={() => setHoveredHandle('min')}
              onMouseLeave={() => setHoveredHandle(null)}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-valuemin={min}
              aria-valuemax={currentMax}
              aria-valuenow={currentMin}
              aria-valuetext={formatValue(currentMin)}
              aria-orientation={orientation}
              aria-label={`${ariaLabel || label || 'slider'} minimum value`}
              aria-disabled={disabled}
              data-handle="min"
            >
              {/* tooltip */}
              {showMinTooltip && (
                <div
                  className={cn(
                    'absolute whitespace-nowrap text-xs px-2 py-1 rounded bg-primary text-primary-foreground',
                    orientation === 'horizontal'
                      ? 'bottom-full mb-2 left-1/2 -translate-x-1/2'
                      : 'right-full mr-2 top-1/2 -translate-y-1/2'
                  )}
                >
                  {formatValue(currentMin)}
                </div>
              )}
            </div>
          )}

          {/* max Handle */}
          <div
            className={cn(
              'absolute rounded-full shadow-md border-2 border-primary bg-background',
              'focus-visible:ring-2 focus-visible:ring-primary/50 outline-none',
              disabled
                ? 'cursor-not-allowed'
                : 'cursor-grab active:cursor-grabbing',
              sizeClasses.handle[size],
              isDragging &&
                activeDragHandle === 'max' &&
                'ring-2 ring-primary/50',
              handleClassName
            )}
            style={
              orientation === 'horizontal'
                ? {
                    left: styleProps.maxHandle.left,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    touchAction: 'none',
                  }
                : {
                    bottom: styleProps.maxHandle.bottom,
                    left: '50%',
                    transform: 'translate(-50%, 50%)',
                    touchAction: 'none',
                  }
            }
            onMouseDown={(e) => {
              handlePointerDown(e, 'max');
              e.stopPropagation();
            }}
            onTouchStart={(e) => {
              handlePointerDown(e, 'max');
              e.stopPropagation();
            }}
            onMouseEnter={() => setHoveredHandle('max')}
            onMouseLeave={() => setHoveredHandle(null)}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={isRange ? currentMin : min}
            aria-valuemax={max}
            aria-valuenow={currentMax}
            aria-valuetext={formatValue(currentMax)}
            aria-orientation={orientation}
            aria-label={`${ariaLabel || label || 'slider'} ${isRange ? 'maximum' : ''} value`}
            aria-disabled={disabled}
            data-handle="max"
            data-testid="slider-handle"
          >
            {/* tooltip */}
            {showMaxTooltip && (
              <div
                className={cn(
                  'absolute whitespace-nowrap text-xs px-2 py-1 rounded bg-primary text-primary-foreground',
                  orientation === 'horizontal'
                    ? 'bottom-full mb-2 left-1/2 -translate-x-1/2'
                    : 'right-full mr-2 top-1/2 -translate-y-1/2'
                )}
              >
                {formatValue(currentMax)}
              </div>
            )}
          </div>
        </div>

        {/* min/max Labels */}
        {showMinMaxLabels && orientation === 'horizontal' && (
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        )}

        {/* min/max labels for vertical orientation */}
        {showMinMaxLabels && orientation === 'vertical' && (
          <div className="flex flex-col justify-between h-full ml-1 text-xs text-muted-foreground">
            <span>{formatValue(max)}</span>
            <span>{formatValue(min)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export { RangeSlider };
