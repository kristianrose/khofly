import { Table } from "@mantine/core";
import { IGeneralEngines, useSearchStore } from "@store/search";
import EngineComponent from "../EngineComponent";
import { HOVER_DATA } from "../EngineComponent/hover-data";
import { DATA_ENGINES_GENERAL } from "./data";

const SettingsEnginesGeneral = () => {
  const { enginesGeneral, setEnginesGeneral } = useSearchStore((state) => ({
    enginesGeneral: state.enginesGeneral,
    setEnginesGeneral: state.setEnginesGeneral,
  }));

  const handleChangeEngines = (e: IGeneralEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesGeneral, e];
    } else {
      newEngines = enginesGeneral.filter((eng) => eng !== e);
    }

    setEnginesGeneral(newEngines);
  };

  const rows = DATA_ENGINES_GENERAL.map((item, i) => (
    <EngineComponent
      key={i}
      type={item.type}
      checked={!!enginesGeneral.find((e) => e === item.value)}
      iconAlt={item.alt}
      iconSrc={item.icon}
      label={item.label}
      onChange={(next) =>
        handleChangeEngines(item.value as IGeneralEngines, next)
      }
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

export default SettingsEnginesGeneral;
