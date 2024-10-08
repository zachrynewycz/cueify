import { useEffect, useState } from "react";
import { pickAudioFile } from "@/utils";
import { Button, ButtonText } from "../ui/button";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import { Song } from "@/utils/types";
import { usePlaylists } from "@/hooks/usePlaylists";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../ui/select";
import { Center } from "../ui/center";
import { addSong, addSongToHotkey, addSongToPlaylist } from "@/utils/storage";
import { useHotkeys } from "@/hooks/useHotkeys";
import { useModal } from "@/context/ModalProvider";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { useToastContext } from "@/context/ToastProvider";
import { ChevronDown } from "react-native-feather";

const AddSongModal = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
  const [selectedHotkey, setSelectedHotkey] = useState<string>("");

  const { playlists, refetch } = usePlaylists();
  const { openedModal, closeModal } = useModal();
  const { hotkeys } = useHotkeys();
  const { createToast } = useToastContext();

  useEffect(() => {
    refetch();
  }, [songs]);

  if (openedModal !== "ADD_SONG") return null;

  const chooseFiles = async () => {
    const data = await pickAudioFile();
    setSongs(data);
  };

  const onSubmit = () => {
    songs.map(async (song) => {
      await addSong(song);
      if (selectedPlaylist) await addSongToPlaylist(selectedPlaylist, song);
      if (selectedHotkey) await addSongToHotkey(selectedHotkey, song);
    });

    createToast(`Sucessfully Added ${songs.length} Songs`);
    setSongs([]);
    closeModal();
  };

  return (
    <Center>
      <Modal isOpen>
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <Heading>Import Music</Heading>
          </ModalHeader>

          <ModalBody>
            <HStack className="items-center justify-between">
              <Button>
                <ButtonText onPress={chooseFiles}>Choose Files</ButtonText>
              </Button>
              <Text>
                {songs?.length} {songs.length === 1 ? "Song" : "Songs"} Selected
              </Text>
            </HStack>

            {/* PLAYLIST SELECTION */}
            <Select className="mt-5" onValueChange={(value) => setSelectedPlaylist(value)}>
              <SelectTrigger variant="outline" size="lg">
                <SelectInput placeholder="Choose Playlist" />
                <SelectIcon className="mr-3 absolute right-0" as={ChevronDown} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>

                  {Object.keys(playlists).map((playlist, idx) => (
                    <SelectItem key={idx} label={playlist} value={playlist} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>

            {/* HOTKEY SELECTION */}
            <Select className="mt-5" onValueChange={(value) => setSelectedHotkey(value)}>
              <SelectTrigger variant="outline" size="lg">
                <SelectInput placeholder="Choose Hotkey" />
                <SelectIcon className="mr-3 absolute right-0" as={ChevronDown} />
              </SelectTrigger>

              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>

                  {Object.keys(hotkeys).map((hotkey, idx) => (
                    <SelectItem key={idx} label={hotkey} value={hotkey} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" action="secondary" onPress={closeModal}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button disabled={!songs.length} onPress={onSubmit}>
              <ButtonText>Submit</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default AddSongModal;
