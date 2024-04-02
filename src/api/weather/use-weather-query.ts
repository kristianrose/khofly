import useFetch from "../use-fetch";
import useSWRMutation from "swr/mutation";
import { OpenWeatherResponse } from "./types";

interface Args {
  lat: any;
  lon: any;
}

const API_URL = process.env.OPEN_WEATHER_URL;

const useWeatherSWR = () => {
  const { fetchData } = useFetch();

  // const searchParams = useSearchParams();
  // const q = (searchParams.get("q") as string) || "";

  const fetcher = (key: string, { arg }: { arg: Args }) => {
    const { lat, lon } = arg;
    return fetchData(
      `${key}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&apikey=${process.env.OPEN_WEATHER_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return useSWRMutation<OpenWeatherResponse, any, any, Args>(
    `${API_URL}`,
    fetcher,
    {}
  );
};

export default useWeatherSWR;
