import { Animated, View } from "react-native";
import React, { useRef, useState } from "react";
import DisplayMessage from "../components/DisplayMessage";
import ContentDisplay from "../components/ContentDisplay";
import { styles } from "../styles/styles";
import { wait } from "../utils/wait";

const Home: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const opacityVal = useRef(new Animated.Value(0)).current;

  const handleDisplayMessage = async (message: string) => {
    setMessage(message);
    fadeIn();
    await wait(4000);
    fadeOut();
    await wait(500);
    setMessage(null);
  };

  const fadeIn = () => {
    Animated.timing(opacityVal, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacityVal, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.homeView}>
      <ContentDisplay
        handleDisplayMessage={(msg: string) => handleDisplayMessage(msg)}
      />

      {message ? (
        <Animated.View style={[styles.displayMessage, { opacity: opacityVal }]}>
          <DisplayMessage message={message} />
        </Animated.View>
      ) : null}
    </View>
  );
};

export default Home;
