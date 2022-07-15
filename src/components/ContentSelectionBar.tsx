import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { ContentSelectionBarProps } from "../models/interface";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { contentSelectionBar } from "../styles/styles";

const ContentSelectionBar: React.FC<ContentSelectionBarProps> = ({
  content,
  handleChangeContent,
}) => {
  return (
    <View style={contentSelectionBar.contentSelectionBarView}>
      <TouchableWithoutFeedback onPress={() => handleChangeContent("images")}>
        <View
          style={
            content === "images"
              ? [
                  contentSelectionBar.contentSelectionBarBtn,
                  contentSelectionBar.activeBtnStyle,
                ]
              : contentSelectionBar.contentSelectionBarBtn
          }
        >
          <Entypo name="image" size={24} color="black" />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          handleChangeContent("videos");
        }}
      >
        <View
          style={
            content === "videos"
              ? [
                  contentSelectionBar.contentSelectionBarBtn,
                  contentSelectionBar.activeBtnStyle,
                ]
              : contentSelectionBar.contentSelectionBarBtn
          }
        >
          <Feather name="video" size={24} color="black" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default ContentSelectionBar;
