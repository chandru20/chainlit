import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input'; // Adjust import if necessary
import { Textarea } from '@/components/ui/textarea'; // For multiline
import { useChatSession } from '@chainlit/react-client';
import { IInputWidget } from 'types/Input';
import { Button } from '@/components/ui/button'; // Optional: for a submit button

interface WidgetTextInputProps extends IInputWidget {
  // type: 'textinput' is implied
  multiline?: boolean;
  placeholder?: string;
}

const WidgetTextInput = (widget: WidgetTextInputProps) => {
  const { socket } = useChatSession();
  const [value, setValue] = useState<string>(widget.initial || '');

  useEffect(() => {
    setValue(widget.initial || '');
  }, [widget.initial]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    if (socket) {
      console.log(`Emitting input_widget_change for ${widget.id}: ${value}`);
      socket.emit('input_widget_change', { id: widget.id, value: value });
    }
  };
  
  // Debounce emit or emit on blur/enter? For now, using a submit button or on blur.
  const handleBlur = () => { // Removed _side_effects from here
    // Emit on blur
     if (socket) {
      console.log(`Emitting input_widget_change (on blur) for ${widget.id}: ${value}`);
      socket.emit('input_widget_change', { id: widget.id, value: value });
    }
  }

  const commonProps = {
    id: widget.id,
    name: widget.id,
    value: value,
    onChange: handleChange,
    onBlur: handleBlur, // Emit on blur
    placeholder: widget.placeholder || widget.label,
    className: "text-xs p-1",
    "aria-label": widget.label,
  };

  return (
    <div className="widget-text-input flex items-center space-x-1 p-1" style={{ minWidth: '150px' }}>
      {widget.multiline ? (
        <Textarea {...commonProps} rows={2} />
      ) : (
        <Input {...commonProps} type="text" />
      )}
      {/* Optional: Submit button if not relying solely on blur 
      <Button onClick={handleSubmit} size="sm" className="text-xs p-1">Send</Button> 
      */}
    </div>
  );
};

export default WidgetTextInput;
