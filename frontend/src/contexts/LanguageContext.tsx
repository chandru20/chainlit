import React, { createContext, useContext, useState } from 'react';

export const SUPPORTED_LANGUAGES = [
  { code: 'en-US', label: 'English', native: 'English' },
  { code: 'fr-FR', label: 'French', native: 'Français' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' }
];

const STORAGE_KEY = 'mitrai_lang';

function normalizeLanguage(lang: string): string {
  const exact = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
  if (exact) return exact.code;
  const prefix = lang.split('-')[0];
  const partial = SUPPORTED_LANGUAGES.find(
    (l) => l.code === prefix || l.code.startsWith(prefix + '-')
  );
  return partial?.code || 'en-US';
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en-US',
  setLanguage: () => {}
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return normalizeLanguage(stored);
    return normalizeLanguage(navigator.language || 'en-US');
  });

  const setLanguage = (lang: string) => {
    const normalized = normalizeLanguage(lang);
    localStorage.setItem(STORAGE_KEY, normalized);
    setLanguageState(normalized);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
