import { useState } from "react";
import { Button, ButtonText } from "../ui/button";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import { addHotkey } from "@/utils/storage";
import { useModal } from "@/context/ModalProvider";
import { FormControl, FormControlError, FormControlErrorText } from "../ui/form-control";
import { TextInput } from "react-native";
import { Center } from "../ui/center";
import { Heading } from "../ui/heading";
import { useToastContext } from "@/context/ToastProvider";
import { useHotkeys } from "@/hooks/useHotkeys";

const CreateHotkeyModal = () => {
  const [input, setInput] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const { hotkeys } = useHotkeys();
  const { openedModal, closeModal } = useModal();
  const { createToast } = useToastContext();

  const onSubmit = async () => {
    if (Object.keys(hotkeys).find((title) => title === input)) {
      setIsInvalid(true);
      return;
    }

    await addHotkey(input);
    createToast("Sucessfully Created Hotkey");
    closeModal();
  };

  if (openedModal !== "CREATE_HOTKEY") return null;

  return (
    <Center>
      <Modal isOpen size="md">
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <Heading>Create Hotkey</Heading>
          </ModalHeader>

          <ModalBody>
            <FormControl isInvalid={isInvalid} size="md">
              <TextInput
                placeholder="Enter name..."
                style={{ borderRadius: 4, borderWidth: 0.5, paddingLeft: 10, paddingVertical: 3 }}
                value={input}
                onChangeText={(text) => setInput(text)}
              />

              <FormControlError>
                <FormControlErrorText>You already have a hotkey named {input}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" action="secondary" onPress={closeModal}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button disabled={!input} onPress={onSubmit}>
              <ButtonText>Create</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default CreateHotkeyModal;
