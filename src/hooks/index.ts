import { getAllMusics } from "@/api";
import { Music } from "@/types";
import { useEffect, useState } from "react";

export const useGetMusic = () => {
  const [data, setData] = useState<Music[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getMusics = async () => {
      try {
        const result = await getAllMusics();
        setData(result.data);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMusics();
  }, []);
  return { data, error, loading };
};
