import classes from "./styles.module.scss";
import { Anchor, Button, Group, Text } from "@mantine/core";

import React from "react";
import SearchSection from "@module/Search/components/SearchSection";
import clsx from "clsx";
import HeaderLogo from "./components/HeaderLogo";
import HeaderSettings from "./components/HeaderSettings";
import { useLocation } from "@remix-run/react";
import { useTranslate } from "@hooks/translate/use-translate";

interface Props {
  openNavbar: boolean;
  toggleNavbar: () => void;
}

const Header: React.FC<Props> = ({ openNavbar, toggleNavbar }) => {
  const t = useTranslate();
  const { pathname } = useLocation();

  // const { profile } = useGlobalStore((state) => ({ profile: state.profile }));

  const isChangelog = pathname.startsWith("/changelog");
  const isSettings = pathname.startsWith("/settings");
  const isRewards = pathname.startsWith("/rewards");
  const isSearch = pathname.startsWith("/search");
  const isWiki = pathname.startsWith("/wiki");

  return (
    <Group
      className={clsx(classes.header, {
        [classes.header_search]: pathname.startsWith("/search"),
      })}
      h="100%"
      px="md"
      pt="md"
      pb={pathname.startsWith("/search") ? 0 : "md"}
      gap={0}
    >
      {/* Header: /search?q= */}
      {isSearch && <SearchSection />}

      {/* Header: /wiki, /settings, /rewards, /changelog */}
      {(isWiki || isSettings || isChangelog || isRewards) && (
        <HeaderLogo
          hasBurger={isWiki}
          openNavbar={openNavbar}
          toggleNavbar={toggleNavbar}
        />
      )}

      {/* Page titles */}
      {isWiki && (
        <Text className={classes.route_label} ml="sm" size="xl" fw={700}>
          / Wiki
        </Text>
      )}
      {isSettings && (
        <Text className={classes.route_label} ml="sm" size="xl" fw={700}>
          / Settings
        </Text>
      )}
      {isChangelog && (
        <Text className={classes.route_label} ml="sm" size="xl" fw={700}>
          / Changelog
        </Text>
      )}

      <div className={classes.divider}></div>

      {isSearch && <HeaderSettings />}
    </Group>
  );
};

export default Header;
