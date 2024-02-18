import useFetch from "../use-fetch";
import { INominatimResults } from "@ts/nominatim.tyles";
import useSWRMutation from "swr/mutation";

const useNominatimSWR = () => {
  const { fetchData } = useFetch();

  const fetcher = (key: string, { arg }: { arg: string }) => {
    return fetchData(`${key}?q=${arg}`);
  };

  return useSWRMutation<INominatimResults[], any, any, string>(
    `/api/geocode`,
    fetcher,
    {}
  );
};

export default useNominatimSWR;
