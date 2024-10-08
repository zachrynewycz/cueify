import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-av";
import { Song } from "./types";

export const generateId = () => Math.floor(10000 + Math.random() * 90000).toString();

export async function pickAudioFile(): Promise<Song[]> {
  const files = await DocumentPicker.getDocumentAsync({ type: "audio/*", multiple: true });
  const data: Song[] = [];

  if (files.assets && files.assets.length > 0) {
    const promises = files.assets.map(async (file) => {
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: file.uri });

      const status = await sound.getStatusAsync();

      if (status.isLoaded && status.durationMillis) {
        data.push({
          id: generateId(),
          path: file.uri,
          title: file.name.slice(0, -4),
          duration: status.durationMillis,
          start_at: 0,
          created_at: new Date(),
        });
      }

      await sound.unloadAsync();
    });

    await Promise.allSettled(promises);
  }

  return data;
}

export const formatTime = (milliseconds?: number | null) => {
  if (milliseconds === null || milliseconds === undefined) return;

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Ensure seconds are always shown as two digits (e.g., 3:04 instead of 3:4)
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
};
