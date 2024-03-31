import { Table } from "@mantine/core";
import { ISocialMediaEngines, useSearchStore } from "@store/search";
import EngineComponent from "../EngineComponent";
import { DATA_ENGINES_SOCIAL_MEDIA } from "./data";
import { HOVER_DATA } from "../EngineComponent/hover-data";

const SettingsEnginesSocialMedia = () => {
  const { enginesSocialMedia, setEnginesSocialMedia } = useSearchStore(
    (state) => ({
      enginesSocialMedia: state.enginesSocialMedia,
      setEnginesSocialMedia: state.setEnginesSocialMedia,
    })
  );

  const handleChangeEngines = (e: ISocialMediaEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesSocialMedia, e];
    } else {
      newEngines = enginesSocialMedia.filter((eng) => eng !== e);
    }

    setEnginesSocialMedia(newEngines);
  };

  const rows = DATA_ENGINES_SOCIAL_MEDIA.map((item, i) => (
    <EngineComponent
      key={i}
      type={item.type}
      checked={!!enginesSocialMedia.find((e) => e === item.value)}
      iconAlt={item.alt}
      iconSrc={item.icon}
      label={item.label}
      onChange={(next) =>
        handleChangeEngines(item.value as ISocialMediaEngines, next)
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

export default SettingsEnginesSocialMedia;
