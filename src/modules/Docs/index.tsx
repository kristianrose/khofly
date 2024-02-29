import "@mantine/code-highlight/styles.css";

import DocsIndex from "./components";
import DocsWIP from "./components/wip";

import DocsResourcesOverview from "./components/resources-overview";
import DocsResourcesInstantAnswer from "./components/resources-instant-answer";
import DocsResourcesSetDefault from "./components/resources-set-default";

import DocsSelfHostSearxng from "./components/self-host-searxng";
import DocsSelfHostKhofly from "./components/self-host-khofly";

import { useParams } from "@remix-run/react";

const Docs = () => {
  const params = useParams();

  const page = params.page;

  console.log(page);

  // Basic first redirect
  if (!page) return <DocsIndex />;

  const docsPage = {
    overview: <DocsResourcesOverview />,
    "instant-answers": <DocsResourcesInstantAnswer />,
    "set-default": <DocsResourcesSetDefault />,

    "self-host-searxng": <DocsSelfHostSearxng />,
    "self-host-khofly": <DocsSelfHostKhofly />,
  }[page];

  return <>{docsPage || <DocsIndex />}</>;
};

export default Docs;
