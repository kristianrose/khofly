import { Table } from "@mantine/core";
import EngineComponent from "../EngineComponent";
import { DATA_ENGINES_SCIENCE } from "./data";
import { HOVER_DATA } from "../EngineComponent/hover-data";
import { IScienceEngines, useEnginesStore } from "@store/engines";

const SettingsEnginesScience = () => {
  const { enginesScience, setEnginesScience } = useEnginesStore((state) => ({
    enginesScience: state.enginesScience,
    setEnginesScience: state.setEnginesScience,
  }));

  const handleChangeEngines = (e: IScienceEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesScience, e];
    } else {
      newEngines = enginesScience.filter((eng) => eng !== e);
    }

    setEnginesScience(newEngines);
  };

  const rows = DATA_ENGINES_SCIENCE.map((item, i) => (
    <EngineComponent
      key={i}
      type={item.type}
      checked={!!enginesScience.find((e) => e === item.value)}
      iconAlt={item.alt}
      iconSrc={item.icon}
      label={item.label}
      onChange={(next) =>
        handleChangeEngines(item.value as IScienceEngines, next)
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

export default SettingsEnginesScience;
