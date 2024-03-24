import { IImagesEngines } from "@store/search";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_IMAGES: {
  type: "divider" | "engine";
  value: IImagesEngines | "";
  alt: string;
  icon: string;
  label: DotNestedKeys<ITranslations>;
  safeSearch: boolean;
  timeRange: boolean;
}[] = [
  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.titleImg1",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bing",
    alt: "Bing logo",
    icon: "/assets/bing-icon.svg",
    label: "pages.settings.engines.engineBingImg",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "brave",
    alt: "Brave logo",
    icon: "/assets/brave-icon.svg",
    label: "pages.settings.engines.engineBraveImg",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "duckduckgo",
    alt: "DuckDuckGo logo",
    icon: "/assets/ddg-icon.svg",
    label: "pages.settings.engines.engineDDGImg",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "google",
    alt: "Google logo",
    icon: "/assets/google-icon.svg",
    label: "pages.settings.engines.engineGoogleImg",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "qwant",
    alt: "Qwant logo",
    icon: "/assets/qwant-icon.svg",
    label: "pages.settings.engines.engineQwantImg",
    safeSearch: true,
    timeRange: false,
  },
];
