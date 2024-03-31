import { Anchor, Flex, Image, Text } from "@mantine/core";
import React from "react";
import classes from "./styles.module.scss";
import { ISearXNGResultsNews } from "@ts/searxng.types";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  IconClock } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useResponsive } from "@hooks/use-responsive";
import { useGeneralStore } from "@store/general";

dayjs.extend(relativeTime);

const NewsRow: React.FC<ISearXNGResultsNews["results"][0]> = ({
  title,
  url,
  parsed_url,
  content,
  engines,
  publishedDate,
}) => {
  const { visitedLinks, updateVisitedLinks, openInNewTab, displayFavicon } =
    useGeneralStore((state) => ({
      visitedLinks: state.visitedLinks,
      updateVisitedLinks: state.updateVisitedLinks,
      openInNewTab: state.openInNewTab,
      displayFavicon: state.displayFavicon,
    }));

  const isXs = useResponsive("max", "xs");
  const anchorTarget: React.HTMLAttributeAnchorTarget = isXs
    ? "_blank"
    : openInNewTab
    ? "_blank"
    : "_self";

  return (
    <Anchor
      href={url}
      target={anchorTarget}
      onClick={() => updateVisitedLinks(url)}
      onAuxClick={(e) => {
        if (e.button === 1) {
          // Middle mouse button has been clicked! Do what you will with it...
          updateVisitedLinks(url);
        }
      }}
      rel="noreferrer noopener"
    >
      <Flex className={classes.news_row} direction="column">
        {/* Website url */}
        <Flex align="center" gap="xs">
          {displayFavicon && (
            <Image
              w={16}
              h={16}
              src={`https://icons.duckduckgo.com/ip3/${parsed_url[1]}.ico`}
              alt=""
            />
          )}

          <Text size="xs" truncate="end">
            {parsed_url[0]}://{parsed_url[1]}
            {parsed_url[2]}
          </Text>
        </Flex>

        {/* Website title */}
        <Text
          className={clsx(classes.text_title, {
            [classes.text_title_visited]: visitedLinks.includes(url),
          })}
          mb={4}
          truncate="end"
        >
          {title}
        </Text>

        {/* Date */}
        <Flex align="center" mb={4}>
          <IconClock style={getIconStyle(18)} />

          <Text size="sm" ml={6}>
            {dayjs(publishedDate).fromNow()}
          </Text>
        </Flex>

        {/* Website description */}
        <Text size="sm" c="dimmed">
          {content}
        </Text>

        <Text size="xs" c="dimmed" ta="right">
          {engines.join(", ")}
        </Text>
      </Flex>
    </Anchor>
  );
};

export default NewsRow;
