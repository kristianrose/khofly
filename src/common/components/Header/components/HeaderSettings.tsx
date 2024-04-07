import { ActionIcon, rem } from "@mantine/core";
import { IconSettings2 } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import RemixLink from "@components/RemixLink";
import classes from "../styles.module.scss";

const HeaderSettings = () => {
  return (
    <RemixLink to="/settings">
      <ActionIcon
        className={classes.action_button}
        variant="subtle"
        size={rem(36)}
        ml="md"
      >
        <IconSettings2 style={getIconStyle(24)} />
      </ActionIcon>
    </RemixLink>
  );
};

export default HeaderSettings;
