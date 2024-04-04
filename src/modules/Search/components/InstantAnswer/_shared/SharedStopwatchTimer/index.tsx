import React from "react";
import { Tabs } from "@mantine/core";
import { IconClock, IconHourglassLow } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import Stopwatch from "../../Stopwatch";
import Timer from "../../Timer";
import { IAWrapper } from "../../wrapper";

interface Props {
  type: "stopwatch" | "timer";
}

const SharedStopwatchTimer: React.FC<Props> = ({ type }) => {
  return (
    <IAWrapper>
      <Tabs defaultValue={type}>
        <Tabs.List grow mb="lg">
          <Tabs.Tab
            value="stopwatch"
            leftSection={<IconClock style={getIconStyle(20)} />}
          >
            Stopwatch
          </Tabs.Tab>
          <Tabs.Tab
            value="timer"
            leftSection={<IconHourglassLow style={getIconStyle(20)} />}
          >
            Timer
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="stopwatch">
          <Stopwatch withIAWrapper={false} />
        </Tabs.Panel>

        <Tabs.Panel value="timer">
          <Timer withIAWrapper={false} />
        </Tabs.Panel>
      </Tabs>
    </IAWrapper>
  );
};

export default SharedStopwatchTimer;
