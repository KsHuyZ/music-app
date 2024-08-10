import { Music } from "@/types";
import api from "@/lib/api";

export const getAllMusics = (): Promise<{ data: Music[] }> =>
  api.get("/tracks");
