import { Music } from "@/types";
import { convertMinutesToTime } from "@/utils";
import { Heart, Play } from "lucide-react";
import { Skeleton } from "../../../../components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MusicCardProps {
  index: number;
  music?: Music;
  onLike: (id: string) => void;
  onClick: (id: Music) => void;
  isPlay?: boolean;
}

const MusicCard = ({
  index,
  music,
  onLike,
  isPlay,
  onClick,
}: MusicCardProps) => {
  return (
    <div
      className={cn(
        "bg-white w-full rounded-sm shadow-md p-2 px-4 cursor-pointer hover:bg-slate-200 duration-150",
        isPlay ? "bg-slate-200" : ""
      )}
      key={music ? music.id : Math.random()}
      onClick={() => music && onClick(music)}
    >
      <div className="justify-between flex items-center">
        <div className="flex gap-x-4 items-center w-72">
          <p className="font-semibold">
            {index < 9 ? "0" : ""}
            {index + 1}
          </p>
          {music ? (
            <img
              src={`https://e-cdns-images.dzcdn.net/images/cover/${music.md5_image}/500x500.jpg`}
              className="w-10 h-10 rounded-md"
            />
          ) : (
            <Skeleton className="w-10 h-10 rounded-md" />
          )}
          <Play
            className={cn(
              "w-4 h-4",
              isPlay ? "text-blue-500" : "text-gray-500"
            )}
            fill={isPlay ? "#3b82f6" : "#6b7280"}
          />
          <div className="w-40">
            {music ? (
              <p className="font-semibold truncate">{music.title}</p>
            ) : (
              <Skeleton className="w-40 h-5" />
            )}
          </div>
        </div>
        {music ? (
          <p className="text-gray-500 w-40">{music.artist.name}</p>
        ) : (
          <Skeleton className="w-40 h-5" />
        )}
        {music ? (
          <p className="text-gray-500">
            {convertMinutesToTime(music.duration)}
          </p>
        ) : (
          <Skeleton className="w-20 h-5" />
        )}

        <Heart
          fill={music?.like ? "#ef4444" : "#6b7280"}
          stroke={music?.like ? "#ef4444" : "#6b7280"}
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            return music && onLike(music?.id);
          }}
        />
      </div>
    </div>
  );
};

export default MusicCard;
