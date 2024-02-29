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

import { ILanguage } from "@ts/global.types";
import { MetaFunction } from "@remix-run/node";

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
      NOMINATIM_URL: process.env.NOMINATIM_URL,
      IS_SELF_HOST: process.env.IS_SELF_HOST,
      APP_NAME: process.env.APP_NAME,
    },
  });
}

// Meta tags
export const meta: MetaFunction = () => {
  return [
    {
      title: !+process.env.NEXT_PUBLIC_IS_SELF_HOST!
        ? "Khofly"
        : process.env.NEXT_PUBLIC_APP_NAME,
    },
    {
      name: "description",
      content:
        "Khofly - a modern SearXNG front-end, focused on speed and user experience.",
    },
    {
      name: "keywords",
      content:
        "Khofly, Search, Khofly Search, SearXNG, FOSS, open source, meta search engine",
    },
    // Open Graph stuff
    {
      property: "og:title",
      content: "Khofly",
    },
    {
      property: "og:description",
      content:
        "Khofly - a modern SearXNG front-end, focused on speed and user experience.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: "Khofly",
    },
    {
      property: "og:image",
      content: "https://khofly.com/images/og.png",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "600",
    },
    {
      property: "og:image:alt",
      content: "Khofly og image",
    },
    {
      property: "og:image:type",
      content: "image/png",
    },
  ];
};

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
          href={"/opensearch.xml"}
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

        <link rel="manifest" href="manifest.json" />
      </head>
      <body>
        <AppLayout>
          <Outlet />
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
