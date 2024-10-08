import { useState } from "react";
import { Button, ButtonText } from "../ui/button";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import { deleteSongFromPlaylist } from "@/utils/storage";
import { useModal } from "@/context/ModalProvider";
import { Center } from "../ui/center";
import { Heading } from "../ui/heading";
import { useToastContext } from "@/context/ToastProvider";
import { Playlist, Song } from "@/utils/types";
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
import { usePlaylist } from "@/hooks/usePlaylist";
import { ChevronDown } from "react-native-feather";

interface Props {
  playlists: Playlist;
  refetch: () => void;
}

const DeleteSongFromPlaylistModal = ({ playlists, refetch }: Props) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
  const [songToRemove, setSongToRemove] = useState<Song | null>(null);

  const { openedModal, closeModal } = useModal();
  const { createToast } = useToastContext();
  const { songs } = usePlaylist(selectedPlaylist);

  const onSubmit = async () => {
    if (!songToRemove) return;
    await deleteSongFromPlaylist(selectedPlaylist, songToRemove?.id);
    createToast("Sucessfully Deleted From Playlist");
    closeModal();
    refetch();
  };

  if (openedModal !== "DELETE_SONGS_FROM_PLAYLIST") return null;

  return (
    <Center>
      <Modal isOpen size="md">
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <Heading>Delete Songs From Playlist</Heading>
          </ModalHeader>

          <ModalBody>
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

            <Select
              className="mt-5"
              onValueChange={(value) => {
                const found = songs.find((song) => song.id === value);
                found && setSongToRemove(found);
              }}
            >
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

                  {songs?.map((song, idx) => <SelectItem key={idx} label={song.title} value={song.id} />)}
                </SelectContent>
              </SelectPortal>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" action="secondary" onPress={closeModal}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button disabled={!selectedPlaylist} onPress={onSubmit}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default DeleteSongFromPlaylistModal;
