import MusicCard from "@/pages/components/list-music/components/music-card";
import { Music } from "@/types";

interface ListMusicProps {
  loading: boolean;
  onLike: (id: string) => void;
  onClick: (id: Music) => void;
  musics: Music[];
  currentMusic?: Music;
}

const ListMusic = ({
  loading,
  onClick,
  onLike,
  musics,
  currentMusic,
}: ListMusicProps) => {
  return (
    <div className="flex flex-col space-y-4 max-h-screen">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Most popular</h1>
        <span className="text-gray-500">{musics.length} songs</span>
      </div>
      <div className="flex flex-col space-y-3 px-2 overflow-x-auto duration-150">
        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <MusicCard
              key={index}
              index={index}
              onLike={onLike}
              onClick={onClick}
            />
          ))}
        {musics.map((d, index) => (
          <MusicCard
            music={d}
            key={d.id}
            index={index}
            onLike={onLike}
            isPlay={currentMusic?.id === d.id}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ListMusic;
