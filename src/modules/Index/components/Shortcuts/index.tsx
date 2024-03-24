import {
  Anchor,
  Box,
  Flex,
  Grid,
  Group,
  Image,
  Text,
  UnstyledButton,
} from "@mantine/core";

import classes from "./styles.module.scss";

const mockdata = [
  { title: "Music", url: "music.youtube.com" },
  { title: "GitHub", url: "github.com" },
  { title: "localhost:3000", url: "localhost:3000" },
];

export function Shortcuts() {
  const items = mockdata.map((item) => {
    const fullUrl = item.url.includes("http") ? item.url : `http://${item.url}`;

    return (
      <Anchor href={fullUrl} target="_blank" rel="noreferrer noopener">
        <UnstyledButton key={item.title} className={classes.item} w={90} h={90}>
          <Image
            w={40}
            h={40}
            // src={`https://favicone.com/${item.url}?s=32`}
            src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=32`}
            alt=""
          />
        </UnstyledButton>

        <Box w={90}>
          <Text size="md" fw="bold" mt={8} ta="center" truncate="end">
            {item.title}
          </Text>
        </Box>
      </Anchor>
    );
  });

  return (
    <Flex gap="sm" mt="xl">
      {items}
    </Flex>
  );
}
export default Shortcuts;
