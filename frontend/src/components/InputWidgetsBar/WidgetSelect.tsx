import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Adjust import if necessary
import { useChatSession } from '@chainlit/react-client';
import { IInputWidget, IInputItem } from 'types/Input';

interface WidgetSelectProps extends IInputWidget {
  // type: 'select' is implied by usage
  items: IInputItem[]; // Ensure items is always provided for select
}

const WidgetSelect = (widget: WidgetSelectProps) => {
  const { socket } = useChatSession();
  // Ensure initial value is one of the item values, or default to first if not specified/invalid
  const getValidInitial = () => {
    if (widget.initial && widget.items.find(item => item.value === widget.initial)) {
      return widget.initial;
    }
    return widget.items.length > 0 ? widget.items[0].value : '';
  }
  
  const [value, setValue] = useState<string>(getValidInitial());

  useEffect(() => {
     setValue(getValidInitial());
  }, [widget.initial, widget.items]);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (socket) {
      console.log(`Emitting input_widget_change for ${widget.id}: ${newValue}`);
      socket.emit('input_widget_change', { id: widget.id, value: newValue });
    }
  };

  return (
    <div className="widget-select flex items-center space-x-2 p-1" style={{ minWidth: '150px' }}>
      {/* <label htmlFor={widget.id} className="text-xs whitespace-nowrap">{widget.label}</label> */}
      <Select
        value={value}
        onValueChange={handleValueChange}
        name={widget.id}
      >
        <SelectTrigger id={widget.id} className="w-full text-xs" aria-label={widget.label}>
          <SelectValue placeholder={widget.label || "Select..."} />
        </SelectTrigger>
        <SelectContent>
          {(widget.items || []).map((item) => (
            <SelectItem key={item.value} value={item.value} className="text-xs">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WidgetSelect;
