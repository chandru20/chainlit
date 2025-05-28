import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useChatSession } from '@chainlit/react-client';
import { inputWidgetsState } from 'state/inputWidgets';
import { IInputWidget } from 'types/Input';
import WidgetSlider from './WidgetSlider';
import WidgetSelect from './WidgetSelect';
import WidgetSwitch from './WidgetSwitch';
import WidgetTextInput from './WidgetTextInput';
import WidgetNumberInput from './WidgetNumberInput';
// Import other widget components as they are created

const InputWidgetsBar = () => {
  const [widgets, setWidgets] = useRecoilState(inputWidgetsState);
  const { socket } = useChatSession();

  useEffect(() => {
    if (!socket) return;

    const handleSetInputWidgets = (receivedWidgets: IInputWidget[]) => {
      console.log('Received set_input_widgets event with:', receivedWidgets);
      setWidgets(receivedWidgets);
    };

    socket.on('set_input_widgets', handleSetInputWidgets);

    return () => {
      socket.off('set_input_widgets', handleSetInputWidgets);
    };
  }, [socket, setWidgets]);

  if (!widgets.length) {
    return null;
  }

  return (
    <div
      id="input-widgets-bar"
      className="input-widgets-bar p-2 bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 shadow-md flex items-center space-x-2 overflow-x-auto print:hidden"
      style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 16px', flexWrap: 'nowrap' }}
    >
      {widgets.map((widget) => (
        <div key={widget.id} className="input-widget-item flex items-center flex-shrink-0 space-x-1">
          <label htmlFor={widget.id} title={widget.tooltip || widget.label} className="text-xs mr-1 whitespace-nowrap cursor-default">
            {widget.label}
          </label>
          {widget.type === 'slider' && <WidgetSlider {...widget} />}
          {widget.type === 'select' && <WidgetSelect {...widget} items={widget.items || []} />}
          {widget.type === 'switch' && <WidgetSwitch {...widget} />}
          {widget.type === 'textinput' && <WidgetTextInput {...widget} />}
          {widget.type === 'numberinput' && <WidgetNumberInput {...widget} />}
          
          {/* Fallback for unsupported types */}
          {!['slider', 'select', 'switch', 'textinput', 'numberinput'].includes(widget.type) && (
            <span className="text-xs font-mono bg-gray-200 dark:bg-gray-700 p-1 rounded">
              (Unsupported type: {widget.type})
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default InputWidgetsBar;
