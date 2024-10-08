import { useEffect, useState } from "react";
import { getParsedStorageData } from "@/utils/storage";
import { Playlist, Song } from "@/utils/types";

interface Response {
  songs: Song[];
  refetch: (name: string) => void;
}

export const usePlaylist = (name: string): Response => {
  const [songs, setSongs] = useState<Song[]>([]);

  const fetchPlaylist = async (name: string) => {
    const data: Playlist = await getParsedStorageData("playlists");
    const sortedSongs = data[name].sort((a, b) => a.title.localeCompare(b.title));
    setSongs(sortedSongs);
  };

  useEffect(() => {
    fetchPlaylist(name);
  }, []);

  return { songs, refetch: fetchPlaylist };
};
