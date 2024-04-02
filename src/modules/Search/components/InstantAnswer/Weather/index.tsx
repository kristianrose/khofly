import { useEffect, useState } from "react";
import { IAWrapper } from "../wrapper";
import {
  Anchor,
  Flex,
  LoadingOverlay,
  ScrollArea,
  SegmentedControl,
  Text,
} from "@mantine/core";
import {
  IconCloud,
  IconTemperatureCelsius,
  IconTemperatureFahrenheit,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import useWeatherSWR from "src/api/weather/use-weather-query";
import useGeolocation from "@hooks/use-geolocation";
import WeatherIcon from "./WeatherIcon";
import WeatherDaily from "./WeatherDaily";

const Weather = () => {
  const { data, isMutating, trigger } = useWeatherSWR();

  const { location } = useGeolocation();

  const [city, setCity] = useState("Pozarevac");
  const [unit, setUnit] = useState("C");

  const [currentData, setCurrentData] = useState<any | null>(null);

  // Get geolocation
  useEffect(() => {
    if (location) {
      trigger({ lat: location.latitude, lon: location.longitude });
    }
  }, [location]);

  // Update current data
  useEffect(() => {
    // if (data?.timelines) {
    //   setCurrentData(data.timelines.daily[0]);
    // }
  }, [data]);

  return (
    <IAWrapper>
      <Flex align="center" justify="space-between">
        <Text size="sm" c="dimmed">
          Data provided by{" "}
          <Anchor href="https://openweathermap.org" rel="noreferrer noopener">
            <Text component="span" c="blue.4">
              OpenWeather
            </Text>
          </Anchor>
        </Text>

        <SegmentedControl
          value={unit}
          onChange={(val) => setUnit(val)}
          data={[
            {
              value: "F",
              label: <IconTemperatureFahrenheit style={getIconStyle(20)} />,
            },
            {
              value: "C",
              label: <IconTemperatureCelsius style={getIconStyle(20)} />,
            },
          ]}
        />
      </Flex>

      {true && (
        <Flex align="center" justify="flex-start" mt="lg">
          <WeatherIcon code={801} size="normal" />

          <Text fz={32} fw="bold" ml="xs">
            {16}°
          </Text>
        </Flex>
      )}

      {true && (
        <ScrollArea h={130} mt="lg">
          <Flex gap="sm" align="center" justify="flex-start">
            <WeatherDaily
              code={800}
              onClick={() => {}}
              tempMax={18}
              tempMin={12}
            />
            <WeatherDaily
              code={801}
              onClick={() => {}}
              tempMax={18}
              tempMin={12}
            />
            <WeatherDaily
              code={802}
              onClick={() => {}}
              tempMax={18}
              tempMin={12}
            />
            <WeatherDaily
              code={803}
              onClick={() => {}}
              tempMax={18}
              tempMin={12}
            />
            <WeatherDaily
              code={300}
              onClick={() => {}}
              tempMax={18}
              tempMin={12}
            />
            <WeatherDaily
              code={501}
              onClick={() => {}}
              tempMax={18}
              tempMin={12}
            />
            <WeatherDaily
              code={211}
              onClick={() => {}}
              tempMax={18}
              tempMin={12}
            />
            <WeatherDaily
              code={601}
              onClick={() => {}}
              tempMax={18}
              tempMin={12}
            />
            <WeatherDaily
              code={731}
              onClick={() => {}}
              tempMax={18}
              tempMin={12}
            />
          </Flex>
        </ScrollArea>
      )}
      <LoadingOverlay visible={isMutating} />
    </IAWrapper>
  );
};

export default Weather;
