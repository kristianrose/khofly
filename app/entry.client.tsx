import { RemixBrowser } from "@remix-run/react";
import ClientServerProvider from "@store/client-server";
import { ILanguage } from "@ts/global.types";
import { getCookieProperty } from "@utils/functions/getCookieProperty";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

async function hydrate() {
  // All i18n stuff - client side
  const cookies = document.cookie;

  const htmlLang = document
    .querySelector("html")
    ?.getAttribute("lang") as ILanguage;

  // Get app theme
  const appTheme = getCookieProperty(
    cookies || "",
    "khofly-app-theme",
    "Mantine-Old"
  );

  // Dynamically fetch content JSON
  const contentFetch = await fetch(`/locales/${htmlLang}.json`);
  const content = await contentFetch.json();

  startTransition(() => {
    hydrateRoot(
      document,
      <ClientServerProvider
        content={content}
        language={htmlLang}
        theme={appTheme}
      >
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      </ClientServerProvider>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
