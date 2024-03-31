import SettingsSearXNG from "./components/SearXNG";
import { Container, Tabs } from "@mantine/core";
import classes from "./styles.module.scss";
import {
  IconBrush,
  IconLink,
  IconRadar,
  IconSettings2,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import SettingsGeneral from "./components/General";
import SettingsInterface from "./components/Interface";
import EnginesTabs from "./components/EnginesTabs";
import SettingsCategories from "./components/Categories";
import SettingsNominatim from "./components/Nominatim";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { useState } from "react";

const PageSettings = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const paramTab = searchParams.get("tab");

  // Keep local state so app feels faster
  const [stateTab, setStateTab] = useState(paramTab || "general");

  const handleChangeTab = (next: string | null) => {
    if (!next) return;

    setStateTab(next);
    navigate(`/settings?tab=${next}`, { replace: true });
  };

  return (
    <Container className={classes.settings_page} size="lg" pt={40} pb={80}>
      <Tabs
        variant="default"
        value={stateTab}
        onChange={handleChangeTab}
        keepMounted={false}
      >
        <Tabs.List mb="xl" className={classes.tabs_scroll}>
          <Tabs.Tab
            value="general"
            leftSection={<IconSettings2 style={getIconStyle(20)} />}
          >
            General
          </Tabs.Tab>
          <Tabs.Tab
            value="interface"
            leftSection={<IconBrush style={getIconStyle(20)} />}
          >
            Interface
          </Tabs.Tab>
          <Tabs.Tab
            value="instance"
            leftSection={<IconLink style={getIconStyle(20)} />}
          >
            Instances
          </Tabs.Tab>
          <Tabs.Tab
            value="engines"
            leftSection={<IconRadar style={getIconStyle(20)} />}
          >
            Engines
          </Tabs.Tab>
          {/* <Tabs.Tab
            value="shortcuts"
            leftSection={<IconApps style={getIconStyle(20)} />}
          >
            Shortcuts
          </Tabs.Tab> */}
        </Tabs.List>

        <Tabs.Panel value="interface">
          <SettingsInterface />
        </Tabs.Panel>

        <Tabs.Panel value="general">
          <>
            <SettingsCategories />
            <SettingsGeneral />
          </>
        </Tabs.Panel>

        <Tabs.Panel value="instance">
          <>
            <SettingsSearXNG />
            <SettingsNominatim />
          </>
        </Tabs.Panel>

        <Tabs.Panel value="engines">
          <EnginesTabs />
        </Tabs.Panel>
        {/* 
        <Tabs.Panel value="shortcuts">
          <SettingsShortcuts />
        </Tabs.Panel> */}
      </Tabs>
    </Container>
  );
};

export default PageSettings;
