import useFetch from "../use-fetch";
import useSWRMutation from "swr/mutation";

const useLyricsSWR = () => {
  const { fetchData } = useFetch();

  const fetcher = (key: string, { arg }: { arg: string }) => {
    return fetchData(`${key}?q=${encodeURIComponent(arg)}`, {
      headers: {
        // Authorization: `Bearer ${window.ENV.GENIUS_ACCESS_TOKEN}`,
        Authorization: `Bearer`,
      },
    });
  };

  return useSWRMutation<
    { lyrics: string; title: string; artist: string; image: string },
    any,
    any,
    string
  >(`/api/lyrics`, fetcher, {});
};

export default useLyricsSWR;
