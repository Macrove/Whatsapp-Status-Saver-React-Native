import { Text, View } from "react-native";
import { useEffect } from "react";
import { DisplayMessageProps } from "../models/interface";
import { displayMessage } from "../styles/styles";

const DisplayMessage: React.FC<DisplayMessageProps> = ({ message }) => {
  return (
    <View style={displayMessage.displayMessageView}>
      <Text style={displayMessage.text}>{message}</Text>
    </View>
  );
};
export default DisplayMessage;
