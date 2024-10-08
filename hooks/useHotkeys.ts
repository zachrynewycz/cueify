import { useEffect, useState } from "react";
import { getParsedStorageData } from "@/utils/storage";
import { Hotkeys, Song } from "@/utils/types";

interface Section {
  section: string;
  songs: Song[];
}

interface Response {
  hotkeys: Section[];
  refetch: () => void;
}

export const useHotkeys = (): Response => {
  const [hotkeys, setHotkeys] = useState<Section[]>([]);

  const fetchHotkeys = async () => {
    const data: Hotkeys = await getParsedStorageData("hotkeys");

    const payload = Object.entries(data).map(([key, value]) => ({
      section: key,
      songs: value,
    }));

    setHotkeys(payload);
  };

  useEffect(() => {
    fetchHotkeys();
  }, []);

  return { hotkeys, refetch: fetchHotkeys };
};
