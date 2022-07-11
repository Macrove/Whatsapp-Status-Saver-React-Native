import { Dimensions, StyleSheet } from "react-native";
import { WHATSAPPDEFAULTCOLOUR } from "../utils/constants";
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  homeView: {
    width: window.width,
    height: window.height,
    padding: 20,
    alignItems: "center",
  },
});

const contentSelectionBar = StyleSheet.create({
  contentSelectionBarView: {
    width: window.width - 100,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  contentSelectionBarBtn: {
    width: "30%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  activeBtnStyle: {
    borderBottomColor: WHATSAPPDEFAULTCOLOUR,
    borderBottomWidth: 2,
  },
});

const loading = StyleSheet.create({
  loadingHome: {
    width: window.width - 200,
    height: window.height - 200,
    alignItems: "center",
    justifyContent: "center",
  },
});

const statusImages = StyleSheet.create({
  contentView: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  touchableImage: {
    width: window.width / 2 - 30,
    height: window.width / 2 - 30,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 15,
  },
  touchedImage: {
    width: window.width / 2 - 30,
    height: window.width / 2 - 30,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 10,
    borderColor: WHATSAPPDEFAULTCOLOUR,
  },
});

export { styles, contentSelectionBar, loading, statusImages };
