import { ActionIcon, rem } from "@mantine/core";
import { IconSettings2 } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import RemixLink from "@components/RemixLink";

const HeaderSettings = () => {
  return (
    <RemixLink to="/settings">
      <ActionIcon
        // className={classes.action_icon}
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
