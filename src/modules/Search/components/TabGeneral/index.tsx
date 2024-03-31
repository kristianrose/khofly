import { useEffect } from "react";
import InstantAnswer from "../InstantAnswer";
import SearchResultRow from "./components/SearchResultRow";
import { Button, Center, Divider, Flex, Stack, Text } from "@mantine/core";

import classes from "./styles.module.scss";
import ScrollToTop from "../ScrollToTop";
import useSearXNGSWR from "src/api/searxng/use-searxng-query";
import { ISearXNGResultsGeneral } from "@ts/searxng.types";
import SearchResultSkeleton from "./components/SearchResultSkeleton";
import Suggestions from "./components/Suggestions";
import Infobox from "./components/Infobox";
import Lyricsbox from "./components/Lyricsbox";
import clsx from "clsx";
import CaramelldansenAudio from "./components/Memes/Caramelldansen";
import SearchOptions from "../SearchOptions";
import { useSearchParams } from "@remix-run/react";
import { useSearchStore } from "@store/search";

const TabGeneral = () => {
  const [searchParams] = useSearchParams();

  const { hydrated } = useSearchStore((state) => ({
    hydrated: state.hydrated,
  }));

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSearXNGSWR<ISearXNGResultsGeneral>();

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    if (!data?.length && hydrated) mutate();
  }, [hydrated]);

  const isRateLimit = data?.includes("Too Many Requests" as any);

  return (
    <Flex
      className={clsx(classes.tab_general, {
        [classes.tab_general_caramelldansen]: searchParams
          .get("q")
          ?.includes("caramelldansen"),
      })}
      align="flex-start"
    >
      {/* Search results */}
      <Stack className={classes.stack} py="xl">
        {/* Search Options */}
        <SearchOptions className={classes.search_options_general} />

        <InstantAnswer />

        {data?.map((res, i) => {
          if (!res?.results) return;
          return (
            <Stack gap="lg" key={i}>
              {i !== 0 && (
                <Divider label={`Page ${i + 1}`} labelPosition="left" />
              )}

              {res?.results.map((r, i) => (
                <SearchResultRow key={i} {...r} />
              ))}
            </Stack>
          );
        })}

        {(isLoading || isValidating) &&
          // Loading state
          Array.from(Array(10).keys()).map((e, i) => (
            <SearchResultSkeleton key={i} />
          ))}

        {error && (
          // Error state
          <Text>RIP results</Text>
        )}

        {data?.[0]?.suggestions?.length && !isLoading && !isValidating ? (
          <Suggestions suggestions={data?.[0]?.suggestions} />
        ) : null}

        {isRateLimit && (
          // Rate limit
          <Text>Too Many Requests</Text>
        )}

        {!isLoading &&
          !isValidating &&
          data &&
          data?.length >= 1 &&
          data?.[0]?.results?.length < 1 &&
          !isRateLimit && (
            <Center py="xs">No results, try with different query</Center>
          )}

        {!isLoading &&
          !isValidating &&
          data &&
          data?.length >= 1 &&
          data?.[0]?.results?.length >= 1 &&
          !isRateLimit && (
            <Button
              variant="filled"
              onClick={() => setSize(size + 1)}
              size="md"
              color="dark.5"
            >
              Load more
            </Button>
          )}

        <ScrollToTop />
      </Stack>

      {/* Infoboxes */}

      <Flex direction="column" gap="xl">
        {!isLoading &&
          !isValidating &&
          !isRateLimit &&
          data &&
          data?.[0]?.infoboxes?.length >= 1 && (
            <Infobox {...data[0].infoboxes[0]} />
          )}

        {<Lyricsbox />}
      </Flex>

      {/* Memes */}
      <CaramelldansenAudio />
    </Flex>
  );
};

export default TabGeneral;
