import { LoaderFunctionArgs, json as nodeJson } from "@remix-run/node";
import { json as vercelJson } from "@vercel/remix";

// Change functions based on deployment target
const json = process.env.HOST_TARGET === "vercel" ? vercelJson : nodeJson;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q");
  const autocompleteEngine = searchParams.get("engine") as
    | "duckduckgo"
    | "google"
    | "brave";

  const autocompleteUrl = {
    google: `https://www.google.com/complete/search?q=${q}&client=firefox`,
    duckduckgo: `https://duckduckgo.com/ac/?q=${q}&type=list`,
    brave: `https://search.brave.com/api/suggest?q=${q}`,
    qwant: `https://api.qwant.com/v3/suggest?q=${q}&version=2`,
  }[autocompleteEngine || "duckduckgo"];

  const res = await fetch(autocompleteUrl);

  const data = await res.json();

  return json({ data });
};
