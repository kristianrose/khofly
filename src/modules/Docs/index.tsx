import "@mantine/code-highlight/styles.css";

import DocsSearchOverview from "./components/search-overview";
import DocsIndex from "./components";
import DocsWIP from "./components/wip";
import DocsSearchSearxng from "./components/search-searxng";
import DocsSearchInstantAnswer from "./components/search-instant-answer";
import DocsSearchSetDefault from "./components/search-set-default";
import { useParams } from "@remix-run/react";

const Docs = () => {
  const params = useParams();

  const page = params.page;

  // Basic first redirect
  if (!page) return <DocsIndex />;

  const wikiPage = {
    overview: <DocsSearchOverview />,
    searxng: <DocsSearchSearxng />,
    "instant-answers": <DocsSearchInstantAnswer />,
    "set-default": <DocsSearchSetDefault />,
    "self-host": <DocsWIP />,
  }[page];

  return <>{wikiPage || <DocsIndex />}</>;
};

export default Docs;
