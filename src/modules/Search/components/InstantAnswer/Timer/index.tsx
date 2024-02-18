import React, { useEffect, useState } from "react";
import { IAWrapper } from "../wrapper";
import {
  ActionIcon,
  Button,
  Center,
  Flex,
  NumberInput,
  Paper,
  RingProgress,
  Text,
} from "@mantine/core";
import {
  IconCheck,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";

import classes from "./styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import clsx from "clsx";
import { useInterval } from "@mantine/hooks";

const getTotalSeconds = (time: {
  hour: number;
  minute: number;
  second: number;
}) => {
  return time.second + time.minute * 60 + time.hour * 60 * 60;
};

const formatOutput = (no: number) => {
  return no.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

const remainingPercentage = (partialValue: number, totalValue: number) => {
  return 100 - (100 * partialValue) / totalValue;
};

const INITIAL_TIME = {
  hour: 0,
  minute: 0,
  second: 10,
};

const Timer = () => {
  const [initialTime, setInitialTime] = useState(INITIAL_TIME);
  const [time, setTime] = useState(INITIAL_TIME);

  const [isFinished, setFinished] = useState(false);
  const [isStarted, setStarted] = useState(false);

  // Timer logic
  const { active, start, stop } = useInterval(() => {
    // setSeconds((seconds) => seconds - 1);

    setTime((time) => {
      if (time.second > 0) {
        return { ...time, second: time.second - 1 };
      } else if (time.minute > 0) {
        return { ...time, minute: time.minute - 1, second: 59 };
      } else if (time.hour > 0) {
        return { hour: time.hour - 1, minute: 59, second: 59 };
      }
      return INITIAL_TIME;
    });
  }, 1000);

  useEffect(() => {
    if (time.hour === 0 && time.minute === 0 && time.second === 0 && active) {
      setFinished(true);
      stop();
    }

    // return () => stop();
  }, [time]);

  const handleChangeSeconds = (
    val: number,
    key: "hour" | "minute" | "second"
  ) => {
    setInitialTime({ ...initialTime, [key]: val || 0 });
    setTime({ ...time, [key]: val || 0 });
  };

  const handlePlay = () => {
    if (!isStarted) setStarted(true);
    start();
  };

  const handlePause = () => {
    stop();
  };

  const handleReset = () => {
    setStarted(false);
    setFinished(false);
    setInitialTime(INITIAL_TIME);
    setTime(INITIAL_TIME);
    stop();
  };

  return (
    <IAWrapper>
      <Center>
        <Paper
          className={clsx(classes.paper_base, {
            [classes.paper_finished]: isFinished,
          })}
          p="md"
          radius="sm"
          withBorder
        >
          <Flex align="center" justify="space-between" direction="row">
            <RingProgress
              thickness={8}
              roundCaps
              sections={[
                {
                  value: remainingPercentage(
                    getTotalSeconds(time),
                    getTotalSeconds(initialTime)
                  ),
                  color: "green",
                },
              ]}
              label={
                isFinished ? (
                  <Center
                    className={classes.action_button}
                    onClick={handleReset}
                  >
                    <ActionIcon
                      color="teal"
                      variant="light"
                      radius="xl"
                      size={50}
                    >
                      <IconCheck style={getIconStyle(30)} stroke={5} />
                    </ActionIcon>
                  </Center>
                ) : active ? (
                  <Center
                    className={classes.action_button}
                    onClick={handlePause}
                  >
                    <ActionIcon
                      color="gray"
                      variant="light"
                      radius="xl"
                      size={50}
                    >
                      <IconPlayerPauseFilled style={getIconStyle(32)} />
                    </ActionIcon>
                  </Center>
                ) : (
                  <Center
                    className={classes.action_button}
                    onClick={handlePlay}
                  >
                    <ActionIcon
                      color="gray"
                      variant="light"
                      radius="xl"
                      size={50}
                    >
                      <IconPlayerPlayFilled style={getIconStyle(32)} />
                    </ActionIcon>
                  </Center>
                )
              }
            />

            {active || isFinished || isStarted ? (
              <Flex align="flex-end">
                <Text fz={42}>{formatOutput(time.hour)}:</Text>
                <Text fz={42}>{formatOutput(time.minute)}</Text>
                <Text fz={24} c="dimmed" ml={2} mb={6}>
                  {formatOutput(time.second)}
                </Text>
              </Flex>
            ) : (
              <Flex gap="sm">
                <NumberInput
                  value={time.hour}
                  onChange={(val) =>
                    handleChangeSeconds(parseInt(`${val}`), "hour")
                  }
                  w={50}
                  max={59}
                  placeholder="HH"
                  hideControls
                  label="HH"
                />
                <NumberInput
                  value={time.minute}
                  onChange={(val) =>
                    handleChangeSeconds(parseInt(`${val}`), "minute")
                  }
                  w={50}
                  max={59}
                  placeholder="MM"
                  hideControls
                  label="MM"
                />
                <NumberInput
                  value={time.second}
                  onChange={(val) =>
                    handleChangeSeconds(parseInt(`${val}`), "second")
                  }
                  w={50}
                  max={59}
                  placeholder="SS"
                  hideControls
                  label="SS"
                />
              </Flex>
            )}

            {!active && isStarted && (
              <Button
                className={classes.reset_btn}
                size="xs"
                variant="default"
                onClick={handleReset}
              >
                Reset
              </Button>
            )}
          </Flex>
        </Paper>
      </Center>
    </IAWrapper>
  );
};

export default Timer;
