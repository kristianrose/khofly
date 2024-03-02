import { LinksGroupProps } from "@components/Navbar/Wiki/components/LinksGroup";
import { IconPick, IconServer } from "@tabler/icons-react";

export const NAVBAR_DATA: LinksGroupProps[] = [
  {
    label: "Resources",
    icon: IconPick,
    links: [
      { label: "Overview", link: "/docs/overview", isWip: true },
      {
        label: "Instant Answers",
        link: "/docs/instant-answers",
        isWip: false,
      },
      { label: "Set Default", link: "/docs/set-default", isWip: false },
      { label: "Custom SearXNG", link: "/docs/custom-searxng", isWip: false },
    ],
  },
  {
    label: "Self-Host",
    icon: IconServer,
    links: [
      { label: "Khofly", link: "/docs/self-host-khofly", isWip: false },
      { label: "SearXNG", link: "/docs/self-host-searxng", isWip: false },
    ],
  },
];
