import { useState } from "react";
import { Button, ButtonText } from "../ui/button";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import { deletePlaylist } from "@/utils/storage";
import { useModal } from "@/context/ModalProvider";
import { Center } from "../ui/center";
import { Heading } from "../ui/heading";
import { useToastContext } from "@/context/ToastProvider";
import { Playlist } from "@/utils/types";
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
import { ChevronDown } from "react-native-feather";

interface Props {
  playlists: Playlist;
  refetch: () => void;
}

const DeletePlaylistModal = ({ playlists, refetch }: Props) => {
  const [playlistToDelete, setPlaylistToDelete] = useState<string>("");

  const { openedModal, closeModal } = useModal();
  const { createToast } = useToastContext();

  const onSubmit = async () => {
    await deletePlaylist(playlistToDelete);
    createToast("Sucessfully Deleted Playlist");
    closeModal();
    refetch();
  };

  if (openedModal !== "DELETE_PLAYLIST") return null;

  return (
    <Center>
      <Modal isOpen size="md">
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <Heading>Delete Playlist</Heading>
          </ModalHeader>

          <ModalBody>
            <Select onValueChange={(value) => setPlaylistToDelete(value)}>
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
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" action="secondary" onPress={closeModal}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button disabled={!playlistToDelete} onPress={onSubmit}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default DeletePlaylistModal;
