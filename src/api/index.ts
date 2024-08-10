import { Music } from "@/types";
import mockMusic from "@/assets/data/music.json";
// import api from "@/lib/api";

// export const getAllMusics = (): Promise<{ data: Music[] }> =>
//   api.get("/tracks");

export const getAllMusics = (): Promise<Music[]> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(mockMusic as unknown as Music[]);
    }, 2000)
  );
