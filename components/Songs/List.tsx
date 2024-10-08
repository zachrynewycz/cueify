import { FlatList } from "react-native";
import Song from "./Song";
import { Song as SongType } from "@/utils/types";

interface Props {
  songs: SongType[];
  playlistName?: string;
  refetch: () => void;
}

const SongList = ({ songs, playlistName, refetch }: Props) => {
  return (
    <FlatList
      className="bg-white"
      data={songs}
      keyExtractor={(item, idx) => idx.toString()}
      renderItem={({ item }) => <Song song={item} refetch={refetch} playlistName={playlistName} />}
      contentContainerStyle={{ paddingBottom: 20 }}
      removeClippedSubviews
    />
  );
};

export default SongList;
