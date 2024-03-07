import { Divider, Flex, Paper, Space, Stack, Text } from "@mantine/core";
import { INewsEngines, useSearchStore } from "@store/search";
import { IconNews } from "@tabler/icons-react";
import React from "react";
import EngineComponent from "../EngineComponent";
import { useTranslate } from "@hooks/translate/use-translate";

const SettingsEnginesNews = () => {
  const t = useTranslate();

  const { enginesNews, setEnginesNews } = useSearchStore((state) => ({
    enginesNews: state.enginesNews,
    setEnginesNews: state.setEnginesNews,
  }));

  const handleChangeEngines = (e: INewsEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesNews, e];
    } else {
      newEngines = enginesNews.filter((eng) => eng !== e);
    }

    setEnginesNews(newEngines);
  };

  return (
    <Paper radius="md" withBorder>
      <Flex align="center" p="lg" mb={16}>
        <IconNews size={32} />

        <Text fz={26} fw={600} ml="sm">
          {t("pages.settings.engines.titleNews")}
        </Text>
      </Flex>

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" gap={6}>
        <Divider
          label={
            <Text fw={500} c="teal">
              {t("pages.settings.engines.titleNews3")}
            </Text>
          }
          labelPosition="left"
          mb="sm"
          w="100%"
        />

        <EngineComponent
          checked={!!enginesNews.find((e) => e === "duckduckgo")}
          iconAlt="DuckDuckGo logo"
          iconSrc="/assets/ddg-icon.svg"
          label="pages.settings.engines.engineDDGNews"
          onChange={(next) => handleChangeEngines("duckduckgo", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesNews.find((e) => e === "presearch")}
          iconAlt="Presearch logo"
          iconSrc="/assets/presearch-icon.svg"
          label="pages.settings.engines.enginePresearchNews"
          onChange={(next) => handleChangeEngines("presearch", next)}
        />

        <Divider
          label={
            <Text fw={500} c="teal">
              {t("pages.settings.engines.titleNews2")}
            </Text>
          }
          labelPosition="left"
          my="sm"
          w="100%"
        />

        <EngineComponent
          checked={!!enginesNews.find((e) => e === "wikinews")}
          iconAlt="Wikipedia logo"
          iconSrc="/assets/wikinews-icon.svg"
          label="pages.settings.engines.engineWikinews"
          onChange={(next) => handleChangeEngines("wikinews", next)}
        />

        <Divider
          label={
            <Text fw={500} c="teal">
              {t("pages.settings.engines.titleWithout")}
            </Text>
          }
          labelPosition="left"
          my="sm"
          w="100%"
        />

        <EngineComponent
          checked={!!enginesNews.find((e) => e === "bing")}
          iconAlt="Bing logo"
          iconSrc="/assets/bing-icon.svg"
          label="pages.settings.engines.engineBingNews"
          onChange={(next) => handleChangeEngines("bing", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesNews.find((e) => e === "brave")}
          iconAlt="Brave logo"
          iconSrc="/assets/brave-icon.svg"
          label="pages.settings.engines.engineBraveNews"
          onChange={(next) => handleChangeEngines("brave", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesNews.find((e) => e === "google")}
          iconAlt="Google logo"
          iconSrc="/assets/google-icon.svg"
          label="pages.settings.engines.engineGoogleNews"
          onChange={(next) => handleChangeEngines("google", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesNews.find((e) => e === "qwant")}
          iconAlt="Qwant logo"
          iconSrc="/assets/qwant-icon.svg"
          label="pages.settings.engines.engineQwantNews"
          onChange={(next) => handleChangeEngines("qwant", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesNews.find((e) => e === "yahoo")}
          iconAlt="Yahoo logo"
          iconSrc="/assets/yahoo-icon.svg"
          label="pages.settings.engines.engineYahooNews"
          onChange={(next) => handleChangeEngines("yahoo", next)}
        />

        <Divider my="xs" w="100%" />
      </Stack>

      <Space h="xl" />
    </Paper>
  );
};

export default SettingsEnginesNews;
