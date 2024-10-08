import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { Song } from "@/utils/types";
import { addSongToPlaylist, getParsedStorageData } from "@/utils/storage";
import { usePlaylists } from "@/hooks/usePlaylists";
import { useModal } from "@/context/ModalProvider";
import { useToastContext } from "@/context/ToastProvider";

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
import { Heading } from "../ui/heading";
import { Checkbox, CheckboxIndicator, CheckboxLabel } from "../ui/checkbox";
import { Text } from "../ui/text";
import { Button, ButtonText } from "../ui/button";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import { ChevronDown } from "react-native-feather";

const AddToPlaylistModal = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");

  const { playlists } = usePlaylists();
  const { openedModal, closeModal } = useModal();
  const { createToast } = useToastContext();

  useEffect(() => {
    const fetchSongs = async () => {
      const data: Song[] = await getParsedStorageData("songs");
      setSongs(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    };
    fetchSongs();
  }, []);

  const onCheckboxChange = (isSelected: boolean, song: Song) => {
    if (isSelected) {
      setSelectedSongs((prev) => [...prev, song]);
      return;
    }
    setSelectedSongs((prev) => [...prev].filter(({ id }) => id === song.id));
  };

  const onSubmit = () => {
    selectedSongs.map(async (song) => {
      await addSongToPlaylist(selectedPlaylist, song);
    });
    createToast(`Added ${songs.length} Songs To ${selectedPlaylist}`);
    closeModal();
  };

  if (openedModal !== "ADD_SONGS_TO_PLAYLIST") return null;

  return (
    <Center>
      <Modal isOpen size="lg" onClose={() => setSelectedSongs([])}>
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <Heading>Add Songs To Playlist</Heading>
          </ModalHeader>

          <ModalBody>
            {/* PLAYLIST SELECTION */}
            <Select onValueChange={(value) => setSelectedPlaylist(value)}>
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

            {selectedPlaylist && (
              <>
                <Text className="mt-5 mb-3 font-bold">{selectedSongs.length} Selected Songs:</Text>

                <ScrollView>
                  {songs.map((song, idx) => (
                    <Checkbox
                      size="md"
                      key={idx}
                      value=""
                      className="my-1"
                      onChange={(isSelected) => onCheckboxChange(isSelected, song)}
                    >
                      <CheckboxIndicator />
                      <CheckboxLabel>{song.title}</CheckboxLabel>
                    </Checkbox>
                  ))}
                </ScrollView>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" action="secondary" onPress={closeModal}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button disabled={!selectedSongs.length} onPress={onSubmit}>
              <ButtonText>Submit</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default AddToPlaylistModal;
