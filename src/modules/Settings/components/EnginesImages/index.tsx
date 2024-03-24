import { Table } from "@mantine/core";
import { IImagesEngines, useSearchStore } from "@store/search";
import EngineComponent from "../EngineComponent";
import { useTranslate } from "@hooks/translate/use-translate";
import { DATA_ENGINES_IMAGES } from "./data";
import { HOVER_DATA } from "../EngineComponent/hover-data";

const SettingsEnginesImages = () => {
  const t = useTranslate();

  const { enginesImages, setEnginesImages } = useSearchStore((state) => ({
    enginesImages: state.enginesImages,
    setEnginesImages: state.setEnginesImages,
  }));

  const handleChangeEngines = (e: IImagesEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...enginesImages, e];
    } else {
      newEngines = enginesImages.filter((eng) => eng !== e);
    }

    setEnginesImages(newEngines);
  };

  const rows = DATA_ENGINES_IMAGES.map((item, i) => (
    <EngineComponent
      key={i}
      type={item.type}
      checked={!!enginesImages.find((e) => e === item.value)}
      iconAlt={item.alt}
      iconSrc={item.icon}
      label={item.label}
      onChange={(next) =>
        handleChangeEngines(item.value as IImagesEngines, next)
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

export default SettingsEnginesImages;
