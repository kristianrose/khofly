import { ITranslations } from "@store/global";
import { IFC, ILanguage } from "@ts/global.types";
import { createContext, useContext, useState, useEffect } from "react";

interface I18nState {
  lang: ILanguage;
  content: ITranslations | null;
}

const initialState: I18nState = {
  lang: "en",
  content: null,
};

export const LanguageContext = createContext<I18nState>(initialState);

export const useI18nContent = () => useContext(LanguageContext);

interface Props extends IFC {
  lang: ILanguage;
  content: ITranslations;
}

const I18nProvider: React.FC<Props> = ({
  children,
  lang,
  content: propContent,
}) => {
  const [content, setContent] = useState<ITranslations | null>(propContent);

  useEffect(() => {
    // Load available translations (e.g., from disk or API)
    const loadTranslations = async () => {
      const translations = await import(`../../../public/locales/${lang}.json`);
      setContent(translations);
    };
    loadTranslations();
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, content }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default I18nProvider;
