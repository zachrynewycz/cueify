import { useState } from "react";
import { Button, ButtonText } from "../ui/button";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import { deleteHotkey } from "@/utils/storage";
import { useHotkeys } from "@/hooks/useHotkeys";
import { useModal } from "@/context/ModalProvider";
import { Center } from "../ui/center";
import { Heading } from "../ui/heading";
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
import { ChevronDown } from "react-native-feather";

const DeleteHotkeyModal = () => {
  const [hotkeyToDelete, setHotkeyToDelete] = useState<string>("");

  const { openedModal, closeModal } = useModal();
  const { hotkeys } = useHotkeys();
  const { createToast } = useToastContext();

  const onSubmit = async () => {
    await deleteHotkey(hotkeyToDelete);
    createToast("Sucessfully Deleted Hotkey");
    closeModal();
  };

  if (openedModal !== "DELETE_HOTKEY") return null;

  return (
    <Center>
      <Modal isOpen size="md">
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <Heading>Delete Hotkey</Heading>
          </ModalHeader>

          <ModalBody>
            <Select onValueChange={(value) => setHotkeyToDelete(value)}>
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
            <Button disabled={!hotkeyToDelete} onPress={onSubmit}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default DeleteHotkeyModal;
