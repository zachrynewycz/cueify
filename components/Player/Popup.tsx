import { useAudioPlayer } from "@/context/AudioProvider";
import { Music } from "react-native-feather";
import { Center } from "../ui/center";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import Svg, { Path } from "react-native-svg";
import { Pressable } from "../ui/pressable";
import { StyleSheet } from "react-native";

interface Props {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (arg: boolean) => void;
}

const Popup = ({ isDrawerOpen, setIsDrawerOpen }: Props) => {
  const { isPlaying, songName, pauseAudio } = useAudioPlayer();

  const onPress = async () => {
    await pauseAudio();
  };

  return (
    <Pressable onPress={() => setIsDrawerOpen(!isDrawerOpen)}>
      <Center className="mx-3">
        <HStack
          className="bg-white w-full py-2 pl-2 pr-4 rounded-xl items-center justify-between "
          style={styles.shadowContainer}
        >
          <HStack className="items-center">
            <Center className="bg-neutral-200 rounded-xl p-3 w-fit inline mr-4">
              <Music stroke="#a3a3a3" width={26} height={26} />
            </Center>
            <Text className="text-lg truncate">{songName}</Text>
          </HStack>

          {isPlaying ? (
            <Svg onPress={onPress} x="0px" y="0px" width="50" height="24" viewBox="0 0 48 48">
              <Path d="M 10.5 5 C 8.0324991 5 6 7.0324991 6 9.5 L 6 38.5 C 6 40.967501 8.0324991 43 10.5 43 L 15.5 43 C 17.967501 43 20 40.967501 20 38.5 L 20 9.5 C 20 7.0324991 17.967501 5 15.5 5 L 10.5 5 z M 32.5 5 C 30.032499 5 28 7.0324991 28 9.5 L 28 38.5 C 28 40.967501 30.032499 43 32.5 43 L 37.5 43 C 39.967501 43 42 40.967501 42 38.5 L 42 9.5 C 42 7.0324991 39.967501 5 37.5 5 L 32.5 5 z"></Path>
            </Svg>
          ) : (
            <Svg onPress={onPress} x="0px" y="0px" width="50" height="24" viewBox="0 0 48 48">
              <Path d="M 11.396484 4.1113281 C 9.1042001 4.2020187 7 6.0721788 7 8.5917969 L 7 39.408203 C 7 42.767694 10.742758 44.971891 13.681641 43.34375 L 41.490234 27.935547 C 44.513674 26.260259 44.513674 21.739741 41.490234 20.064453 L 13.681641 4.65625 C 12.94692 4.2492148 12.160579 4.0810979 11.396484 4.1113281 z"></Path>
            </Svg>
          )}
        </HStack>
      </Center>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: "#000", // Shadow color (black)
    shadowOffset: { width: 0, height: 0 }, // Offset x: 0, y: 25px
    shadowOpacity: 0.1, // Shadow opacity (25%)
    shadowRadius: 10, // Shadow blur radius (~50px total blur when combined with the offset)
    elevation: 4, // Android equivalent of the shadow
  },
});

export default Popup;
