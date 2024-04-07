import { Box, Code, Container, Text } from "@mantine/core";
import classes from "./styles.module.scss";

import WikiTitle from "./common/WikiTitle";
import WikiSubtitle from "./common/WikiSubtitle";

import IACalculator from "@module/Search/components/InstantAnswer/Calculator";
import IACoinFlip from "@module/Search/components/InstantAnswer/CoinFilp";
import IALyrics from "@module/Search/components/InstantAnswer/Lyrics";
import IATimer from "@module/Search/components/InstantAnswer/Timer";
import IATranslate from "@module/Search/components/InstantAnswer/Translate";
import IAUUID from "@module/Search/components/InstantAnswer/UUID";
import IAWeather from "@module/Search/components/InstantAnswer/Weather";
import IACalendar from "@module/Search/components/InstantAnswer/Calendar";
import IAStopwatch from "@module/Search/components/InstantAnswer/Stopwatch";

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
        <IACalculator />
      </Box>

      <WikiTitle>2. Calendar</WikiTitle>
      <Box className={classes.search_box}>
        <IACalendar />
      </Box>

      <WikiTitle>3. Coin Flip</WikiTitle>
      <Box className={classes.search_box}>
        <IACoinFlip />
      </Box>

      <WikiTitle>4. Lyrics</WikiTitle>
      <Box className={classes.search_box}>
        <IALyrics initialQ="rick astley never gonna give you up" />
      </Box>

      <WikiTitle>5. Stopwatch</WikiTitle>
      <Box className={classes.search_box}>
        <IAStopwatch withIAWrapper />
      </Box>

      <WikiTitle>6. Timer</WikiTitle>
      <Box className={classes.search_box}>
        <IATimer withIAWrapper />
      </Box>

      {/* <WikiTitle>7. Translate</WikiTitle>
      <Box className={classes.search_box}>
        <Translate />
      </Box> */}

      <WikiTitle>7. Random UUID</WikiTitle>
      <Box className={classes.search_box}>
        <IAUUID />
      </Box>

      <WikiTitle>8. Weather</WikiTitle>
      <Box className={classes.search_box}>
        <IAWeather />
      </Box>
    </Container>
  );
};

export default DocsResourcesInstantAnswer;
