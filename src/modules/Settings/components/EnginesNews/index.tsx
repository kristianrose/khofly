import { Table } from "@mantine/core";
import { INewsEngines, useSearchStore } from "@store/search";
import EngineComponent from "../EngineComponent";
import { DATA_ENGINES_NEWS } from "./data";
import { HOVER_DATA } from "../EngineComponent/hover-data";

const SettingsEnginesNews = () => {
  const { enginesNews, setEnginesNews } = useSearchStore((state) => ({
    enginesNews: state.enginesNews,
    setEnginesNews: state.setEnginesNews,
  }));

  const handleChangeEngines = (e: INewsEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesNews, e];
    } else {
      newEngines = enginesNews.filter((eng) => eng !== e);
    }

    setEnginesNews(newEngines);
  };

  const rows = DATA_ENGINES_NEWS.map((item, i) => (
    <EngineComponent
      key={i}
      type={item.type}
      checked={!!enginesNews.find((e) => e === item.value)}
      iconAlt={item.alt}
      iconSrc={item.icon}
      label={item.label}
      onChange={(next) => handleChangeEngines(item.value as INewsEngines, next)}
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

export default SettingsEnginesNews;
