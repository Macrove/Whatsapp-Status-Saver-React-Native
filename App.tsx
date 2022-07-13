import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/Home";
import { WHATSAPPDEFAULTCOLOUR } from "./src/utils/constants";

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
      <StatusBar backgroundColor={WHATSAPPDEFAULTCOLOUR} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
