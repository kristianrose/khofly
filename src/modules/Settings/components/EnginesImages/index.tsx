import { Divider, Flex, Paper, Space, Stack, Text } from "@mantine/core";
import { IImagesEngines, useSearchStore } from "@store/search";
import { IconPhoto } from "@tabler/icons-react";
import EngineComponent from "../EngineComponent";
import { useTranslate } from "@hooks/translate/use-translate";

const SettingsEnginesImages = () => {
  const t = useTranslate();

  const { enginesImages, setEnginesImages } = useSearchStore((state) => ({
    enginesImages: state.enginesImages,
    setEnginesImages: state.setEnginesImages,
  }));

  const handleChangeEngines = (e: IImagesEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesImages, e];
    } else {
      newEngines = enginesImages.filter((eng) => eng !== e);
    }

    setEnginesImages(newEngines);
  };

  return (
    <Paper radius="md" withBorder>
      <Flex align="center" p="lg" mb={16}>
        <IconPhoto size={32} />

        <Text fz={26} fw={600} ml="sm">
          {t("pages.settings.engines.titleImg")}
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
          checked={!!enginesImages.find((e) => e === "bing")}
          iconAlt="Bing logo"
          iconSrc="/assets/bing-icon.svg"
          label="pages.settings.engines.engineBingImg"
          onChange={(next) => handleChangeEngines("bing", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesImages.find((e) => e === "brave")}
          iconAlt="Brave logo"
          iconSrc="/assets/brave-icon.svg"
          label="pages.settings.engines.engineBraveImg"
          onChange={(next) => handleChangeEngines("brave", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesImages.find((e) => e === "duckduckgo")}
          iconAlt="DuckDuckGo logo"
          iconSrc="/assets/ddg-icon.svg"
          label="pages.settings.engines.engineDDGImg"
          onChange={(next) => handleChangeEngines("duckduckgo", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesImages.find((e) => e === "google")}
          iconAlt="Google logo"
          iconSrc="/assets/google-icon.svg"
          label="pages.settings.engines.engineGoogleImg"
          onChange={(next) => handleChangeEngines("google", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesImages.find((e) => e === "qwant")}
          iconAlt="Qwant logo"
          iconSrc="/assets/qwant-icon.svg"
          label="pages.settings.engines.engineQwantImg"
          onChange={(next) => handleChangeEngines("qwant", next)}
        />

        <Divider my="xs" w="100%" />
      </Stack>

      <Space h="xl" />
    </Paper>
  );
};

export default SettingsEnginesImages;
