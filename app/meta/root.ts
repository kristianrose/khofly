export const ROOT_META = [
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
