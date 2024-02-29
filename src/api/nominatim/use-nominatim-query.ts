import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import { INominatimResults } from "@ts/nominatim.tyles";
import useSWRMutation from "swr/mutation";

const useNominatimSWR = () => {
  const { fetchData } = useFetch();
  const { domain } = useInstanceStore((state) => ({
    domain: state.nominatimDomain,
  }));

  const fetcher = (key: string, { arg }: { arg: string }) => {
    return fetchData(`${domain}/search?q=${arg}&format=jsonv2`);
  };

  return useSWRMutation<INominatimResults[], any, any, string>(
    `/api/geocode`,
    fetcher,
    {}
  );
};

export default useNominatimSWR;
