import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Music } from "@/types";
import { convertMinutesToTime } from "@/utils";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RefreshCcw,
  Shuffle,
} from "lucide-react";
import { memo, useEffect, useState } from "react";

interface PlayerMusicProps {
  count: number;
  currentMusic?: Music;
  onReload: () => void;
  onRandom: () => void;
  onNext: () => void;
  onPrev: () => void;
  musics: Music[];
  onPauseOrPlay: () => void;
  isPlaying: boolean;
  audio: HTMLAudioElement;
}

const PlayMusic = ({
  count,
  currentMusic,
  onRandom,
  onReload,
  onNext,
  onPrev,
  musics,
  onPauseOrPlay,
  isPlaying,
  audio,
}: PlayerMusicProps) => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const index = musics.findIndex((music) => music.id === currentMusic?.id);
    if (index === count - 1) return;
    if (time === (currentMusic?.duration ?? 0)) {
      onNext();
    }
    if (!isPlaying) {
      audio.pause();
      return;
    }
    audio.play().catch((error) => console.log(error));
    const timeoutId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timeoutId);
  }, [
    count,
    currentMusic?.duration,
    currentMusic?.id,
    isPlaying,
    musics,
    onNext,
    time,
    audio,
  ]);

  useEffect(() => {
    if (audio) {
      setTime(0);
      audio.play();
    }
  }, [currentMusic, audio]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Now Playing</h1>
        <span className="text-gray-500">{count} Items on the list</span>
      </div>
      <div className="bg-white rounded-md p-4 shadow-2xl">
        <div className="bg-white rounded-md p-2 shadow-2xl">
          <div className="p-2 flex flex-col items-center space-y-4">
            <div className="relative">
              {currentMusic ? (
                <img
                  src={`https://e-cdns-images.dzcdn.net/images/cover/${currentMusic.md5_image}/500x500.jpg`}
                  className={cn(
                    "w-44 h-44 rounded-full",
                    isPlaying ? "animate-spin-slow" : ""
                  )}
                />
              ) : (
                <Skeleton className="w-44 h-44 rounded-full" />
              )}
              <div className="absolute bg-white p-4 rounded-full inset-16" />
            </div>
            {currentMusic ? (
              <p className="font-bold text-2xl">{currentMusic?.title}</p>
            ) : (
              <Skeleton className="w-48 h-7" />
            )}
            {currentMusic ? (
              <p className=" text-gray-500">{currentMusic?.artist.name}</p>
            ) : (
              <Skeleton className="w-24 h-5" />
            )}
            <Slider
              className="h-2"
              value={[(time / (currentMusic?.duration ?? 1)) * 100]}
              onValueChange={(value) => {
                const currentTime = Math.floor(
                  ((currentMusic?.duration ?? 1) / 100) * value[0]
                );
                setTime(currentTime);
                audio.currentTime = currentTime;
              }}
            />
            <div className="flex items-center justify-between w-full">
              <p className="text-gray-500">{convertMinutesToTime(time)}</p>
              <p className="text-gray-500">
                -{convertMinutesToTime((currentMusic?.duration ?? 0) - time)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="p-2 hover:bg-gray-300 rounded-md" onClick={onReload}>
            <RefreshCcw className="text-gray-500 cursor-pointer" />
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="p-2 hover:bg-gray-300 rounded-md cursor-pointer"
              onClick={onPrev}
            >
              <ChevronLeft className="text-gray-500" />
            </div>
            <div
              className="bg-gray-300 rounded-full p-2 cursor-pointer"
              onClick={onPauseOrPlay}
            >
              <div className="bg-white shadow-xl p-2 rounded-full">
                {isPlaying ? (
                  <Pause fill="#3b82f6" stroke="#3b82f6 " />
                ) : (
                  <Play fill="#3b82f6" stroke="#3b82f6 " />
                )}
              </div>
            </div>
            <div
              className="p-2 hover:bg-gray-300 rounded-md cursor-pointer"
              onClick={onNext}
            >
              <ChevronRight className="text-gray-500" />
            </div>
          </div>
          <div
            className="p-2 hover:bg-gray-300 rounded-md cursor-pointer"
            onClick={onRandom}
          >
            <Shuffle className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PlayMusic);
