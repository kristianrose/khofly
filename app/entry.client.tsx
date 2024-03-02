import { RemixBrowser } from "@remix-run/react";
import I18nProvider from "@store/language";
import { ILanguage } from "@ts/global.types";
import { getCookieProperty } from "@utils/functions/getCookieProperty";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

async function hydrate() {
  // All i18n stuff - client side
  const cookies = document.cookie;
  const userLang: ILanguage = getCookieProperty(
    cookies || "",
    "language",
    "en"
  );
  const contentReq = await fetch(
    `${process.env.HOST}/locales/${userLang}.json`
  );
  const content = await contentReq.text();

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nProvider content={JSON.parse(content)}>
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
