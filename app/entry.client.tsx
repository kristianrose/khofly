import { RemixBrowser } from "@remix-run/react";
import I18nProvider from "@store/language";
import { ILanguage } from "@ts/global.types";
import { getCookieProperty } from "@utils/functions/getCookieProperty";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

async function hydrate() {
  // All i18n stuff - client side
  const htmlLang = document.querySelector("html")?.getAttribute("lang");

  // Dynamically fetch content JSON
  const contentFetch = await fetch(
    `${process.env.HOST}/locales/${htmlLang}.json`
  );
  const content = await contentFetch.json();


  startTransition(() => {
    hydrateRoot(
      document,
      <I18nProvider content={content}>
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      </I18nProvider>
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
