import { useGetMusic } from "@/hooks";
import { Music } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import ListMusic from "./components/list-music";
import PlayMusic from "./components/play-music";
import { shuffleArray } from "@/utils";

const Home = () => {
  const { data, loading } = useGetMusic();
  const [musicData, setMusicData] = useState<Music[]>([]);
  const [currentMusic, setCurrentMusic] = useState<Music>();
  const [isPlaying, setIsPlaying] = useState(true);

  const audio = useMemo(
    () => new Audio(currentMusic?.preview),
    [currentMusic?.preview]
  );

  useEffect(() => {
    setMusicData(data);
    if (data.length > 0) {
      setCurrentMusic(data[0]);
      setIsPlaying(false);
    }
  }, [data]);

  const onLikeMusic = useCallback((id: string) => {
    setMusicData((prev) => {
      return prev.map((music) => {
        if (music.id === id) {
          return { ...music, like: !music.like };
        }
        return music;
      });
    });
  }, []);

  const onSelectMusic = useCallback(
    (music: Music) => {
      audio.pause();
      setCurrentMusic(music);
      setIsPlaying(true);
    },
    [audio]
  );

  const onReload = useCallback(() => {
    audio.pause();
    setCurrentMusic(musicData[0]);
  }, [musicData, audio]);

  const onRandom = useCallback(() => {
    setMusicData((prev) => shuffleArray(prev));
  }, []);

  const onNext = useCallback(() => {
    audio.pause();
    const index = musicData.findIndex((music) => music.id === currentMusic?.id);
    if (index === musicData.length - 1) return;
    setCurrentMusic(musicData[index >= 0 ? index + 1 : 0]);
    setIsPlaying(true);
  }, [currentMusic?.id, musicData, audio]);

  const onPrev = useCallback(() => {
    audio.pause();
    const index = musicData.findIndex((music) => music.id === currentMusic?.id);
    if (index <= 0) return;
    setCurrentMusic(musicData[index - 1]);
    setIsPlaying(true);
  }, [currentMusic?.id, musicData, audio]);

  const onPauseOrPlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (prev) {
        audio.pause();
      } else {
        audio.play();
      }
      return !prev;
    });
  }, [audio]);

  return (
    <div className="bg-sky-50 max-h-screen max-w-screen">
      <div className="grid grid-cols-5 gap-4 px-2">
        <div className="col-span-3 h-screen">
          <ListMusic
            loading={loading}
            musics={musicData}
            onClick={onSelectMusic}
            onLike={onLikeMusic}
            currentMusic={currentMusic}
          />
        </div>
        <div className="col-span-2">
          <PlayMusic
            count={musicData.length}
            currentMusic={currentMusic}
            onReload={onReload}
            onRandom={onRandom}
            onNext={onNext}
            onPrev={onPrev}
            musics={musicData}
            onPauseOrPlay={onPauseOrPlay}
            isPlaying={isPlaying}
            audio={audio}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
