import { Flex, Paper, Space, Stack, Tabs, Text } from "@mantine/core";
import {
  IconCpu,
  IconFiles,
  IconMusic,
  IconNews,
  IconPhoto,
  IconPlayerPlay,
  IconSchool,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import SettingsEnginesSearch from "../EnginesGeneral";
import SettingsEnginesImages from "../EnginesImages";
import SettingsEnginesVideos from "../EnginesVideos";
import SettingsEnginesNews from "../EnginesNews";
import classes from "../../styles.module.scss";
import SettingsEnginesMusic from "../EnginesMusic";
import SettingsEnginesIT from "../EnginesIT";
import SettingsEnginesScience from "../EnginesScience";
import SettingsEnginesFiles from "../EnginesFiles";
import SettingsEnginesSocialMedia from "../EnginesSocialMedia";
import { useTranslate } from "@hooks/translate/use-translate";
import { useState } from "react";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

const TAB_DATA: {
  [key: string]: {
    label: DotNestedKeys<ITranslations>;
    icon: any;
  };
} = {
  general: {
    label: "pages.settings.engines.title",
    icon: <IconSearch size={32} />,
  },
  images: {
    label: "pages.settings.engines.titleImg",
    icon: <IconPhoto size={32} />,
  },
  videos: {
    label: "pages.settings.engines.titleVid",
    icon: <IconPlayerPlay size={32} />,
  },
  news: {
    label: "pages.settings.engines.titleNews",
    icon: <IconNews size={32} />,
  },

  music: {
    label: "pages.settings.engines.titleMusic",
    icon: <IconMusic size={32} />,
  },
  it: {
    label: "pages.settings.engines.titleIT",
    icon: <IconCpu size={32} />,
  },
  science: {
    label: "pages.settings.engines.titleScience",
    icon: <IconSchool size={32} />,
  },
  files: {
    label: "pages.settings.engines.titleFiles",
    icon: <IconFiles size={32} />,
  },
  social_media: {
    label: "pages.settings.engines.titleSocial",
    icon: <IconUsers size={32} />,
  },
};

const EnginesTabs = () => {
  const t = useTranslate();

  const [tab, setTab] = useState("general");

  return (
    <Paper radius="md" withBorder>
      <Flex align="center" p="lg" mb={0}>
        {TAB_DATA[tab].icon}

        <Text fz={26} fw={600} ml="sm">
          {t(TAB_DATA[tab].label)}
        </Text>

        <div style={{ flex: 1 }}></div>

        <Text>Currently selected engines</Text>
      </Flex>

      <Stack w="100%" px="lg" gap={6}>
        <Tabs
          variant="default"
          value={tab}
          onChange={(val) => setTab(val || "general")}
          keepMounted={false}
        >
          <Tabs.List mb="lg" className={classes.tabs_scroll}>
            <Tabs.Tab
              value="general"
              leftSection={<IconSearch style={getIconStyle(20)} />}
            >
              General
            </Tabs.Tab>
            <Tabs.Tab
              value="images"
              leftSection={<IconPhoto style={getIconStyle(20)} />}
            >
              Images
            </Tabs.Tab>
            <Tabs.Tab
              value="videos"
              leftSection={<IconPlayerPlay style={getIconStyle(20)} />}
            >
              Videos
            </Tabs.Tab>
            <Tabs.Tab
              value="news"
              leftSection={<IconNews style={getIconStyle(20)} />}
            >
              News
            </Tabs.Tab>
            {/* <Tabs.Tab
              value="music"
              leftSection={<IconMusic style={getIconStyle(20)} />}
            >
              Music
            </Tabs.Tab> */}
            {/* <Tabs.Tab
              value="it"
              leftSection={<IconCpu style={getIconStyle(20)} />}
            >
              IT
            </Tabs.Tab> */}
            {/* <Tabs.Tab
              value="science"
              leftSection={<IconSchool style={getIconStyle(20)} />}
            >
              Science
            </Tabs.Tab> */}
            {/* <Tabs.Tab
              value="files"
              leftSection={<IconFiles style={getIconStyle(20)} />}
            >
              Files
            </Tabs.Tab> */}
            {/* <Tabs.Tab
              value="social_media"
              leftSection={<IconUsers style={getIconStyle(20)} />}
            >
              Social Media
            </Tabs.Tab> */}
          </Tabs.List>

          <Tabs.Panel value="general">
            <SettingsEnginesSearch />
          </Tabs.Panel>

          <Tabs.Panel value="images">
            <SettingsEnginesImages />
          </Tabs.Panel>

          <Tabs.Panel value="videos">
            <SettingsEnginesVideos />
          </Tabs.Panel>

          <Tabs.Panel value="news">
            <SettingsEnginesNews />
          </Tabs.Panel>

          <Tabs.Panel value="music">
            <SettingsEnginesMusic />
          </Tabs.Panel>

          <Tabs.Panel value="it">
            <SettingsEnginesIT />
          </Tabs.Panel>

          <Tabs.Panel value="science">
            <SettingsEnginesScience />
          </Tabs.Panel>

          <Tabs.Panel value="files">
            <SettingsEnginesFiles />
          </Tabs.Panel>

          <Tabs.Panel value="social_media">
            <SettingsEnginesSocialMedia />
          </Tabs.Panel>
        </Tabs>
      </Stack>

      <Space h="xl" />
    </Paper>
  );
};

export default EnginesTabs;
