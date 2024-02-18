import { LoaderFunctionArgs, json } from "@remix-run/node"; // or cloudflare/deno

const MAPSCO_URL = "https://geocode.maps.co";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q") || "";

  const results = await fetch(
    `${MAPSCO_URL}/search?q=${q}&api_key=${process.env.GEOCODE_API_KEY}`
  );
  console.log(results.status);

  // If API doesn't return correct response
  if (results.status !== 200) return json([], { status: 400 });

  const res = await results.json();

  return json(res);
};
