import { Anchor, Box, Flex, Image, Text, UnstyledButton } from "@mantine/core";

import classes from "./styles.module.scss";
import { OpenWeatherCode } from "src/api/weather/types";
import WeatherIcon from "./WeatherIcon";

interface Props {
  onClick: () => void;
  tempMin: number;
  tempMax: number;
  code: OpenWeatherCode;
}

const WeatherDaily: React.FC<Props> = ({ code, onClick, tempMax, tempMin }) => {
  return (
    <UnstyledButton
      className={classes.weather_daily}
      w={90}
      h={120}
      onClick={onClick}
    >
      <Text size="sm" fw={600} mb={8} c="dimmed">
        Wed
      </Text>

      <WeatherIcon code={code} size="small" />

      <Flex align="center" justify="center" gap="md">
        <Text size="md" fw="bold" mt={8}>
          {tempMax}°
        </Text>
        <Text size="md" fw="bold" mt={8}>
          {tempMin}°
        </Text>
      </Flex>
    </UnstyledButton>
  );
};
export default WeatherDaily;
