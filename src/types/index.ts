type Artist = {
  id: string;
  name: string;
};
export type Music = {
  id: string;
  title: string;
  duration: number;
  artist: Artist;
  md5_image: string;
  preview: string;
  like?: boolean;
};
