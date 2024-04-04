import { Table } from "@mantine/core";
import EngineComponent from "../EngineComponent";
import { DATA_ENGINES_MUSIC } from "./data";
import { HOVER_DATA } from "../EngineComponent/hover-data";
import { IMusicEngines, useEnginesStore } from "@store/engines";

const SettingsEnginesMusic = () => {
  const { enginesMusic, setEnginesMusic } = useEnginesStore((state) => ({
    enginesMusic: state.enginesMusic,
    setEnginesMusic: state.setEnginesMusic,
  }));

  const handleChangeEngines = (e: IMusicEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesMusic, e];
    } else {
      newEngines = enginesMusic.filter((eng) => eng !== e);
    }

    setEnginesMusic(newEngines);
  };

  const rows = DATA_ENGINES_MUSIC.map((item, i) => (
    <EngineComponent
      key={i}
      type={item.type}
      checked={!!enginesMusic.find((e) => e === item.value)}
      iconAlt={item.alt}
      iconSrc={item.icon}
      label={item.label}
      onChange={(next) =>
        handleChangeEngines(item.value as IMusicEngines, next)
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

export default SettingsEnginesMusic;
