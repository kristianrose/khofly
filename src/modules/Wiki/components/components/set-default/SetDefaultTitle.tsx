import React from "react";
import { Flex, Text, useMantineTheme } from "@mantine/core";

import classes from "./styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import { TablerIconsProps } from "@tabler/icons-react";

interface Props {
  label: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  iconColor: string;
}

const SetDefaultTitle: React.FC<Props> = ({ icon, iconColor, label }) => {
  const Icon = icon;

  return (
    <Flex className={classes.set_default_title} align="center" gap="lg" mb="xl">
      <Icon style={getIconStyle(48)} color={iconColor} />

      <Text className={classes.set_default_title_text} fw={600}>
        {label}
      </Text>
    </Flex>
  );
};

export default SetDefaultTitle;
