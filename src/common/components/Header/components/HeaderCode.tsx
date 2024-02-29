import { ActionIcon, Anchor, rem } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

const HeaderCode = () => {
  return (
    <Anchor href="https://github.com/cufta22/khofly" target="_blank">
      <ActionIcon
        // className={classes.action_icon}
        variant="subtle"
        size={rem(36)}
        ml="md"
      >
        <IconBrandGithub style={getIconStyle(24)} />
      </ActionIcon>
    </Anchor>
  );
};

export default HeaderCode;
