import { useNavigation } from "expo-router";
import { useEffect } from "react";

export const useHeaderTitle = (title: string) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);
};
