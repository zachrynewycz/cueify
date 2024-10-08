import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePlaylist } from "@/hooks/usePlaylist";
import { Text } from "@/components/ui/text";
import { useHeaderTitle } from "@/hooks/useHeaderTitle";
import SongList from "@/components/Songs/List";
import Player from "@/components/Player";

export default function Playlist() {
  const { id }: { id: string } = useLocalSearchParams();

  useHeaderTitle(id);
  const { songs, refetch } = usePlaylist(id);

  if (!songs.length) return <Text className="text-center mt-10 text-xl">No songs in this playlist.</Text>;

  return (
    <View className="h-full pb-10">
      <SongList songs={songs} refetch={() => refetch(id)} playlistName={id} />
      <Player />
    </View>
  );
}
