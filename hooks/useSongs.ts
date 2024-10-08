import { useEffect, useState } from "react";
import { getParsedStorageData } from "@/utils/storage";
import { Song } from "@/utils/types";

interface Response {
  songs: Song[];
  refetch: () => void;
}

export const useSongs = (): Response => {
  const [songs, setSongs] = useState<Song[]>([]);

  const fetchSongs = async () => {
    const data: Song[] = await getParsedStorageData("songs");
    setSongs(data.sort((a, b) => a.title.localeCompare(b.title)));
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return { songs, refetch: fetchSongs };
};
