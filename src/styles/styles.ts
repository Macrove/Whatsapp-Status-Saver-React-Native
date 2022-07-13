import { Dimensions, StyleSheet } from "react-native";
import { WHATSAPPDEFAULTCOLOUR } from "../utils/constants";
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  homeView: {
    marginTop: 30,
    width: window.width,
    height: window.height,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#e8e1e1",
  },
});

const contentSelectionBar = StyleSheet.create({
  contentSelectionBarView: {
    width: window.width - 100,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "#00000",
    // borderWidth: 1,
  },
  contentSelectionBarBtn: {
    width: "30%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#00000",
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
    // backgroundColor: "#00000",
  },
});

const statusImages = StyleSheet.create({
  contentView: {
    flexDirection: "row",
    flexWrap: "wrap",
    // borderWidth: 1,
    // backgroundColor: "#000000",
  },
  touchableImage: {
    width: window.width / 2 - 30,
    height: window.width / 2 - 30,
    borderRadius: 15,
  },
  touchedImage: {
    width: window.width / 2 - 35,
    height: window.width / 2 - 35,
    borderWidth: 10,
    borderColor: WHATSAPPDEFAULTCOLOUR,
    borderRadius: 15,
  },
  touchedImageView: {
    width: window.width / 2 - 30,
    height: window.width / 2 - 30,
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
  },
  touchableImageView: {
    width: window.width / 2 - 30,
    height: window.width / 2 - 30,
    marginRight: 10,
    marginBottom: 10,
  },
  markedIcon: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    top: (window.width / 2 - 80) / 2,
    // marginVertical: "auto",
    // top: (window.width / 2 - 40) / 2,
    // left: (window.width / 2 - 35) / 2,
  },
  allSaveOptionsView: {
    width: window.width - 100,
    height: 30,
    bottom: 25,
    marginBottom: 5,
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionView: {
    // borderWidth: 1,
    height: 50,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { styles, contentSelectionBar, loading, statusImages };
