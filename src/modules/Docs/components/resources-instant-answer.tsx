import { Box, Code, Container, Text } from "@mantine/core";
import classes from "./styles.module.scss";

import Calculator from "@module/Search/components/InstantAnswer/Calculator";
import CoinFlip from "@module/Search/components/InstantAnswer/CoinFilp";
import Lyrics from "@module/Search/components/InstantAnswer/Lyrics";
import Stopwatch from "@module/Search/components/InstantAnswer/Stopwatch";
import Timer from "@module/Search/components/InstantAnswer/Timer";
import Translate from "@module/Search/components/InstantAnswer/Translate";
import UUID from "@module/Search/components/InstantAnswer/UUID";
import WikiTitle from "./common/WikiTitle";
import WikiSubtitle from "./common/WikiSubtitle";

const DocsResourcesInstantAnswer = () => {
  const IAWrapperString = "<IAWrapper />";

  return (
    <Container size="lg" p="xl" pb={100}>
      <WikiTitle>Adding instant answer</WikiTitle>

      <Text mt="md">
        All instant answers code is located in{" "}
        <Code>/src/modules/Search/components/InstantAnswer</Code>
      </Text>
      <Text mt="md">
        Create a folder with a descriptive name and make sure that everything is
        wrapped with <Code>{IAWrapperString}</Code>, then add your logic for
        displaying Instant Answer in <Code>index.tsx</Code> similar to how
        others are displayed conditionally.
      </Text>

      <WikiSubtitle>All available instant answers</WikiSubtitle>

      <Text mt="md">
        Below is a list of all currently available Instant Answers, some of them
        might still be work in progress but offer enough functionality to still
        be included and be useful. More will be available in the future.
      </Text>

      <WikiTitle>1. Calculator</WikiTitle>
      <Box className={classes.search_box}>
        <Calculator />
      </Box>

      <WikiTitle>2. Coin Flip</WikiTitle>
      <Box className={classes.search_box}>
        <CoinFlip />
      </Box>

      <WikiTitle>3. Lyrics</WikiTitle>
      <Box className={classes.search_box}>
        <Lyrics initialQ="rick astley never gonna give you up" />
      </Box>

      <WikiTitle>4. Timer</WikiTitle>
      <Box className={classes.search_box}>
        <Timer />
      </Box>

      <WikiTitle>5. Translate</WikiTitle>
      <Box className={classes.search_box}>
        <Translate />
      </Box>

      <WikiTitle>6. Random UUID</WikiTitle>
      <Box className={classes.search_box}>
        <UUID />
      </Box>
    </Container>
  );
};

export default DocsResourcesInstantAnswer;
