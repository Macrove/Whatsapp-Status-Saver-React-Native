import { Dimensions, StyleSheet } from "react-native";
import { WHATSAPPDEFAULTCOLOUR } from "../utils/constants";
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  homeView: {
    marginTop: 30,
    width: window.width,
    height: window.height,
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#e8e1e1",
  },
  displayMessage: {
    // width: window.width / 2,
    // height: 100,
    position: "absolute",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    top: 700,
  },
});

const contentSelectionBar = StyleSheet.create({
  contentSelectionBarView: {
    width: window.width - 100,
    height: 70,
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
    width: window.width,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  touchableImage: {
    width: window.width / 2 - 12,
    height: window.width / 2 - 30,
    borderRadius: 15,
    marginHorizontal: 6,
    marginBottom: 10,
  },
  touchedImage: {
    width: window.width / 2 - 12,
    height: window.width / 2 - 30,
    borderRadius: 15,
    borderColor: WHATSAPPDEFAULTCOLOUR,
    borderWidth: 2,
    marginHorizontal: 6,
    marginBottom: 10,
  },
  markedIcon: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    top: (window.width / 2 - 80) / 2,
  },
  allSaveOptionsView: {
    width: window.width - 100,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  optionView: {
    height: 50,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});

const displayMessage = StyleSheet.create({
  displayMessageView: {
    width: window.width / 2,
    height: 35,
    backgroundColor: "#9d9e9d",
    // borderWidth: 1,
    zIndex: 1,
    borderRadius: 15,
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});

export { styles, contentSelectionBar, loading, statusImages, displayMessage };
