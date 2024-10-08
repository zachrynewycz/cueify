import Navigation from "@/components/Library/Navigation";
import Player from "@/components/Player";
import SongList from "@/components/Songs/List";
import { VStack } from "@/components/ui/vstack";
import { useHeaderTitle } from "@/hooks/useHeaderTitle";
import { useSongs } from "@/hooks/useSongs";
import { Song } from "@/utils/types";
import { useState } from "react";
import { TextInput, View } from "react-native";

export default function SearchPage() {
  useHeaderTitle("Search");
  const { songs } = useSongs();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  const onChange = (text: string) => {
    setSearchQuery(text);
    setFilteredSongs(text ? songs.filter((song) => song.title.toLowerCase().includes(text.toLowerCase())) : []);
  };

  return (
    <View className="h-full">
      <TextInput
        placeholder="Search..."
        style={{ borderRadius: 4, borderWidth: 2, paddingLeft: 10, paddingVertical: 3, borderColor: "#e7e5e4" }}
        value={searchQuery}
        onChangeText={(text) => onChange(text)}
      />

      <SongList songs={filteredSongs} />

      <VStack className="absolute bottom-0 w-full" space="lg">
        <Player />
        <Navigation />
      </VStack>
    </View>
  );
}
