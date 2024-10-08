import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import { createContext, ReactNode, useContext } from "react";

interface ToastContextType {
  createToast: (description: string, title?: string) => void;
}

const config: ToastContextType = {
  createToast: () => {},
};

const ToastContext = createContext(config);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();

  const createToast = (description: string, title?: string) => {
    toast.show({
      placement: "top",
      duration: 3000,
      render: () => (
        <Toast action="info" variant="solid">
          {title && <ToastTitle>{title}</ToastTitle>}
          <ToastDescription>{description}</ToastDescription>
        </Toast>
      ),
    });
  };

  return <ToastContext.Provider value={{ createToast }}>{children}</ToastContext.Provider>;
};

export const useToastContext = () => useContext(ToastContext);
