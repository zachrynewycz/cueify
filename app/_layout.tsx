import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AudioPlayerProvider } from "@/context/AudioProvider";
import { ModalProvider } from "@/context/ModalProvider";
import { Stack } from "expo-router/stack";
import "../global.css";
import { ToastProvider } from "@/context/ToastProvider";
import Hotkeys from "@/components/Shared/Hotkeys";

export default function Layout() {
  return (
    <GluestackUIProvider>
      <ModalProvider>
        <ToastProvider>
          <AudioPlayerProvider>
            <Stack
              screenOptions={{
                headerRight: () => <Hotkeys />,
                contentStyle: { backgroundColor: "#f5f5f5" },
              }}
            />
          </AudioPlayerProvider>
        </ToastProvider>
      </ModalProvider>
    </GluestackUIProvider>
  );
}
