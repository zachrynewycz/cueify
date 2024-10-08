import { useEffect, useState } from "react";
import { Button, ButtonText } from "../ui/button";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import { deleteSongFromHotkey } from "@/utils/storage";
import { useModal } from "@/context/ModalProvider";
import { Center } from "../ui/center";
import { Heading } from "../ui/heading";
import { useToastContext } from "@/context/ToastProvider";
import { Song } from "@/utils/types";
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
import { useHotkeys } from "@/hooks/useHotkeys";
import { ChevronDown } from "react-native-feather";

const DeleteSongFromHotkeyModal = () => {
  const [selectedHotkey, setSelectedHotkey] = useState<string>("");
  const [songToRemove, setSongToRemove] = useState<string>("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  const { openedModal, closeModal } = useModal();
  const { createToast } = useToastContext();
  const { hotkeys } = useHotkeys();

  useEffect(() => {
    const found = hotkeys.find(({ section }) => section === selectedHotkey);
    if (!found) return;
    setFilteredSongs(found.songs);
  }, [selectedHotkey]);

  const onSubmit = async () => {
    if (!songToRemove) return;
    await deleteSongFromHotkey(selectedHotkey, songToRemove);
    createToast("Sucessfully Deleted From Hotkey");
    closeModal();
  };

  if (openedModal !== "DELETE_SONGS_FROM_HOTKEY") return null;

  return (
    <Center>
      <Modal isOpen size="md">
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <Heading>Delete Songs From Hotkey</Heading>
          </ModalHeader>

          <ModalBody>
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

                  {hotkeys.map((key, idx) => (
                    <SelectItem key={idx} label={key.section} value={key.section} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>

            <Select className="mt-5" onValueChange={(value) => setSongToRemove(value)}>
              <SelectTrigger variant="outline" size="lg">
                <SelectInput placeholder="Choose Song" />
                <SelectIcon className="mr-3 absolute right-0" as={ChevronDown} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>

                  {filteredSongs.map((song, idx) => (
                    <SelectItem key={idx} label={song.title} value={song.id} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" action="secondary" onPress={closeModal}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button disabled={!selectedHotkey} onPress={onSubmit}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default DeleteSongFromHotkeyModal;
