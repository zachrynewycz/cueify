import AsyncStorage from "@react-native-async-storage/async-storage";
import { Hotkeys, Playlist, Song } from "./types";

// THIS WILL BE NON ASYNC AS WE WILL BE USING IN HOOKS
export function getParsedStorageData(key: "songs" | "hotkeys" | "playlists"): Promise<any> {
  return AsyncStorage.getItem(key)
    .then((data) => (data ? JSON.parse(data) : []))
    .catch((error) => {
      console.error("Failed to retrieve data:", error);
      return [];
    });
}

async function updateStorageData(key: string, newData: any): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(newData));
}

// ======================= DELETE =======================
export async function deleteSong(id: string) {
  try {
    // REMOVE SONG
    const previousSongs: Song[] = await getParsedStorageData("songs");
    const updated = previousSongs.filter((song: Song) => song.id !== id);
    await updateStorageData("songs", updated);

    // REMOVE SONG FROM HOTKEYS
    const hotkeys: Hotkeys = await getParsedStorageData("hotkeys");

    const updatedHotkeys = Object.entries(hotkeys).reduce((acc, [key, value]) => {
      const filteredSongs = value.filter((song: Song) => song.id !== id);
      if (filteredSongs.length > 0) acc[key] = filteredSongs;

      return acc;
    }, {} as Hotkeys);

    await updateStorageData("hotkeys", updatedHotkeys);

    // REMOVE SONG FROM PLAYLIST
    const playlists: Playlist = await getParsedStorageData("playlists");

    const updatedPlaylists = Object.entries(playlists).reduce((acc, [key, value]) => {
      const filteredSongs = value.filter((song: Song) => song.id !== id);
      if (filteredSongs.length > 0) acc[key] = filteredSongs;

      return acc;
    }, {} as Playlist);

    await updateStorageData("playlists", updatedPlaylists);
  } catch (e) {
    console.error("Failed to delete song:", e);
  }
}

export async function deletePlaylist(name: string) {
  try {
    const previousPlaylist: Playlist = await getParsedStorageData("playlists");
    const updated = Object.entries(previousPlaylist).filter(([key]) => key !== name);
    await updateStorageData("playlists", updated);
  } catch (e) {
    console.error("Failed to delete song:", e);
  }
}

export async function deleteHotkey(name: string) {
  try {
    const previousHotkeys: Playlist = await getParsedStorageData("hotkeys");
    delete previousHotkeys[name];
    await updateStorageData("hotkey", previousHotkeys);
  } catch (e) {
    console.error("Failed to delete hotkey:", e);
  }
}

export async function deleteSongFromPlaylist(name: string, id: string) {
  try {
    const previousPlaylist: Playlist = await getParsedStorageData("playlists");

    const updated = {
      ...previousPlaylist,
      [name]: previousPlaylist[name].filter((song) => song.id !== id),
    };

    await updateStorageData("playlists", updated);
  } catch (e) {
    console.error("Failed to delete song from playlist:", e);
  }
}

export async function deleteSongFromHotkey(name: string, id: string) {
  try {
    const previousPlaylist: Playlist = await getParsedStorageData("hotkeys");

    const updated = {
      ...previousPlaylist,
      [name]: previousPlaylist[name].filter((song) => song.id !== id),
    };

    await updateStorageData("hotkeys", updated);
  } catch (e) {
    console.error("Failed to delete song from hotkey:", e);
  }
}

// ======================= ADD =======================
export async function addSong(song: Song) {
  try {
    const songs: Song[] = await getParsedStorageData("songs");
    const updated = [...songs, song];
    await updateStorageData("songs", updated);
  } catch (e) {
    console.error("Failed to add song:", e);
  }
}

export async function addPlaylist(name: string) {
  try {
    const playlists: Playlist = await getParsedStorageData("playlists");

    const updated = {
      ...playlists,
      [name]: [],
    };

    await updateStorageData("playlists", updated);
  } catch (e) {
    console.error("Failed to add playlist:", e);
  }
}

export async function addHotkey(name: string) {
  try {
    const hotkeys: Hotkeys = await getParsedStorageData("hotkeys");

    const updated = {
      ...hotkeys,
      [name]: [],
    };

    await updateStorageData("hotkeys", updated);
  } catch (e) {
    console.error("Failed to add hotkey:", e);
  }
}

export async function addSongToPlaylist(name: string, song: Song) {
  try {
    const playlists: Playlist = await getParsedStorageData("playlists");

    const updated = {
      ...playlists,
      [name]: [...playlists[name], song],
    };

    await updateStorageData("playlists", updated);
  } catch (e) {
    console.error("Failed to add song to playlist:", e);
  }
}

export async function addSongToHotkey(name: string, song: Song) {
  try {
    const hotkeys: Hotkeys = await getParsedStorageData("hotkeys");

    const updated = {
      ...hotkeys,
      [name]: [...hotkeys[name], song],
    };

    await updateStorageData("hotkeys", updated);
  } catch (e) {
    console.error("Failed to add song to hotkey:", e);
  }
}

// ======================= UPDATE =======================
export async function updateSong(updated_song: Song) {
  try {
    const previousSongs: Song[] = await getParsedStorageData("songs");
    await updateStorageData("songs", [...previousSongs.filter((song) => song.id !== updated_song.id), updated_song]);

    // Update playlists
    const previousPlaylists: Playlist = await getParsedStorageData("playlists");
    const updatedPlaylists: Playlist = {};
    for (const [playlistId, songs] of Object.entries(previousPlaylists)) {
      updatedPlaylists[playlistId] = songs.map((song) => (song.id === updated_song.id ? updated_song : song));
    }
    await updateStorageData("playlists", updatedPlaylists);

    // Update hotkeys
    const previousHotkeys: Hotkeys = await getParsedStorageData("hotkeys");
    const updatedHotkeys: Hotkeys = {};
    for (const [hotkeyId, songs] of Object.entries(previousHotkeys)) {
      updatedHotkeys[hotkeyId] = songs.map((song) => (song.id === updated_song.id ? updated_song : song));
    }
    await updateStorageData("hotkeys", updatedHotkeys);
  } catch (e) {
    console.error("Failed to update song:", e);
  }
}

export async function updatePlaylistName(old_name: string, new_name: string) {
  try {
    const previousPlaylist: Record<string, Song[]> = await getParsedStorageData("playlists");

    const updated = {
      ...previousPlaylist,
      [new_name]: previousPlaylist[old_name],
    };

    const filtered = Object.entries(updated).filter(([key]) => key !== old_name);

    await updateStorageData("playlists", filtered);
  } catch (e) {
    console.error("Failed to update playlist name:", e);
  }
}

export async function updateHotkeyName(old_name: string, new_name: string) {
  try {
    const previousHotkey: Record<string, Song[]> = await getParsedStorageData("hotkeys");

    const updated = {
      ...previousHotkey,
      [new_name]: previousHotkey[old_name],
    };

    const filtered = Object.entries(updated).filter(([key]) => key !== old_name);

    await updateStorageData("hotkeys", filtered);
  } catch (e) {
    console.error("Failed to update hotkey name:", e);
  }
}
