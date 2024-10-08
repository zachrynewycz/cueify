import { Song as SongType } from "@/utils/types";
import { useAudioPlayer } from "@/context/AudioProvider";
import { Center } from "../ui/center";
import { Music } from "react-native-feather";
import { HStack } from "../ui/hstack";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import { View } from "react-native";
import { useModal } from "@/context/ModalProvider";
import EditSongModal from "../Modals/EditSong";

interface Props {
  song: SongType;
  playlistName?: string;
  refetch: () => void;
}

const Song = ({ song, playlistName, refetch }: Props) => {
  const { playAudio } = useAudioPlayer();
  const { openModal, setParams } = useModal();

  const onPress = async () => await playAudio(song, playlistName);
  const onLongPress = (id: string) => {
    openModal("EDIT_SONG");
    setParams(id);
  };

  return (
    <Pressable className="px-4 mt-1 active:bg-neutral-50" onPress={onPress} onLongPress={() => onLongPress(song.id)}>
      <EditSongModal song={song} refetch={refetch} />

      <HStack className="items-center py-2" space="lg">
        <Center className="bg-neutral-200 rounded-md p-3.5 w-fit ">
          <Music stroke="#a3a3a3" className="bg-neutral-200" width={22} height={22} />
        </Center>

        <View className="border-b-[0.5px] pt-2 w-full h-full" style={{ borderColor: "#a3a3a3" }}>
          <Text className="text-xl truncate text-black mb-2">{song.title}</Text>
        </View>
      </HStack>
    </Pressable>
  );
};

export default Song;
