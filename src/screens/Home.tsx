import { View } from "react-native";
import React, { useState } from "react";
import DisplayMessage from "../components/DisplayMessage";
import ContentSelectionBar from "../components/ContentSelectionBar";
import ContentDisplay from "../components/ContentDisplay";
import { styles } from "../styles/styles";

const Home: React.FC = () => {
  const [displayContent, setDisplayContent] = useState<string>("Images");

  const [message, setMessage] = useState<string | null>(null);

  const handleHideMessage = () => setMessage(null);
  const handleChangeContent = (content: string) => setDisplayContent(content);

  return (
    <View style={styles.homeView}>
      <ContentSelectionBar
        content={"image"}
        changeContent={(content) => handleChangeContent(content)}
      />
      <ContentDisplay content={displayContent} />

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
