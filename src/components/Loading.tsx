import Lottie from "lottie-react-native";
import React from "react";
import { Text, View } from "react-native";
import { loading } from "../styles/styles";

const Loading: React.FC = () => {
  return (
    <View style={loading.loadingHome}>
      <Lottie
        source={require("../../assets/111786-loading.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;
