import { Table } from "@mantine/core";
import EngineComponent from "../EngineComponent";
import { DATA_ENGINES_IT } from "./data";
import { HOVER_DATA } from "../EngineComponent/hover-data";
import { IITEngines, useEnginesStore } from "@store/engines";

const SettingsEnginesIT = () => {
  const { enginesIT, setEnginesIT } = useEnginesStore((state) => ({
    enginesIT: state.enginesIT,
    setEnginesIT: state.setEnginesIT,
  }));

  const handleChangeEngines = (e: IITEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesIT, e];
    } else {
      newEngines = enginesIT.filter((eng) => eng !== e);
    }

    setEnginesIT(newEngines);
  };

  const rows = DATA_ENGINES_IT.map((item, i) => (
    <EngineComponent
      key={i}
      type={item.type}
      checked={!!enginesIT.find((e) => e === item.value)}
      iconAlt={item.alt}
      iconSrc={item.icon}
      label={item.label}
      onChange={(next) => handleChangeEngines(item.value as IITEngines, next)}
      hoverData={HOVER_DATA[item.value]}
      safeSearch={item.safeSearch}
      timeRange={item.timeRange}
    />
  ));

  return (
    <Table verticalSpacing="sm" px="md" w="100%" layout="auto">
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

export default SettingsEnginesIT;
