import { useState } from "react";
import { Song } from "@/utils/types";
import { useModal } from "@/context/ModalProvider";
import { useToastContext } from "@/context/ToastProvider";
import { Center } from "../ui/center";
import { Heading } from "../ui/heading";
import { Button, ButtonText } from "../ui/button";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import { deleteSong, updateSong } from "@/utils/storage";
import { TextInput } from "react-native";
import { Text } from "../ui/text";
import { formatTime } from "@/utils";
import { useRouter } from "expo-router";

interface Props {
  song: Song;
  refetch: () => void;
}

const EditSongModal = ({ song, refetch }: Props) => {
  const router = useRouter();
  const [editedSong, setEditedSong] = useState<Song>(song);
  const [startTime, setStartTime] = useState<string>(formatTime(song?.start_at) || "0:00");

  const { openedModal, closeModal, params } = useModal();
  const { createToast } = useToastContext();

  const onSubmit = async () => {
    const parsedTime = parseTime(startTime);

    if (isNaN(parsedTime) || !isValidTimeFormat(startTime)) {
      createToast("Invalid start time format. Use mm:ss.");
      return;
    }

    await updateSong({ ...editedSong, start_at: parsedTime });
    createToast(`Updated ${song.title}`);
    refetch();
    closeModal();
  };

  const onDelete = async () => {
    closeModal();
    router.push("/");
    createToast("Deleted Song.");
    await deleteSong(song.id);
  };

  // Parse the mm:ss string back into milliseconds
  const parseTime = (timeString: string): number => {
    const [minutes, seconds] = timeString.split(":").map(Number);
    if (isNaN(minutes) || isNaN(seconds)) return NaN;
    return (minutes * 60 + seconds) * 1000;
  };

  // Full validation for mm:ss format (for submission)
  const isValidTimeFormat = (time: string) => {
    const timePattern = /^\d{1,2}:\d{2}$/; // Valid mm:ss format
    return timePattern.test(time);
  };

  // Allow typing and deletion without immediate validation
  const handleTimeChange = (text: string) => {
    // Allow partial or empty input while typing
    setStartTime(text);
  };

  if (openedModal !== "EDIT_SONG" || params !== song.id) return null;

  return (
    <Center>
      <Modal isOpen size="lg">
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <Heading>Edit Song</Heading>
          </ModalHeader>

          <ModalBody>
            <Text className="mb-1">Title</Text>
            <TextInput
              placeholder="Enter name..."
              style={{ borderRadius: 4, borderWidth: 0.5, paddingLeft: 10, paddingVertical: 3 }}
              value={editedSong?.title}
              onChangeText={(text) => setEditedSong((prev) => ({ ...prev, title: text }))}
            />

            <Text className="mt-5 mb-1">Start Time</Text>
            <TextInput
              keyboardType="numeric"
              value={startTime}
              style={{ borderRadius: 4, borderWidth: 0.5, paddingLeft: 10, paddingVertical: 3 }}
              onChangeText={handleTimeChange}
              placeholder="mm:ss"
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="solid" action="negative" onLongPress={onDelete}>
              <ButtonText>Delete</ButtonText>
            </Button>
            <Button variant="outline" action="secondary" onPress={closeModal}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button onPress={onSubmit}>
              <ButtonText>Update</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default EditSongModal;
