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
  const isPrivacy = pathname.startsWith("/privacy");
  const isSearch = pathname.startsWith("/search");
  const isDocs = pathname.startsWith("/docs");

  const pageTitle = isChangelog
    ? "Changelog"
    : isSettings
    ? "Settings"
    : isPrivacy
    ? "Privacy"
    : isDocs
    ? "Docs"
    : "";

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

      {/* Header: /docs, /settings, /rewards, /changelog */}
      {(isDocs || isSettings || isChangelog || isPrivacy) && (
        <HeaderLogo
          hasBurger={isDocs}
          openNavbar={openNavbar}
          toggleNavbar={toggleNavbar}
        />
      )}

      {/* Page titles */}
      {(isDocs || isSettings || isChangelog || isDocs || isPrivacy) && (
        <Text className={classes.route_label} ml="sm" size="xl" fw={700}>
          / {pageTitle}
        </Text>
      )}

      <div className={classes.divider}></div>

      {isSearch && <HeaderSettings />}
    </Group>
  );
};

export default Header;
