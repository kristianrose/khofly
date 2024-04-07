import { IScienceEngines } from "@store/engines";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_SCIENCE: {
  type: "divider" | "engine";
  value: IScienceEngines | "";
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
    label: "pages.settings.engines.titleScience2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "arxiv",
    alt: "Arxiv logo",
    icon: "/assets/arxiv-icon.svg",
    label: "pages.settings.engines.engineArxivScience",
    safeSearch: false,
    timeRange: true,
  },
  {
    type: "engine",
    value: "crossref",
    alt: "Crossref logo",
    icon: "/assets/crossref-icon.svg",
    label: "pages.settings.engines.engineCrossrefScience",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "googlescholar",
    alt: "Google Scholar logo",
    icon: "/assets/google-scholar-icon.svg",
    label: "pages.settings.engines.engineGoogleScholarScience",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "archive",
    alt: "Archive logo",
    icon: "",
    label: "pages.settings.engines.engineIASScience",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "pubmed",
    alt: "PubMed logo",
    icon: "/assets/pubmed-icon.svg",
    label: "pages.settings.engines.enginePubMedScience",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "semanticscholar",
    alt: "Semantic Scholar logo",
    icon: "",
    label: "pages.settings.engines.engineSemanticScholarScience",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.titleScience3",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wikispecies",
    alt: "Wikispecies logo",
    icon: "/assets/wikispecies-icon.svg",
    label: "pages.settings.engines.engineWikispecies",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.titleWithout",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "openairedatasets",
    alt: "OpenAIRE logo",
    icon: "",
    label: "pages.settings.engines.engineOADatasetsScience",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "openairepublications",
    alt: "OpenAIRE logo",
    icon: "",
    label: "pages.settings.engines.engineOAPublicationsScience",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "pdbe",
    alt: "PDBe logo",
    icon: "/assets/pdbe-icon.svg",
    label: "pages.settings.engines.enginePDBeScience",
    safeSearch: false,
    timeRange: false,
  },
];
