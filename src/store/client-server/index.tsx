import { IAppTheme, IFC, ILanguage, ITranslations } from "@ts/global.types";
import { createContext, useContext } from "react";

interface ClientServerState {
  content: ITranslations | null;
  language: ILanguage;
  theme: IAppTheme;
}

const initialState: ClientServerState = {
  content: null,
  language: "en",
  theme: "Mantine-Old",
};

export const ClientServerContext =
  createContext<ClientServerState>(initialState);

export const useClientServerState = () => useContext(ClientServerContext);

interface Props extends IFC, ClientServerState {}

const ClientServerProvider: React.FC<Props> = ({
  children,
  content,
  language,
  theme,
}) => {
  return (
    <ClientServerContext.Provider value={{ content, language, theme }}>
      {children}
    </ClientServerContext.Provider>
  );
};

export default ClientServerProvider;
