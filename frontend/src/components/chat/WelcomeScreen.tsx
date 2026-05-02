import { cn, hasMessage } from '@/lib/utils';
import {
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  ChainlitContext,
  FileSpec,
  useAuth,
  useChatMessages,
  useChatSession,
  useConfig
} from '@chainlit/react-client';

import { Logo } from '@/components/Logo';
import { Markdown } from '@/components/Markdown';
import { useTranslation } from 'components/i18n/Translator';

import MessageComposer from './MessageComposer';
import Starters from './Starters';

interface Props {
  fileSpec: FileSpec;
  onFileUpload: (payload: File[]) => void;
  onFileUploadError: (error: string) => void;
  autoScrollRef: MutableRefObject<boolean>;
}

export default function WelcomeScreen(props: Props) {
  const apiClient = useContext(ChainlitContext);
  const { config } = useConfig();
  const { chatProfile } = useChatSession();
  const { messages } = useChatMessages();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const chatProfiles = config?.chatProfiles;

  const allowHtml = config?.features?.unsafe_allow_html;
  const latex = config?.features?.latex;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const displayName = user?.display_name || user?.identifier || null;

  const logo = useMemo(() => {
    if (chatProfile && chatProfiles) {
      const currentChatProfile = chatProfiles.find(
        (cp) => cp.name === chatProfile
      );
      if (currentChatProfile?.icon) {
        return (
          <div className="flex flex-col gap-2 mb-2 items-center">
            <img
              className="h-16 w-16 rounded-full"
              src={
                currentChatProfile?.icon.startsWith('/public')
                  ? apiClient.buildEndpoint(currentChatProfile?.icon)
                  : currentChatProfile?.icon
              }
            />
            {currentChatProfile?.markdown_description ? (
              <Markdown
                allowHtml={allowHtml}
                latex={latex}
                renderMarkdown={true}
              >
                {currentChatProfile.markdown_description}
              </Markdown>
            ) : null}
          </div>
        );
      }
    }

    return <Logo className="w-[200px] mb-2" />;
  }, [chatProfiles, chatProfile]);

  if (hasMessage(messages)) return null;

  return (
    <div
      id="welcome-screen"
      className={cn(
        'flex flex-col -mt-[60px] gap-4 w-full flex-grow items-center justify-center welcome-screen mx-auto transition-opacity duration-500 opacity-0 delay-100',
        isVisible && 'opacity-100'
      )}
    >
      {logo}
      {displayName ? (
        <div className="text-center space-y-1">
          <p className="text-2xl font-semibold text-foreground">
            {t('chat.welcome.greeting', { name: displayName })}
          </p>
          <p className="text-muted-foreground text-base">
            {t('chat.welcome.subtitle')}
          </p>
        </div>
      ) : (
        <p className="text-muted-foreground text-base text-center">
          {t('chat.welcome.subtitle')}
        </p>
      )}
      <MessageComposer {...props} />
      <Starters />
    </div>
  );
}
