import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { Song } from "@/utils/types";
import { addSongToHotkey, getParsedStorageData } from "@/utils/storage";
import { useModal } from "@/context/ModalProvider";
import { useHotkeys } from "@/hooks/useHotkeys";
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

const AddToHotkeyModal = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [selectedHotkey, setSelectedHotkey] = useState<string>("");

  const { hotkeys } = useHotkeys();
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
    setSelectedSongs((prev) => (isSelected ? [...prev, song] : prev.filter(({ id }) => id !== song.id)));
  };

  const onSubmit = () => {
    selectedSongs.map(async (song) => {
      await addSongToHotkey(selectedHotkey, song);
    });
    createToast(`Added ${songs.length} Songs To ${selectedHotkey}`);
  };

  if (openedModal !== "ADD_SONGS_TO_HOTKEY") return null;

  return (
    <Center>
      <Modal isOpen size="lg" onClose={() => setSelectedSongs([])}>
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <Heading>Add Songs To Hotkey</Heading>
          </ModalHeader>

          <ModalBody>
            {/* PLAYLIST SELECTION */}
            <Select onValueChange={(value) => setSelectedHotkey(value)}>
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

                  {hotkeys.map((value, idx) => (
                    <SelectItem key={idx} label={value.section} value={value.section} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>

            {selectedHotkey && (
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

export default AddToHotkeyModal;
