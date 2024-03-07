import { Divider, Flex, Paper, Space, Stack, Text } from "@mantine/core";
import { IGeneralEngines, useSearchStore } from "@store/search";
import { IconWorld } from "@tabler/icons-react";
import React from "react";
import EngineComponent from "../EngineComponent";
import { HOVER_DATA } from "../EngineComponent/hover-data";
import { useTranslate } from "@hooks/translate/use-translate";

const SettingsEnginesGeneral = () => {
  const t = useTranslate();

  const { enginesGeneral, setEnginesGeneral } = useSearchStore((state) => ({
    enginesGeneral: state.enginesGeneral,
    setEnginesGeneral: state.setEnginesGeneral,
  }));

  const handleChangeEngines = (e: IGeneralEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesGeneral, e];
    } else {
      newEngines = enginesGeneral.filter((eng) => eng !== e);
    }

    setEnginesGeneral(newEngines);
  };

  return (
    <Paper radius="md" withBorder>
      <Flex align="center" p="lg" mb={16}>
        <IconWorld size={32} />

        <Text fz={26} fw={600} ml="sm">
          {t("pages.settings.engines.title1")}
        </Text>
      </Flex>

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" gap={6}>
        <Divider
          label={
            <Text fw={500} c="teal">
              {t("pages.settings.engines.titleImg1")}
            </Text>
          }
          labelPosition="left"
          mb="sm"
          w="100%"
        />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "bing")}
          iconAlt="Bing logo"
          iconSrc="/assets/bing-icon.svg"
          label="pages.settings.engines.engineBing"
          onChange={(next) => handleChangeEngines("bing", next)}
          hoverData={HOVER_DATA["bing"]}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "brave")}
          iconAlt="Brave logo"
          iconSrc="/assets/brave-icon.svg"
          label="pages.settings.engines.engineBrave"
          onChange={(next) => handleChangeEngines("brave", next)}
          hoverData={HOVER_DATA["brave"]}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "duckduckgo")}
          iconAlt="DuckDuckGo logo"
          iconSrc="/assets/ddg-icon.svg"
          label="pages.settings.engines.engineDDG"
          onChange={(next) => handleChangeEngines("duckduckgo", next)}
          hoverData={HOVER_DATA["duckDuckGo"]}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "google")}
          iconAlt="Google logo"
          iconSrc="/assets/google-icon.svg"
          label="pages.settings.engines.engineGoogle"
          onChange={(next) => handleChangeEngines("google", next)}
          hoverData={HOVER_DATA["google"]}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "mojeek")}
          iconAlt="Mojeek logo"
          iconSrc="/assets/mojeek-icon.svg"
          label="pages.settings.engines.engineMojeek"
          onChange={(next) => handleChangeEngines("mojeek", next)}
          hoverData={HOVER_DATA["mojeek"]}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "presearch")}
          iconAlt="Presearch logo"
          iconSrc="/assets/presearch-icon.svg"
          label="pages.settings.engines.enginePresearch"
          onChange={(next) => handleChangeEngines("presearch", next)}
          hoverData={HOVER_DATA["presearch"]}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "qwant")}
          iconAlt="Qwant logo"
          iconSrc="/assets/qwant-icon.svg"
          label="pages.settings.engines.engineQwant"
          onChange={(next) => handleChangeEngines("qwant", next)}
          hoverData={HOVER_DATA["qwant"]}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "startpage")}
          iconAlt="Startpage logo"
          iconSrc=""
          label="pages.settings.engines.engineStartpage"
          onChange={(next) => handleChangeEngines("startpage", next)}
          hoverData={HOVER_DATA["startpage"]}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "yahoo")}
          iconAlt="Yahoo logo"
          iconSrc="/assets/yahoo-icon.svg"
          label="pages.settings.engines.engineYahoo"
          onChange={(next) => handleChangeEngines("yahoo", next)}
          hoverData={HOVER_DATA["yahoo"]}
        />

        <Divider
          label={
            <Text fw={500} c="teal">
              {t("pages.settings.engines.title2")}
            </Text>
          }
          labelPosition="left"
          my="sm"
          w="100%"
        />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "wikibooks")}
          iconAlt="Wikibooks logo"
          iconSrc="/assets/wikibooks-icon.svg"
          label="pages.settings.engines.engineWikibooks"
          onChange={(next) => handleChangeEngines("wikibooks", next)}
          hoverData={HOVER_DATA["wikibooks"]}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "wikisource")}
          iconAlt="Wikisource logo"
          iconSrc="/assets/wikisource-icon.svg"
          label="pages.settings.engines.engineWikisource"
          onChange={(next) => handleChangeEngines("wikisource", next)}
          hoverData={HOVER_DATA["wikisource"]}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "wikispecies")}
          iconAlt="Wikispecies logo"
          iconSrc="/assets/wikispecies-icon.svg"
          label="pages.settings.engines.engineWikispecies"
          onChange={(next) => handleChangeEngines("wikispecies", next)}
          hoverData={HOVER_DATA["wikispecies"]}
        />

        <Divider
          label={
            <Text fw={500} c="teal">
              {t("pages.settings.engines.title4")}
            </Text>
          }
          labelPosition="left"
          my="sm"
          w="100%"
        />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "alexandria")}
          iconAlt="Alexandria logo"
          iconSrc=""
          label="pages.settings.engines.engineAlexandria"
          onChange={(next) => handleChangeEngines("alexandria", next)}
          hoverData={HOVER_DATA["alexandria"]}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "wikipedia")}
          iconAlt="Wikipedia logo"
          iconSrc="/assets/wikipedia-icon.svg"
          label="pages.settings.engines.engineWikipedia"
          onChange={(next) => handleChangeEngines("wikipedia", next)}
          hoverData={HOVER_DATA["wikipedia"]}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesGeneral.find((e) => e === "wikidata")}
          iconAlt="Wikidata logo"
          iconSrc="/assets/wikidata-icon.svg"
          label="pages.settings.engines.engineWikidata"
          onChange={(next) => handleChangeEngines("wikidata", next)}
          hoverData={HOVER_DATA["wikidata"]}
        />

        <Divider my="xs" w="100%" />
      </Stack>

      <Space h="xl" />
    </Paper>
  );
};

export default SettingsEnginesGeneral;
