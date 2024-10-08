import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { BookOpen, Menu, Search } from "react-native-feather";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import { Href, usePathname, useRouter } from "expo-router";

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const onPress = (path: string) => router.replace(path as Href);

  return (
    <HStack className="items-center justify-around bg-white py-5 border-t-[1px]" style={{ borderColor: "#e5e5e5" }}>
      <Pressable onPress={() => onPress("/")}>
        <VStack className="items-center">
          <Icon size="xl" color={pathname === "/" ? "#0e7490" : "black"} as={BookOpen} />
          <Text style={{ color: pathname === "/" ? "#0e7490" : "black" }}>Library</Text>
        </VStack>
      </Pressable>

      <Pressable onPress={() => onPress("/songs")}>
        <VStack className="items-center">
          <Icon size="xl" color={pathname === "/songs" ? "#0e7490" : "black"} as={Menu} />
          <Text style={{ color: pathname === "/songs" ? "#0e7490" : "black" }}>Songs</Text>
        </VStack>
      </Pressable>

      <Pressable onPress={() => onPress("/search")}>
        <VStack className="items-center">
          <Icon size="xl" color={pathname === "/search" ? "#0e7490" : "black"} as={Search} />
          <Text style={{ color: pathname === "/search" ? "#0e7490" : "black" }}>Search</Text>
        </VStack>
      </Pressable>
    </HStack>
  );
};

export default Navigation;
