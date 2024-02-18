import { Button, SimpleGrid, Text } from "@mantine/core";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { IconSearch } from "@tabler/icons-react";
import { ISearXNGResultsGeneral } from "@ts/searxng.types";
import { getIconStyle } from "@utils/functions/iconStyle";
import React from "react";

interface Props {
  suggestions: ISearXNGResultsGeneral["suggestions"];
}

const Suggestions: React.FC<Props> = ({ suggestions }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmitSearch = (newQ: string) => {
    navigate(`/search?q=${encodeURIComponent(newQ)}&tab=general`);
  };

  const q = searchParams.get("q") || "";

  return (
    <>
      <Text size="lg">
        Searches related to <b>{q}</b>
      </Text>

      <SimpleGrid cols={{ base: 2, sm: 2 }}>
        {suggestions.map((s, i) => (
          <Button
            key={i}
            variant="default"
            leftSection={<IconSearch style={getIconStyle(18)} color="gray" />}
            onClick={() => handleSubmitSearch(s)}
            ta="left"
          >
            <Text truncate>{s}</Text>
          </Button>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Suggestions;
