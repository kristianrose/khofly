import "@mantine/code-highlight/styles.css";

import WikiSearchOverview from "./components/search-overview";
import WikiIndex from "./components";
import WikiWIP from "./components/wip";
import WikiSearchSearxng from "./components/search-searxng";
import WikiSearchInstantAnswer from "./components/search-instant-answer";
import WikiSearchSetDefault from "./components/search-set-default";
import { useParams } from "@remix-run/react";

const Wiki = () => {
  const params = useParams();

  const page = params.page;

  // Basic first redirect
  if (!page) return <WikiIndex />;

  const wikiPage = {
    overview: <WikiSearchOverview />,
    searxng: <WikiSearchSearxng />,
    "instant-answers": <WikiSearchInstantAnswer />,
    "set-default": <WikiSearchSetDefault />,
    "self-host": <WikiWIP />,
  }[page];

  return <>{wikiPage || <WikiIndex />}</>;
};

export default Wiki;
