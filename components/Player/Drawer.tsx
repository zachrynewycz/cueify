import React from "react";
import { useAudioPlayer } from "@/context/AudioProvider";
import { Drawer as GlueStackDrawer, DrawerBackdrop, DrawerBody, DrawerContent, DrawerHeader } from "../ui/drawer";
import { Heading } from "../ui/heading";
import Svg, { Path } from "react-native-svg";
import { VStack } from "../ui/vstack";
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "../ui/slider";
import { HStack } from "../ui/hstack";
import { Volume, Volume2 } from "react-native-feather";
import { Text } from "../ui/text";
import { formatTime } from "@/utils";
import { View } from "react-native";

interface Props {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (arg: boolean) => void;
}

const Drawer = ({ isDrawerOpen, setIsDrawerOpen }: Props) => {
  const { isPlaying, duration, position, volume, songName, pauseAudio, changeVolume, changePosition } =
    useAudioPlayer();

  const onPress = async () => await pauseAudio();
  const onVolumeChange = async (value: number) => await changeVolume(value);
  const onPositionChange = async (value: number) => await changePosition(value);

  return (
    <GlueStackDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} size="md" anchor="bottom">
      <DrawerBackdrop />

      <DrawerContent>
        <DrawerBody className="mt-10 py-2">
          <VStack className="items-center justify-between h-full" space="4xl">
            <Heading>{songName}</Heading>

            {/* TRACK POSITION */}
            <View className="w-full">
              <Slider
                maxValue={duration || 100}
                value={position || 0}
                size="sm"
                orientation="horizontal"
                className="mb-3 w-[95%] mx-auto"
                onChange={onPositionChange}
              >
                <SliderTrack className="h-2">
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>

              <HStack className="justify-between w-full px-2 -mb-5">
                <Text className="text-lg">{formatTime(position) || "-- : --"}</Text>
                <Text className="text-lg">{formatTime(duration) || "-- : --"}</Text>
              </HStack>
            </View>

            {/* PLAY / PAUSE BUTTONS */}
            {isPlaying ? (
              <Svg onPress={onPress} width="50" height="45" viewBox="0 0 48 48">
                <Path d="M 10.5 5 C 8.0324991 5 6 7.0324991 6 9.5 L 6 38.5 C 6 40.967501 8.0324991 43 10.5 43 L 15.5 43 C 17.967501 43 20 40.967501 20 38.5 L 20 9.5 C 20 7.0324991 17.967501 5 15.5 5 L 10.5 5 z M 32.5 5 C 30.032499 5 28 7.0324991 28 9.5 L 28 38.5 C 28 40.967501 30.032499 43 32.5 43 L 37.5 43 C 39.967501 43 42 40.967501 42 38.5 L 42 9.5 C 42 7.0324991 39.967501 5 37.5 5 L 32.5 5 z"></Path>
              </Svg>
            ) : (
              <Svg onPress={onPress} width="50" height="45" viewBox="0 0 48 48">
                <Path d="M 11.396484 4.1113281 C 9.1042001 4.2020187 7 6.0721788 7 8.5917969 L 7 39.408203 C 7 42.767694 10.742758 44.971891 13.681641 43.34375 L 41.490234 27.935547 C 44.513674 26.260259 44.513674 21.739741 41.490234 20.064453 L 13.681641 4.65625 C 12.94692 4.2492148 12.160579 4.0810979 11.396484 4.1113281 z"></Path>
              </Svg>
            )}

            {/* VOLUME SLIDER */}
            <View className="w-full">
              <Slider
                maxValue={1.0}
                value={volume}
                step={0.05}
                size="sm"
                orientation="horizontal"
                className="mb-3 w-[95%] mx-auto mt-2"
                onChange={onVolumeChange}
              >
                <SliderTrack className="h-2">
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>

              <HStack className="justify-between w-full px-3">
                <Volume fill={"black"} width={26} height={26} />
                <Volume2 fill={"black"} width={26} height={26} />
              </HStack>
            </View>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </GlueStackDrawer>
  );
};

export default Drawer;
