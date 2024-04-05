import useFetch from "../use-fetch";
import useSWRMutation from "swr/mutation";
import { OpenWeatherResponse } from "./types";

interface Args {
  lat: any;
  lon: any;
}

const useWeatherSWR = () => {
  const { fetchData } = useFetch();

  const fetcher = (key: string, { arg }: { arg: Args }) => {
    const { lat, lon } = arg;
    return fetchData(`${key}?lat=${lat}&lon=${lon}`, {
      method: "GET",
    });
  };

  return useSWRMutation<OpenWeatherResponse, any, any, Args>(
    `/api/weather`,
    fetcher,
    {}
  );
};

export default useWeatherSWR;
