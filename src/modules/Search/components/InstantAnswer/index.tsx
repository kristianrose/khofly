import { useResponsive } from "@hooks/use-responsive";

import CoinFlip from "./CoinFilp";
import Calculator from "./Calculator";
import Lyrics from "./Lyrics";
import UUID from "./UUID";
import Timer from "./Timer";
import { shouldDisplayIA } from "./utils";
import { useGeneralStore } from "@store/general";
import { useSearchParams } from "@remix-run/react";
import Weather from "./Weather";
import Stopwatch from "./Stopwatch";

const InstantAnswer = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const isXl = useResponsive("min", "lg");

  const { useInstantAnswers } = useGeneralStore((state) => ({
    useInstantAnswers: state.useInstantAnswers,
  }));

  // Instant Answers disabled in settings
  if (!useInstantAnswers) return null;

  // Instant answer - Calculator WIP
  if (shouldDisplayIA(query, ["calc", "calculator"])) return <Calculator />;

  // Instant answer - CoinFlip
  if (shouldDisplayIA(query, ["coinflip", "coin flip"])) return <CoinFlip />;

  // Instant answer - Lyrics by Genius
  if (shouldDisplayIA(query, ["lyrics"]) && !isXl) return <Lyrics />;

  // Instant answer - Stopwatch
  if (shouldDisplayIA(query, ["stopwatch"])) return <Stopwatch />;

  // Instant answer - Timer WIP
  if (shouldDisplayIA(query, ["timer"])) return <Timer />;

  // Instant answer - UUID
  if (shouldDisplayIA(query, ["uuid"])) return <UUID />;

  // Instant answer - Weather by OpenWeather
  if (
    shouldDisplayIA(query, ["weather", "forecast"]) &&
    !!process.env.OPEN_WEATHER_API_KEY
  )
    return <Weather />;

  // Instant answer - Translate WIP
  //if (shouldDisplayIA(query, ["translate"])) return <Translate />;

  // Instant answer - todo
  // Instant answer - Currency convert
  // Instant answer - Generate password
  // Instant answer - Sport scores
  // Instant answer - Time around the world

  // Instant answer - low prio
  // Instant answer - Lorem ipsum generator

  return null;
};

export default InstantAnswer;
