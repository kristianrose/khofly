import {
  Divider,
  Flex,
  Image,
  Paper,
  Space,
  Stack,
  Switch,
  Table,
  Text,
} from "@mantine/core";
import { IVideosEngines, useSearchStore } from "@store/search";
import { IconPlayerPlay } from "@tabler/icons-react";
import EngineComponent from "../EngineComponent";
import { useTranslate } from "@hooks/translate/use-translate";
import { DATA_ENGINES_VIDEOS } from "./data";
import { HOVER_DATA } from "../EngineComponent/hover-data";

const SettingsEnginesVideos = () => {
  const t = useTranslate();

  const { enginesVideos, setEnginesVideos } = useSearchStore((state) => ({
    enginesVideos: state.enginesVideos,
    setEnginesVideos: state.setEnginesVideos,
  }));

  const handleChangeEngines = (e: IVideosEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesVideos, e];
    } else {
      newEngines = enginesVideos.filter((eng) => eng !== e);
    }

    setEnginesVideos(newEngines);
  };

  const rows = DATA_ENGINES_VIDEOS.map((item, i) => (
    <EngineComponent
      key={i}
      type={item.type}
      checked={!!enginesVideos.find((e) => e === item.value)}
      iconAlt={item.alt}
      iconSrc={item.icon}
      label={item.label}
      onChange={(next) =>
        handleChangeEngines(item.value as IVideosEngines, next)
      }
      hoverData={HOVER_DATA[item.value]}
      safeSearch={item.safeSearch}
      timeRange={item.timeRange}
    />
  ));

  return (
    <Table verticalSpacing="sm" px="md" w="100%">
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="100%">Engine</Table.Th>
          <Table.Th pr="xl">Safe search</Table.Th>
          <Table.Th pr="xl">Time range</Table.Th>
          <Table.Th pr="xl">Status</Table.Th>
          <Table.Th ta="right">Active</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default SettingsEnginesVideos;
