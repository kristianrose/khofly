import { create } from "zustand";
import { persist } from "zustand/middleware";
import contentJson from "public/locales/en.json";
// import { IProfile, ITiers } from "@khofly/core";
import { IAppTheme } from "@ts/global.types";

export type ITranslations = typeof contentJson;

interface GlobalState {
  language: "en" | "de";
  changeLanguage: (locale: "en") => void;

  appTheme: IAppTheme;
  setAppTheme: (theme: IAppTheme) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      language: "en",
      changeLanguage: (locale) =>
        set({
          language: locale,
        }),

      appTheme: "Mantine-Old",
      setAppTheme: (appTheme) => set({ appTheme }),
    }),
    {
      name: "global-store", // name of the item in the storage (must be unique)
      partialize: (state) => ({
        // profile: state.profile,
        language: state.language,
        appTheme: state.appTheme,
      }),
    }
  )
);
