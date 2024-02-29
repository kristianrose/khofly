import { Text, Container, Group, Anchor } from "@mantine/core";

import classes from "./styles.module.scss";

import packageJson from "package.json";
import RemixLink from "@components/RemixLink";

const Footer = () => {
  return (
    <Container size="xl" py="sm" className={classes.after_footer}>
      <Text c="dimmed" size="sm">
        Version {packageJson.version} beta, powered by{" "}
        <Anchor href="https://docs.searxng.org/" target="_blank">
          SearXNG
        </Anchor>
      </Text>

      <Group gap="sm" justify="flex-end">
        <RemixLink to="/about">
          <Text size="sm">About</Text>
        </RemixLink>

        <RemixLink to="/docs">
          <Text size="sm">Docs</Text>
        </RemixLink>

        <RemixLink to="/privacy">
          <Text size="sm">Privacy</Text>
        </RemixLink>

        <RemixLink to="/changelog">
          <Text size="sm">Changelog</Text>
        </RemixLink>

        <RemixLink to="/settings">
          <Text size="sm">Settings</Text>
        </RemixLink>
      </Group>
    </Container>
  );
};

export default Footer;
