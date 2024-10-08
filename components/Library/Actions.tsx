import React, { ElementType, useState } from "react";
import { useModal } from "@/context/ModalProvider";
import { ModalTypes } from "@/utils/types";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetIcon,
  ActionsheetItem,
  ActionsheetItemText,
} from "../ui/actionsheet";
import { DownloadCloud, FilePlus, Delete, Compass } from "react-native-feather";

interface Action {
  label: string;
  type: ModalTypes;
  icon: ElementType;
}

const ACTIONS: Action[] = [
  { label: "Import Song", type: "ADD_SONG", icon: DownloadCloud },
  { label: "Create Playlist", type: "CREATE_PLAYLIST", icon: FilePlus },
  { label: "Create Hotkey", type: "CREATE_HOTKEY", icon: FilePlus },
  { label: "Add Songs To Playlist", type: "ADD_SONGS_TO_PLAYLIST", icon: FilePlus },
  { label: "Add Songs To Hotkey", type: "ADD_SONGS_TO_HOTKEY", icon: FilePlus },
  { label: "Delete Songs From Hotkey", type: "DELETE_SONGS_FROM_HOTKEY", icon: Delete },
  { label: "Delete Songs From Playlist", type: "DELETE_SONGS_FROM_PLAYLIST", icon: Delete },
  { label: "Delete Playlist", type: "DELETE_PLAYLIST", icon: Delete },
  { label: "Delete Hotkey", type: "DELETE_HOTKEY", icon: Delete },
];

const Actions = () => {
  const { openModal } = useModal();
  const [isActionsOpen, setIsActionsOpen] = useState<boolean>(false);

  const handleClose = () => setIsActionsOpen(false);

  const handleActionPress = (modalType: ModalTypes) => {
    openModal(modalType);
    handleClose();
  };

  return (
    <>
      <Button
        style={{ backgroundColor: "#0e7490" }}
        className="rounded-md mx-3 h-12"
        onPress={() => setIsActionsOpen(true)}
      >
        <ButtonIcon as={Compass} size="md" className="mr-2" />
        <ButtonText>Actions</ButtonText>
      </Button>

      <Actionsheet isOpen={isActionsOpen} onClose={handleClose}>
        <ActionsheetBackdrop />

        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          {ACTIONS.map(({ label, type, icon }) => (
            <ActionsheetItem key={label} onPress={() => handleActionPress(type)}>
              <ActionsheetIcon as={icon} />
              <ActionsheetItemText>{label}</ActionsheetItemText>
            </ActionsheetItem>
          ))}
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};

export default Actions;
