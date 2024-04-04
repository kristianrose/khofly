import { Table } from "@mantine/core";
import EngineComponent from "../EngineComponent";
import { DATA_ENGINES_FILES } from "./data";
import { HOVER_DATA } from "../EngineComponent/hover-data";
import { IFilesEngines, useEnginesStore } from "@store/engines";

const SettingsEnginesFiles = () => {
  const { enginesFiles, setEnginesFiles } = useEnginesStore((state) => ({
    enginesFiles: state.enginesFiles,
    setEnginesFiles: state.setEnginesFiles,
  }));

  const handleChangeEngines = (e: IFilesEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesFiles, e];
    } else {
      newEngines = enginesFiles.filter((eng) => eng !== e);
    }

    setEnginesFiles(newEngines);
  };

  const rows = DATA_ENGINES_FILES.map((item, i) => (
    <EngineComponent
      key={i}
      type={item.type}
      checked={!!enginesFiles.find((e) => e === item.value)}
      iconAlt={item.alt}
      iconSrc={item.icon}
      label={item.label}
      onChange={(next) =>
        handleChangeEngines(item.value as IFilesEngines, next)
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

export default SettingsEnginesFiles;
