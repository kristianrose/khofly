import { LinksGroupProps } from "@components/Navbar/Wiki/components/LinksGroup";
import {
  IconBrandSupabase,
  IconEPassport,
  IconFile,
  IconFileText,
  IconLock,
  IconPasswordUser,
  IconSearch,
  IconUser,
  IconVideo,
} from "@tabler/icons-react";

export const NAVBAR_DATA: LinksGroupProps[] = [
  // {
  //   label: "Supabase",
  //   icon: IconBrandSupabase,
  //   links: [{ label: "Overview", link: "/wiki/docs/overview", isWip: true }],
  // },

  {
    label: "Search",
    icon: IconSearch,
    links: [
      { label: "Overview", link: "/wiki/overview", isWip: true },
      { label: "SearXNG", link: "/wiki/searxng", isWip: false },
      {
        label: "Instant Answer",
        link: "/wiki/instant-answers",
        isWip: false,
      },
      { label: "Set Default", link: "/wiki/set-default", isWip: false },
      { label: "Self-Hosted", link: "/wiki/self-host", isWip: true },
    ],
  },
];
