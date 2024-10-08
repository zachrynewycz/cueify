import { View } from "react-native";
import { useHeaderTitle } from "@/hooks/useHeaderTitle";
import { usePlaylists } from "@/hooks/usePlaylists";

import PlaylistCards from "@/components/Playlist/Cards";
import Actions from "@/components/Library/Actions";
import ModalsByStatus from "@/components/Modals";
import Player from "@/components/Player";
import Navigation from "@/components/Library/Navigation";
import { VStack } from "@/components/ui/vstack";

export default function Page() {
  useHeaderTitle("Library");
  const playlist = usePlaylists();

  return (
    <View className="h-full">
      <ModalsByStatus {...playlist} />
      <PlaylistCards playlists={playlist.playlists} />
      <Actions />

      <VStack className="absolute bottom-0 w-full" space="lg">
        <Player />
        <Navigation />
      </VStack>
    </View>
  );
}
