import { CodeHighlight, CodeHighlightTabs } from "@mantine/code-highlight";
import {
  Blockquote,
  Code,
  Container,
  Image,
  List,
  Paper,
  Text,
} from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import WikiLink from "./common/WikiLink";
import WikiText from "./common/WikiText";
import WikiSubtitle from "./common/WikiSubtitle";
import RemixLink from "@components/RemixLink";

const CODE_SEARXNG_CONFIG = `
search:
  formats:
    - html
    - json # add this

server:
  secret_key: "sercet" # make sure to change this
`;

const DocsCustomSearxng = () => {
  return (
    <Container size="lg" p="xl" pb={100}>
      <Blockquote
        color="blue"
        // cite="- https://docs.searxng.org/"
        mt="xl"
        radius="sm"
      >
        This page will show you settings that you need if you want to use your
        own SearXNG instance with Khofly. If you don't have your own SearXNG
        instance hosted check out{" "}
        <RemixLink to="/docs/self-host-searxng">
          <Text component="span" c="blue.4">
            the hosting guide
          </Text>
        </RemixLink>
        .
      </Blockquote>

      <WikiSubtitle>
        1. Change settings yaml to include the following changes
      </WikiSubtitle>

      <WikiText>
        Add output format <Code>json</Code>, this will allow you to use the
        search as API and return a JSON response, and make sure to set a long
        randomly generated string for server secret ( ex. run{" "}
        <Code>openssl rand -hex 32</Code> )
      </WikiText>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <CodeHighlightTabs
          code={[
            {
              code: CODE_SEARXNG_CONFIG,
              language: "yaml",
              fileName: "/etc/searxng/settings.yml",
            },
          ]}
        />
      </Paper>

      <WikiText>
        After this change restart your SearXNG instance with{" "}
        <Code>sudo service uwsgi restart searxng</Code>
      </WikiText>

      <WikiSubtitle>1. Add your instance to Khofly</WikiSubtitle>

      <WikiText>
        Go to Settings/Instances/SearXNG Domain and set your instances domain in
        the following format <Code>https://domain.com</Code>
      </WikiText>
    </Container>
  );
};

export default DocsCustomSearxng;
