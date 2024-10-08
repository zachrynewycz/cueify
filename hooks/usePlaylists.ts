import { useEffect, useState } from "react";
import { getParsedStorageData } from "@/utils/storage";
import { Playlist } from "@/utils/types";

interface Response {
  playlists: Playlist;
  refetch: () => void;
}

export const usePlaylists = (): Response => {
  const [playlists, setPlaylists] = useState<Playlist>({});

  const fetchPlaylist = async () => {
    const data = await getParsedStorageData("playlists");
    setPlaylists(data);
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return { playlists, refetch: fetchPlaylist };
};
