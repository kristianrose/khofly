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
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import { getCookieProperty } from "@utils/functions/getCookieProperty";

import { ILanguage } from "@ts/global.types";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import ErrorPage from "@module/Error";
import { ROOT_META } from "./meta/root";
import { DEFAULT_ENV } from "@utils/resources/defaultEnv";
import { parseAcceptLanguage } from "@utils/functions/parseAcceptLanguage";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookies = request.headers.get("Cookie");
  const userLang = getCookieProperty(cookies || "", "language", "en");
  const prefLang = parseAcceptLanguage(request.headers.get("accept-language"));

  // Priority: 1. user selected lang, 2. browser default, 3. default to "en"
  const appLang = userLang || prefLang || "en";

  return json({
    language: appLang,
    ENV: {
      NODE_ENV: process.env.NODE_ENV,
      HOST: process.env.HOST,
      SEARXNG_URL: process.env.SEARXNG_URL,
      NOMINATIM_URL: process.env.NOMINATIM_URL,
      IS_SELF_HOST: process.env.IS_SELF_HOST,
      APP_NAME: process.env.APP_NAME,
    },
  });
}

// Meta tags
export const meta: MetaFunction = () => {
  return ROOT_META;
};

export function Layout({ children }: { children: React.ReactNode }) {
  // Load env variables in browser
  const data = useRouteLoaderData<typeof loader>("root");

  return (
    <html lang={data?.language || "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript defaultColorScheme="dark" />

        {/* OpenSearch XML */}
        <link
          rel="search"
          href={"/opensearch.xml"}
          type="application/opensearchdescription+xml"
          title="Search khofly.com"
        />

        {/* Leaflet styles */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />

        <link rel="manifest" href="manifest.json" />
      </head>
      <body>
        <AppLayout>
          {/* children will be the root Component, ErrorBoundary, or HydrateFallback */}
          {children}
        </AppLayout>

        {/* Hack to set environment variables in browser */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.process = ${JSON.stringify({
              env: data?.ENV || DEFAULT_ENV,
            })}`,
          }}
        />

        {/* Leaflet script */}
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Default app
export default function App() {
  return <Outlet />;
}

// Default error
export function ErrorBoundary() {
  const error: any = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorPage
        code={error.status}
        title="You have found a secret place"
        message={error.data}
      />
    );
  } else if (error instanceof Error) {
    return (
      <ErrorPage
        code={500}
        title="You have found a secret place"
        message={error.message}
        stack={error.stack}
      />
    );
  } else {
    return (
      <ErrorPage
        code={500}
        title="You have found a secret place"
        message="Unknown Error"
      />
    );
  }
}
