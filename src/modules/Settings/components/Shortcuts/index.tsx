import { Button, Flex, Paper, Text } from "@mantine/core";

import { IconApps } from "@tabler/icons-react";
import { useGlobalStore } from "@store/global";

import classes from "../../styles.module.scss";

import { useTranslate } from "@hooks/translate/use-translate";

const SettingsShortcuts = () => {
  const t = useTranslate();

  const { setAppTheme } = useGlobalStore((state) => ({
    setAppTheme: state.setAppTheme,
  }));

  const handleApply = () => {
    setAppTheme("Custom");
  };

  return (
    <Paper radius="md" mt={40} withBorder>
      <Flex align="center" p="lg" mb={16}>
        <IconApps size={32} />

        <Text fz={26} fw={600} ml="sm">
          {t("pages.settings.theme.title")}
        </Text>
      </Flex>

      {/* Settings content */}

      <Flex
        align="center"
        justify="space-between"
        p="lg"
        className={classes.settings_footer}
      >
        <Text c="dimmed">{t("pages.settings.theme.description")}</Text>

        <Button onClick={handleApply}>
          {t("pages.settings.theme.button")}
        </Button>
      </Flex>
    </Paper>
  );
};

export default SettingsShortcuts;
