import { IFC, ITranslations } from "@ts/global.types";
import { createContext, useContext } from "react";

interface I18nState {
  content: ITranslations | null;
}

const initialState: I18nState = {
  content: null,
};

export const LanguageContext = createContext<I18nState>(initialState);

export const useI18nContent = () => useContext(LanguageContext);

interface Props extends IFC {
  content: ITranslations;
}

const I18nProvider: React.FC<Props> = ({ children, content }) => {
  return (
    <LanguageContext.Provider value={{ content }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default I18nProvider;
