import { IVideosEngines } from "@store/search";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_VIDEOS: {
  type: "divider" | "engine";
  value: IVideosEngines | "";
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
    label: "pages.settings.engines.titleVid2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bing",
    alt: "Bing logo",
    icon: "/assets/bing-icon.svg",
    label: "pages.settings.engines.engineBingVid",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "brave",
    alt: "Brave logo",
    icon: "/assets/brave-icon.svg",
    label: "pages.settings.engines.engineBraveVid",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "duckduckgo",
    alt: "DuckDuckGo logo",
    icon: "/assets/ddg-icon.svg",
    label: "pages.settings.engines.engineDDGVid",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "google",
    alt: "Google logo",
    icon: "/assets/google-icon.svg",
    label: "pages.settings.engines.engineGoogleVid",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "qwant",
    alt: "Qwant logo",
    icon: "/assets/qwant-icon.svg",
    label: "pages.settings.engines.engineQwantVid",
    safeSearch: true,
    timeRange: false,
  },
];
