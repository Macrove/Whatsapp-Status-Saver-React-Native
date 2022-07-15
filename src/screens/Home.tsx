import { View } from "react-native";
import React, { useState } from "react";
import DisplayMessage from "../components/DisplayMessage";
import ContentSelectionBar from "../components/ContentSelectionBar";
import ContentDisplay from "../components/ContentDisplay";
import { styles } from "../styles/styles";

const Home: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const handleHideMessage = () => setMessage(null);

  return (
    <View style={styles.homeView}>
      <ContentDisplay />

      {message ? (
        <DisplayMessage
          message={message}
          duration={2000}
          hideMessage={handleHideMessage}
        />
      ) : null}
    </View>
  );
};

export default Home;
