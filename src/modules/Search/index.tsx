import { lazy } from "react";

import TabGeneral from "./components/TabGeneral";
import TabImages from "./components/TabImages";
import TabVideos from "./components/TabVideos";
import TabNews from "./components/TabNews";
import { useSearchParams } from "@remix-run/react";
import ClientOnly from "@components/ClientOnly";
import { useSearchStore } from "@store/search";

const TabMapsWithoutSSR = lazy(() => import("./components/TabMaps"));

const PageSearch = () => {
  const [searchParams] = useSearchParams();

  const { selectedTab } = useSearchStore((state) => ({
    selectedTab: state.selectedTab,
  }));

  // const tab = selectedTab || "general";
  const tab = searchParams.get("tab") || "general";

  // Render tab
  const renderTab = {
    general: <TabGeneral />,
    images: <TabImages />,
    videos: <TabVideos />,
    news: <TabNews />,
    maps: (
      <ClientOnly>
        <TabMapsWithoutSSR />
      </ClientOnly>
    ),

    // WIP
    music: null,
    it: null,
    science: null,
    files: null,
    social_media: null,
  }[tab];

  return renderTab;
};

export default PageSearch;
