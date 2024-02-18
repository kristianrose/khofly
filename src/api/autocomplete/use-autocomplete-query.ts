import { useGeneralStore } from "@store/general";
import useFetch from "../use-fetch";
import useSWRMutation from "swr/mutation";

// Restart SearXNG
// sudo systemctl reload nginx
// sudo service uwsgi restart searxng

const useAutocompleteSWR = () => {
  const { fetchData } = useFetch();

  const { autocompleteEngine } = useGeneralStore((state) => ({
    autocompleteEngine: state.autocompleteEngine,
  }));

  // ----------------------------------------------------------------------------
  // General search results - default
  // ----------------------------------------------------------------------------

  const fetcher = async (_key: string, { arg }: { arg: string }) => {
    const res = await fetchData(
      `/api/autocomplete?q=${arg}&engine=${autocompleteEngine}`
    );

    let formattedRes = [];

    if (["duckduckgo", "google", "brave"].includes(autocompleteEngine)) {
      formattedRes = res?.data?.[1]?.slice(0, 5) || [];
    }

    if (["qwant"].includes(autocompleteEngine)) {
      formattedRes =
        res?.data?.items
          ?.map((item: { value: string }) => item.value)
          ?.slice(0, 5) || [];
    }

    return formattedRes as string[];
  };

  return useSWRMutation("autocomplete-results", fetcher);
};

export default useAutocompleteSWR;
