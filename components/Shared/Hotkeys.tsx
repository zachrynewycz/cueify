import { Drawer, DrawerBackdrop, DrawerBody, DrawerContent } from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import React, { useState } from "react";
import { Button, ButtonText } from "../ui/button";
import { HStack } from "../ui/hstack";
import { Sliders } from "react-native-feather";
import { useHotkeys } from "@/hooks/useHotkeys";
import { ScrollView, View } from "react-native";
import { Text } from "../ui/text";
import { Card } from "../ui/card";
import { useAudioPlayer } from "@/context/AudioProvider";
import { Song } from "@/utils/types";
import { Pressable } from "../ui/pressable";

const Hotkeys = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { hotkeys } = useHotkeys();
  const { isPlaying, pauseAudio, playAudio } = useAudioPlayer();

  const onPress = async (song: Song) => {
    if (!isPlaying) {
      await playAudio(song);
    } else {
      await pauseAudio();
    }
  };

  return (
    <>
      <Button size="sm" style={{ backgroundColor: "#0e7490" }} onPress={() => setIsOpen(true)}>
        <HStack className="items-center" space="sm">
          <Sliders stroke="white" width={14} height={14} />
          <ButtonText>Hotkeys</ButtonText>
        </HStack>
      </Button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} anchor="bottom" size="lg">
        <DrawerBackdrop />

        <DrawerContent>
          <DrawerBody>
            <ScrollView>
              {hotkeys.map((hotkey) => (
                <View key={hotkey.section} className="mb-10">
                  <Heading>{hotkey.section}</Heading>

                  <View className="flex flex-wrap mt-2">
                    {hotkey.songs.map((song) => (
                      <Pressable onPress={() => onPress(song)}>
                        <Card className="bg-neutral-200" size="sm">
                          <Text>{song.title}</Text>
                        </Card>
                      </Pressable>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Hotkeys;
