import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import ClientServerProvider from "@store/client-server";
import { getCookieProperty } from "@utils/functions/getCookieProperty";
import { parseAcceptLanguage } from "@utils/functions/parseAcceptLanguage";

import { createReadableStreamFromReadable } from "@remix-run/node";
import { handleRequest as handleVercelRequest } from "@vercel/remix";
import { IAppTheme, ILanguage, ITranslations } from "@ts/global.types";

const ABORT_DELAY = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  // All i18n stuff - server side
  const cookies = request.headers.get("Cookie");
  const userLang = getCookieProperty(cookies || "", "khofly-language", "");
  const prefLang = parseAcceptLanguage(request.headers.get("accept-language"));

  // Check if user accept-language exists as option
  const existingPrefLang = ["en"].includes(prefLang) ? prefLang : "en";

  // Priority: 1. user selected lang, 2. browser default, 3. default to "en"
  const appLang = userLang || existingPrefLang || "en";

  // Get app theme
  const appTheme = getCookieProperty(
    cookies || "",
    "khofly-app-theme",
    "Mantine-Old"
  );

  // Dynamically import content JSON
  const contentImport = (await import(`../public/locales/${appLang}.json`))
    .default;

  // -------------------------------------------------
  // Handle Vercel request
  // -------------------------------------------------
  if (process.env.HOST_TARGET === "vercel") {
    const remixServer = (
      <ClientServerProvider
        content={contentImport}
        language={appLang}
        theme={appTheme}
      >
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </ClientServerProvider>
    );

    return handleVercelRequest(
      request,
      responseStatusCode,
      responseHeaders,
      remixServer
    );
  }

  // -------------------------------------------------
  // Handle Node request
  // -------------------------------------------------
  return isBotRequest(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
        contentImport,
        appLang,
        appTheme
      );
}

// We have some Remix apps in the wild already running with isbot@3 so we need
// to maintain backwards compatibility even though we want new apps to use
// isbot@4.  That way, we can ship this as a minor Semver update to @remix-run/dev.
function isBotRequest(userAgent: string | null) {
  if (!userAgent) {
    return false;
  }

  // isbot >= 3.8.0, >4
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }

  // isbot < 3.8.0
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }

  return false;
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  content: ITranslations,
  language: ILanguage,
  theme: IAppTheme
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <ClientServerProvider content={content} language={language} theme={theme}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </ClientServerProvider>,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
