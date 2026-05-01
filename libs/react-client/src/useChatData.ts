import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  actionState,
  askUserState,
  bufferedSidebarState,
  callFnState,
  chatSettingsDefaultValueSelector,
  chatSettingsInputsState,
  chatSettingsValueState,
  elementState,
  inputWidgetsState,
  loadingState,
  sessionState,
  sideViewState,
  tasklistState
} from './state';

export interface IToken {
  id: number | string;
  token: string;
  isSequence: boolean;
  isInput: boolean;
}

const useChatData = () => {
  const loading = useRecoilValue(loadingState);
  const elements = useRecoilValue(elementState);
  const tasklists = useRecoilValue(tasklistState);
  const actions = useRecoilValue(actionState);
  const session = useRecoilValue(sessionState);
  const askUser = useRecoilValue(askUserState);
  const callFn = useRecoilValue(callFnState);
  const chatSettingsInputs = useRecoilValue(chatSettingsInputsState);
  const chatSettingsValue = useRecoilValue(chatSettingsValueState);
  const chatSettingsDefaultValue = useRecoilValue(
    chatSettingsDefaultValueSelector
  );
  const inputWidgets = useRecoilValue(inputWidgetsState);
  const bufferedSidebar = useRecoilValue(bufferedSidebarState);
  const sideView = useRecoilValue(sideViewState);
  const setSideView = useSetRecoilState(sideViewState);

  const connected = session?.socket.connected && !session?.error;
  const disabled =
    !connected ||
    loading ||
    askUser?.spec.type === 'file' ||
    askUser?.spec.type === 'action' ||
    askUser?.spec.type === 'element';

  return {
    actions,
    askUser,
    bufferedSidebar,
    callFn,
    chatSettingsDefaultValue,
    chatSettingsInputs,
    chatSettingsValue,
    connected,
    disabled,
    elements,
    error: session?.error,
    inputWidgets,
    loading,
    setSideView,
    sideView,
    tasklists
  };
};

export { useChatData };
