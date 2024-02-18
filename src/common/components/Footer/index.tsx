import { Text, Container, Group } from "@mantine/core";

import classes from "./styles.module.scss";

import packageJson from "package.json";
import RemixLink from "@components/RemixLink";

const Footer = () => {
  return (
    <Container size="xl" py="sm" className={classes.after_footer}>
      <Text c="dimmed" size="sm">
        Version {packageJson.version} beta, powered by SearXNG
      </Text>

      <Group gap="sm" justify="flex-end">
        <RemixLink to="/wiki">
          <Text>Wiki</Text>
        </RemixLink>

        <RemixLink to="/changelog">
          <Text>Changelog</Text>
        </RemixLink>

        <RemixLink to="/settings">
          <Text>Settings</Text>
        </RemixLink>
      </Group>
    </Container>
  );
};

export default Footer;
