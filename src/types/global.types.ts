export interface IEnvironment {
  HOST: string;
  SEARXNG_URL: string;
  IS_SELF_HOST: "0" | "1";
  APP_NAME: string;
  NODE_ENV: "development" | "production" | "test";
}

export interface IFC {
  children?: React.ReactNode;
}

export type ILanguage = "en" ;

export type IAppTheme =
  | "Mantine-Old"
  | "Mantine-New"
  | "Catppuccin-Mocha"
  | "Rose-Pine"
  | "Custom";

// For translations

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;
