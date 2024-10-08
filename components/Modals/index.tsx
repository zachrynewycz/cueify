import { useModal } from "@/context/ModalProvider";

import AddSongModal from "@/components/Modals/AddSong";
import AddToPlaylistModal from "@/components/Modals/AddToPlaylist";
import AddToHotkeyModal from "@/components/Modals/AddToHotkey";
import CreateHotkeyModal from "@/components/Modals/CreateHotkey";
import CreatePlaylistModal from "@/components/Modals/CreatePlaylist";
import DeletePlaylistModal from "@/components/Modals/DeletePlaylist";
import DeleteHotkeyModal from "@/components/Modals/DeleteHotkey";
import EditSongModal from "./EditSong";
import DeleteSongFromHotkeyModal from "./DeleteSongFromHotkey";
import DeleteSongFromPlaylistModal from "./DeleteSongFromPlaylist";

const ModalsByStatus = (props: any) => {
  const { openedModal } = useModal();

  switch (openedModal) {
    case "ADD_SONG":
      return <AddSongModal />;
    case "CREATE_PLAYLIST":
      return <CreatePlaylistModal {...props} />;
    case "DELETE_PLAYLIST":
      return <DeletePlaylistModal {...props} />;
    case "CREATE_HOTKEY":
      return <CreateHotkeyModal />;
    case "DELETE_HOTKEY":
      return <DeleteHotkeyModal />;
    case "ADD_SONGS_TO_PLAYLIST":
      return <AddToPlaylistModal />;
    case "ADD_SONGS_TO_HOTKEY":
      return <AddToHotkeyModal />;
    case "DELETE_SONGS_FROM_HOTKEY":
      return <DeleteSongFromHotkeyModal />;
    case "DELETE_SONGS_FROM_PLAYLIST":
      return <DeleteSongFromPlaylistModal {...props} />;
    default:
      return null;
  }
};

export default ModalsByStatus;
