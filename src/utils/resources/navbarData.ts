import { LinksGroupProps } from "@components/Navbar/Wiki/components/LinksGroup";
import { IconSearch } from "@tabler/icons-react";

export const NAVBAR_DATA: LinksGroupProps[] = [
  {
    label: "Resources",
    icon: IconSearch,
    links: [
      { label: "Overview", link: "/docs/overview", isWip: true },
      { label: "SearXNG", link: "/docs/searxng", isWip: false },
      {
        label: "Instant Answer",
        link: "/docs/instant-answers",
        isWip: false,
      },
      { label: "Set Default", link: "/docs/set-default", isWip: false },
      { label: "Self-Hosted", link: "/docs/self-host", isWip: true },
    ],
  },
];
