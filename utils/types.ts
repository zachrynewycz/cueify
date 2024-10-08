export interface Playlist {
  [key: string]: Song[];
}

export interface Hotkeys {
  [key: string]: Song[];
}

export interface Song {
  id: string;
  path: string;
  start_at: number;
  duration: number;
  title: string;
  created_at: Date;
}

export type ModalTypes =
  | "ADD_SONG"
  | "CREATE_PLAYLIST"
  | "CREATE_HOTKEY"
  | "DELETE_HOTKEY"
  | "ADD_SONGS_TO_PLAYLIST"
  | "ADD_SONGS_TO_HOTKEY"
  | "DELETE_PLAYLIST"
  | "EDIT_SONG"
  | "DELETE_SONGS_FROM_HOTKEY"
  | "DELETE_SONGS_FROM_PLAYLIST";
