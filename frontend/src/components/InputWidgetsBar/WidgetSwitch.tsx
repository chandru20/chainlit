import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch'; // Adjust import if necessary
import { useChatSession } from '@chainlit/react-client';
import { IInputWidget } from 'types/Input';

interface WidgetSwitchProps extends IInputWidget {
  // type: 'switch' is implied
}

const WidgetSwitch = (widget: WidgetSwitchProps) => {
  const { socket } = useChatSession();
  const [checked, setChecked] = useState<boolean>(!!widget.initial);

  useEffect(() => {
    setChecked(!!widget.initial);
  }, [widget.initial]);

  const handleCheckedChange = (newChecked: boolean) => {
    setChecked(newChecked);
    if (socket) {
      console.log(`Emitting input_widget_change for ${widget.id}: ${newChecked}`);
      socket.emit('input_widget_change', { id: widget.id, value: newChecked });
    }
  };

  return (
    <div className="widget-switch flex items-center space-x-2 p-1">
      <Switch
        id={widget.id}
        name={widget.id}
        checked={checked}
        onCheckedChange={handleCheckedChange}
        aria-label={widget.label}
      />
    </div>
  );
};

export default WidgetSwitch;
