import "@styles/base.css";

import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";

import AppLayout from "@layout/index";
import { ColorSchemeScript } from "@mantine/core";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { getCookieProperty } from "@utils/functions/getCookieProperty";
import { createContext } from "react";
import { ITranslations } from "@store/global";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import contentEN from "../public/locales/en.json";
import I18nProvider from "@store/language";
import { ILanguage } from "@ts/global.types";

export async function loader({ request }: { request: Request }) {
  const cookies = request.headers.get("Cookie");
  const userLang: ILanguage = getCookieProperty(
    cookies || "",
    "language",
    "en"
  );

  return json({
    language: userLang,
    ENV: {
      NODE_ENV: process.env.NODE_ENV,
      HOST: process.env.HOST,
      SEARXNG_URL: process.env.SEARXNG_URL,
      IS_SELF_HOST: process.env.IS_SELF_HOST,
      APP_NAME: process.env.APP_NAME,
    },
  });
}

export default function App() {
  // Load env variables in browser
  const data = useLoaderData<typeof loader>();

  return (
    <html lang={data.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript defaultColorScheme="dark" />

        {/* OpenSearch XML */}
        <link
          rel="search"
          href={"/opensearch_stag.xml"}
          type="application/opensearchdescription+xml"
          title="Search khofly.com"
        />

        {/* Leaflet stuff */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>
        <AppLayout>
          <I18nProvider lang={data.language} content={contentEN}>
            <Outlet />
          </I18nProvider>
          <ScrollRestoration />

          {/* Set environment variables in browser */}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.process = ${JSON.stringify({ env: data.ENV })}`,
            }}
          />

          {/* Leaflet script */}
          <script
            src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossOrigin=""
          />

          <Scripts />
        </AppLayout>
      </body>
    </html>
  );
}
