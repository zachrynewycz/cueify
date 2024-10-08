import { Link } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { Playlist } from "@/utils/types";

const PlaylistCards = ({ playlists }: { playlists: Playlist }) => {
  const data = Object.keys(playlists);

  return (
    <View style={styles.container}>
      {data.map((title, idx) => (
        <Link href={`/${title}`} key={idx} style={styles.link} className="rounded-md bg-white h-20 p-2">
          <Text style={styles.cardText}>{title}</Text>
        </Link>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 20,
  },
  link: {
    width: "48%",
    backgroundColor: "white",
    marginBottom: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  cardText: {
    position: "absolute",
    bottom: 0,
    fontSize: 16,
    fontWeight: 600,
    padding: 4,
    textAlign: "center",
    width: "100%",
  },
});

export default PlaylistCards;
