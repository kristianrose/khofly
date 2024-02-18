import { useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

const CaramelldansenAudio = () => {
  const [searchParams] = useSearchParams();
  const audioRef = useRef<HTMLAudioElement>(null);

  const q = searchParams.get("q");

  useEffect(() => {
    if (q?.includes("caramelldansen")) {
      audioRef.current?.load();
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [q]);

  return (
    <audio
      ref={audioRef}
      id="khofly-audio-player"
      loop={true}
      preload="metadata"
      crossOrigin="anonymous"
      autoPlay={false}
    >
      <source
        id="mp3_src"
        src={"/assets/caramelldansen.mp3"}
        type="audio/mp3"
      ></source>
    </audio>
  );
};

export default CaramelldansenAudio;
