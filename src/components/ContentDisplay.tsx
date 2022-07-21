import { StorageAccessFramework } from "expo-file-system";
import { useEffect, useRef, useState } from "react";
import {
  ContentDisplayProps,
  ContentSelectionBarProps,
  StatusItemProps,
} from "../models/interface";
import {
  ImageStatusAlbumName,
  VideoStatusAlbumName,
  WHATSAPPSTATUSDIRECTORY,
} from "../utils/constants";
import Loading from "./Loading";
import {
  Dimensions,
  FlatList,
  ScrollView,
  SectionList,
  Text,
  View,
} from "react-native";
import StatusItem from "./StatusItem";
import ContentSelectionBar from "./ContentSelectionBar";
import { contentDisplay } from "../styles/styles";

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  handleDisplayMessage,
}) => {
  const [whatsappImageUri, setWhatsappImageUri] = useState<string[]>([]);
  const [whatsappVidUri, setWhatsappVidUri] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [oneSecPassed, setOneSecPassed] = useState<boolean>(false);
  const [toShowLoading, setToShowLoading] = useState<boolean>(true);
  const [displayContent, setDisplayContent] = useState<string>("images");

  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 50 });
  const onViewRef = useRef((items: any) => {
    setDisplayContent(items.viewableItems[0].key);
  });

  const flatListRef = useRef<FlatList>(null);

  const handleChangeContent = (content: "images" | "videos") => {
    setDisplayContent(content);
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: content === "images" ? 0 : 1,
    });
  };

  const getStatusMedia = async () => {
    try {
      const assets = await StorageAccessFramework.readDirectoryAsync(
        WHATSAPPSTATUSDIRECTORY
      );

      const newImageUri: string[] = [],
        newVidUri: string[] = [];

      assets.forEach((uri: string) => {
        if (uri.endsWith("jpg")) newImageUri.push(uri);
        else if (uri.endsWith("mp4")) newVidUri.push(uri);
      });

      setWhatsappImageUri(newImageUri);
      setWhatsappVidUri(newVidUri);
      setIsLoading(false);
    } catch (e) {
      // setMessage("access denied")
      console.log(e);
    }
  };
  useEffect(() => {
    setToShowLoading(isLoading || !oneSecPassed);
  }, [oneSecPassed, isLoading]);

  useEffect(() => {
    setTimeout(() => {
      setOneSecPassed(true);
    }, 2500);
    getStatusMedia();
  }, []);

  if (toShowLoading) {
    return <Loading />;
  }
  const DATA = [
    {
      id: "images",
      albumName: ImageStatusAlbumName,
      itemType: "IMAGES",
      itemUri: whatsappImageUri,
    },
    {
      id: "videos",
      albumName: VideoStatusAlbumName,
      itemType: "VIDEOS",
      itemUri: whatsappVidUri,
    },
  ];

  const renderItem = ({ item }: any) => (
    <View style={{ width: Dimensions.get("window").width }}>
      <StatusItem
        albumName={item.albumName}
        itemType={item.itemType}
        itemUri={item.itemUri}
        handleDisplayMessage={(msg: string) => handleDisplayMessage(msg)}
        handleRefresh={() => getStatusMedia()}
      />
    </View>
  );

  return (
    <View style={{ alignItems: "center" }}>
      <View style={contentDisplay.contentSelectionBarView}>
        <ContentSelectionBar
          content={displayContent}
          handleChangeContent={handleChangeContent}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => ({
          length: Dimensions.get("window").width,
          offset: Dimensions.get("window").width * index,
          index,
        })}
        horizontal={true}
        snapToInterval={Dimensions.get("window").width + 2}
        disableIntervalMomentum={true}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        // initialNumToRender={20}
        windowSize={20}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
  // if (content == "video") {
  //   return <StatusVideos assetUri={whatsappVidUri} />;
  // }
  // return <StatusImages assetUri={whatsappImageUri} />;
};

export default ContentDisplay;
