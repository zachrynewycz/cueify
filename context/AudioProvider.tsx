import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Audio } from "expo-av";
import { Playlist, Song } from "@/utils/types";
import { getParsedStorageData } from "@/utils/storage";

interface AudioPlayerContextType {
  playAudio: (song: Song, playlist?: string) => Promise<void>;
  pauseAudio: () => Promise<void>;
  changeVolume: (value: number) => Promise<void>;
  changePosition: (value: number) => Promise<void>;
  isPlaying: boolean;
  duration: number | null;
  position: number | null;
  volume: number;
  songName: string;
}

const config: AudioPlayerContextType = {
  playAudio: async () => {},
  pauseAudio: async () => {},
  changeVolume: async () => {},
  changePosition: async () => {},
  isPlaying: false,
  duration: 0,
  position: 0,
  volume: 0,
  songName: "Not Playing",
};

const AudioPlayerContext = createContext<AudioPlayerContextType>(config);

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [songName, setSongName] = useState<string>("Not Playing");

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playAudio = async (song: Song, playlistName?: string) => {
    if (sound) await sound.unloadAsync();

    // LOAD
    const newSound = new Audio.Sound();
    await newSound.loadAsync({ uri: song.path }, { positionMillis: song.start_at }, true);
    setSound(newSound);

    // PLAY
    await newSound.playAsync();
    setIsPlaying(true);

    newSound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.isLoaded) {
        setPosition(status.positionMillis);

        if (status.didJustFinish) {
          setIsPlaying(false);

          if (playlistName) {
            const playlist: Playlist = await getParsedStorageData("playlists");
            const currentPlaylist = playlist[playlistName];

            if (currentPlaylist) {
              const currentSongIndex = currentPlaylist.findIndex((plSong) => plSong.id === song.id);
              // If there is a next song in the playlist, play it
              if (currentSongIndex !== -1 && currentSongIndex < currentPlaylist.length - 1) {
                const nextSong = currentPlaylist[currentSongIndex + 1];
                await playAudio(nextSong, playlistName); // Play the next song
              }
            }
          }
        }
      }
    });

    const status = await newSound.getStatusAsync();

    if (status.isLoaded && status.durationMillis) {
      setDuration(status.durationMillis);
      setVolume(status.volume);
      setSongName(song.title);
    }
  };

  const fadeOut = async (duration: number, initialVolume: number) => {
    if (!sound) return;

    const fadeInterval = 50; // Interval between each volume change in ms
    const steps = duration / fadeInterval; // Total number of steps
    const fadeStep = initialVolume / steps; // Calculate how much volume decreases each step

    for (let i = 0; i < steps; i++) {
      const newVolume = Math.max(initialVolume - fadeStep * i, 0); // Gradually decrease volume
      await sound.setVolumeAsync(newVolume); // Set new volume level
      await new Promise((resolve) => setTimeout(resolve, fadeInterval)); // Wait for next step
    }

    await sound.setVolumeAsync(0);
  };

  const pauseAudio = async () => {
    if (!sound) return;

    try {
      const status = await sound.getStatusAsync();
      if (!status.isLoaded) {
        console.error("Cannot toggle playback because it is not loaded.");
        return;
      }

      const previousVolumeLevel = status.volume;

      if (isPlaying) {
        setIsPlaying(false);
        await fadeOut(500, previousVolumeLevel);
        await sound.pauseAsync();
        await sound.setVolumeAsync(previousVolumeLevel);
      } else {
        setIsPlaying(true);
        await sound.playAsync();
      }
    } catch (error) {
      console.error("Error toggling audio playback:", error);
    }
  };

  const changeVolume = async (value: number) => {
    if (!sound) return;
    await sound.setVolumeAsync(value);
    setVolume(value);
  };

  const changePosition = async (value: number) => {
    if (!sound) return;
    await sound.setPositionAsync(value);
    setPosition(value);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        playAudio,
        pauseAudio,
        changeVolume,
        changePosition,
        isPlaying,
        duration,
        position,
        volume,
        songName,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  return useContext(AudioPlayerContext);
};
