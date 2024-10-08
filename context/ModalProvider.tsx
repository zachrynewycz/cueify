import { createContext, useState, useContext, ReactNode } from "react";
import { ModalTypes } from "@/utils/types";

interface ModalContextType {
  openedModal: ModalTypes | null;
  params: any;
  setParams: (arg: any) => void;
  openModal: (type: ModalTypes) => void;
  closeModal: () => void;
}

const config: ModalContextType = {
  openedModal: null,
  params: null,
  setParams: () => {},
  openModal: () => {},
  closeModal: () => {},
};

const ModalContext = createContext<ModalContextType>(config);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [openedModal, setOpenedModal] = useState<ModalTypes | null>(null);
  const [params, setParams] = useState<any>();

  const openModal = (type: ModalTypes) => setOpenedModal(type);
  const closeModal = () => setOpenedModal(null);

  return (
    <ModalContext.Provider
      value={{
        openedModal,
        params,
        openModal,
        setParams,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
