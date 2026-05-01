import React, { useCallback, useState } from 'react';

import { useChatData, useChatInteract } from '@chainlit/react-client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface WidgetDict {
  type: string;
  id: string;
  label?: string;
  initial?: any;
  items?: { label: string; value: string }[];
  tooltip?: string;
  disabled?: boolean;
}

interface InputBarWidgetProps {
  widget: WidgetDict;
  disabled?: boolean;
}

const SelectWidget = ({ widget, disabled }: InputBarWidgetProps) => {
  const { updateInputWidget } = useChatInteract();
  const [value, setValue] = useState<string>(widget.initial || '');

  const handleChange = useCallback(
    (newVal: string) => {
      setValue(newVal);
      updateInputWidget(widget.id, newVal);
    },
    [widget.id, updateInputWidget]
  );

  const trigger = (
    <Select
      disabled={disabled || widget.disabled}
      value={value}
      onValueChange={handleChange}
    >
      <SelectTrigger
        id={widget.id}
        className="h-7 text-xs rounded-full px-3 border-border/50 bg-background min-w-[90px] max-w-[180px]"
      >
        <SelectValue placeholder={widget.label || 'Select'} />
      </SelectTrigger>
      <SelectContent>
        {(widget.items || []).map((item) => (
          <SelectItem key={item.value} value={item.value} className="text-xs">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  if (widget.tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
          <TooltipContent>
            <p>{widget.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return trigger;
};

const SwitchWidget = ({ widget, disabled }: InputBarWidgetProps) => {
  const { updateInputWidget } = useChatInteract();
  const [checked, setChecked] = useState<boolean>(!!widget.initial);

  const handleChange = useCallback(
    (newVal: boolean) => {
      setChecked(newVal);
      updateInputWidget(widget.id, newVal);
    },
    [widget.id, updateInputWidget]
  );

  const content = (
    <div className="flex items-center gap-1.5">
      <Switch
        id={widget.id}
        checked={checked}
        disabled={disabled || widget.disabled}
        onCheckedChange={handleChange}
        className="scale-75 data-[state=checked]:bg-primary"
      />
      {widget.label && (
        <label
          htmlFor={widget.id}
          className="text-xs text-muted-foreground cursor-pointer select-none"
        >
          {widget.label}
        </label>
      )}
    </div>
  );

  if (widget.tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{content}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{widget.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

interface InputBarWidgetsProps {
  disabled?: boolean;
}

export const InputBarWidgets = ({ disabled }: InputBarWidgetsProps) => {
  const { inputWidgets } = useChatData();

  if (!inputWidgets || inputWidgets.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap pb-1">
      {inputWidgets.map((widget: WidgetDict) => {
        if (widget.type === 'select') {
          return (
            <SelectWidget key={widget.id} widget={widget} disabled={disabled} />
          );
        }
        if (widget.type === 'switch') {
          return (
            <SwitchWidget key={widget.id} widget={widget} disabled={disabled} />
          );
        }
        return null;
      })}
    </div>
  );
};
