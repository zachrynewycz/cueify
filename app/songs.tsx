import Navigation from "@/components/Library/Navigation";
import Player from "@/components/Player";
import SongList from "@/components/Songs/List";
import { VStack } from "@/components/ui/vstack";
import { useHeaderTitle } from "@/hooks/useHeaderTitle";
import { useSongs } from "@/hooks/useSongs";
import { View } from "react-native";

export default function SongPage() {
  useHeaderTitle("Songs");
  const songs = useSongs();

  return (
    <View className="h-full">
      <SongList {...songs} />

      <VStack className="absolute bottom-0 w-full" space="lg">
        <Player />
        <Navigation />
      </VStack>
    </View>
  );
}
