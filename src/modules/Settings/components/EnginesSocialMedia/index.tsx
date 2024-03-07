import { Divider, Flex, Paper, Space, Stack, Text } from "@mantine/core";
import { ISocialMediaEngines, useSearchStore } from "@store/search";
import { IconUsers } from "@tabler/icons-react";
import EngineComponent from "../EngineComponent";
import { useTranslate } from "@hooks/translate/use-translate";

const SettingsEnginesSocialMedia = () => {
  const t = useTranslate();

  const { enginesSocialMedia, setEnginesSocialMedia } = useSearchStore(
    (state) => ({
      enginesSocialMedia: state.enginesSocialMedia,
      setEnginesSocialMedia: state.setEnginesSocialMedia,
    })
  );

  const handleChangeEngines = (e: ISocialMediaEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesSocialMedia, e];
    } else {
      newEngines = enginesSocialMedia.filter((eng) => eng !== e);
    }

    setEnginesSocialMedia(newEngines);
  };

  return (
    <Paper radius="md" withBorder>
      <Flex align="center" p="lg" mb={16}>
        <IconUsers size={32} />

        <Text fz={26} fw={600} ml="sm">
          {t("pages.settings.engines.titleSocial")}
        </Text>
      </Flex>

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" gap={6}>
        <Divider
          label={
            <Text fw={500} c="teal">
              {t("pages.settings.engines.titleWithout")}
            </Text>
          }
          labelPosition="left"
          mb="sm"
          w="100%"
        />

        <EngineComponent
          checked={!!enginesSocialMedia.find((e) => e === "lemmycomments")}
          iconAlt="Lemmy logo"
          iconSrc="/assets/lemmy-icon.svg"
          label="pages.settings.engines.engineLemmyCommunitiesSM"
          onChange={(next) => handleChangeEngines("lemmycomments", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesSocialMedia.find((e) => e === "lemmycommunities")}
          iconAlt="Lemmy logo"
          iconSrc="/assets/lemmy-icon.svg"
          label="pages.settings.engines.engineLemmyCommunitiesSM"
          onChange={(next) => handleChangeEngines("lemmycommunities", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesSocialMedia.find((e) => e === "lemmyposts")}
          iconAlt="Lemmy logo"
          iconSrc="/assets/lemmy-icon.svg"
          label="pages.settings.engines.engineLemmyPostsSM"
          onChange={(next) => handleChangeEngines("lemmyposts", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesSocialMedia.find((e) => e === "lemmyusers")}
          iconAlt="Lemmy logo"
          iconSrc="/assets/lemmy-icon.svg"
          label="pages.settings.engines.engineLemmyUsersSM"
          onChange={(next) => handleChangeEngines("lemmyusers", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesSocialMedia.find((e) => e === "mastodonhashtags")}
          iconAlt="Mastodon logo"
          iconSrc="/assets/mastodon-icon.svg"
          label="pages.settings.engines.engineMastodonHashtagsSM"
          onChange={(next) => handleChangeEngines("mastodonhashtags", next)}
        />

        <Divider my="xs" w="100%" />

        <EngineComponent
          checked={!!enginesSocialMedia.find((e) => e === "mastodonusers")}
          iconAlt="Mastodon logo"
          iconSrc="/assets/mastodon-icon.svg"
          label="pages.settings.engines.engineMastodonUsersSM"
          onChange={(next) => handleChangeEngines("mastodonusers", next)}
        />

        <Divider my="xs" w="100%" />
      </Stack>

      <Space h="xl" />
    </Paper>
  );
};

export default SettingsEnginesSocialMedia;
