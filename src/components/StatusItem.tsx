import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StatusItemProps } from "../models/interface";
import { statusImages } from "../styles/styles";
import * as FileSystem from "expo-file-system";
import { FontAwesome } from "@expo/vector-icons";
import { WHATSAPPDEFAULTCOLOUR } from "../utils/constants";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { wait } from "../utils/wait";

const StatusItem: React.FC<StatusItemProps> = ({
  itemUri,
  itemType,
  albumName,
  handleDisplayMessage,
  handleRefresh,
}) => {
  const [isSaveMode, setIsSavingMode] = useState<boolean>(false);
  const [toSaveUri, setToSaveUri] = useState<string[]>([]);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [refreshing, setRefreshing] = useState(false);

  const saveModeAnimation = useRef({
    scaleYInitialValue: 0,
    scaleYFinalValue: 1,
    finalSaveBarHeight: 60,
    scrollViewInitialTop: -60,
    scrollViewFinalTop: 0,
    duration: 200,
  }).current;

  const scaleYAnim = useRef(
    new Animated.Value(saveModeAnimation.scaleYInitialValue)
  ).current;
  const scrollViewDropAnim = useRef(
    new Animated.Value(saveModeAnimation.scrollViewInitialTop)
  ).current;

  const saveBarDropAnim = () => {
    Animated.timing(scaleYAnim, {
      toValue: saveModeAnimation.scaleYFinalValue,
      duration: saveModeAnimation.duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(scrollViewDropAnim, {
      toValue: saveModeAnimation.scrollViewFinalTop,
      duration: saveModeAnimation.duration,
      useNativeDriver: true,
    }).start();
  };
  const saveBarRiseAnim = () => {
    Animated.timing(scaleYAnim, {
      toValue: saveModeAnimation.scaleYInitialValue,
      duration: saveModeAnimation.duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(scrollViewDropAnim, {
      toValue: saveModeAnimation.scrollViewInitialTop,
      duration: saveModeAnimation.duration,
      useNativeDriver: true,
    }).start();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleRefresh();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (!isSaveMode) saveBarRiseAnim();
    else saveBarDropAnim();
  }, [isSaveMode]);

  const startSavingMode = async (uri: string) => {
    if (!isSaveMode) {
      setToSaveUri([uri]);
      setIsSavingMode(true);
      // saveBarDropAnim();
      // console.log(scrollViewDropAnim);
      // await wait(2000);
      // console.log(scrollViewDropAnim);
    }
  };

  const editToSaveUri = (uri: string) => {
    if (isSaveMode) {
      if (toSaveUri.includes(uri)) {
        const newToSaveUri = toSaveUri.filter((uri_: string) => uri_ != uri);
        if (newToSaveUri.length == 0) {
          stopSave();
        }
        setToSaveUri(newToSaveUri);
      } else {
        setToSaveUri([...toSaveUri, uri]);
      }
    }
  };

  let itemCacheFolderUri: string;
  const getItemCacheFilesUri = async () => {
    const cacheDirUri = FileSystem.cacheDirectory!;
    const relativePath = `WHATSAPP/STATUS/${itemType}`;
    itemCacheFolderUri = cacheDirUri + relativePath;

    try {
      await FileSystem.deleteAsync(itemCacheFolderUri);
    } catch (e) {
      console.log(e);
    }

    toSaveUri.forEach(async (uri: string) => {
      await FileSystem.copyAsync({
        from: uri,
        to: `${itemCacheFolderUri}`,
      });
    });

    const itemCacheFiles = await FileSystem.readDirectoryAsync(
      itemCacheFolderUri
    );
    return itemCacheFiles.map((uri: string) => `${itemCacheFolderUri}/${uri}`);
  };

  const saveContent = async () => {
    try {
      if (!status?.granted) {
        await requestPermission();
        if (!status?.granted) {
          alert("Sorry! Can't service without permission.");
          stopSave();
          return;
        }
      }

      const itemCacheFilesUri = await getItemCacheFilesUri();
      if (itemCacheFilesUri.length) {
        let createdAssets: MediaLibrary.Asset[] = [];
        for (let uri of itemCacheFilesUri) {
          const newAsset = await MediaLibrary.createAssetAsync(uri);
          createdAssets.push(newAsset);
        }
        let album = await MediaLibrary.getAlbumAsync(albumName);
        if (!album) {
          //false=>move assets, don't copy
          album = await MediaLibrary.createAlbumAsync(
            albumName,
            createdAssets[0],
            true
          );
          await MediaLibrary.deleteAssetsAsync([createdAssets[0]]);
          createdAssets.shift();
        }
        await MediaLibrary.addAssetsToAlbumAsync(createdAssets, album, true);
        await MediaLibrary.deleteAssetsAsync(createdAssets);
        await FileSystem.deleteAsync(itemCacheFolderUri);
        handleDisplayMessage("Saved Assets Successfully");
      }
      stopSave();
    } catch (e) {
      console.log(e);
      FileSystem.deleteAsync(itemCacheFolderUri);
      stopSave();
      const err = new Error();
      console.log(err.stack);
    }
  };

  const changeMarking = () => {
    if (itemUri.length === toSaveUri.length) {
      stopSave();
    } else {
      setToSaveUri([...itemUri]);
    }
  };

  const stopSave = async () => {
    saveBarRiseAnim();
    setToSaveUri([]);
    await wait(saveModeAnimation.duration);
    setIsSavingMode(false);
  };

  return (
    <View>
      {isSaveMode ? (
        <Animated.View
          style={[
            { height: saveModeAnimation.finalSaveBarHeight },
            { transform: [{ scaleY: scaleYAnim }] },
          ]}
        >
          <View style={statusImages.allSaveOptionsView}>
            <View>
              <TouchableWithoutFeedback onPress={() => changeMarking()}>
                {itemUri.length == toSaveUri.length ? (
                  <View style={statusImages.optionView}>
                    <AntDesign name="checkcircle" size={24} color="black" />
                    <Text>Unmark All</Text>
                  </View>
                ) : (
                  <View style={statusImages.optionView}>
                    <AntDesign name="checkcircleo" size={24} color="black" />
                    <Text>Mark All</Text>
                  </View>
                )}
              </TouchableWithoutFeedback>
            </View>
            <View>
              <TouchableWithoutFeedback onPress={() => saveContent()}>
                <View style={statusImages.optionView}>
                  <AntDesign name="check" size={24} color="black" />
                  <Text>Save</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View>
              <TouchableWithoutFeedback onPress={() => stopSave()}>
                <View style={statusImages.optionView}>
                  <Entypo name="cross" size={24} color="black" />
                  <Text>Cancel</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Animated.View>
      ) : null}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={
          isSaveMode
            ? [{ top: 0 }, { transform: [{ translateY: scrollViewDropAnim }] }]
            : null
        }
      >
        <View style={statusImages.contentView}>
          {itemUri.map((uri: string, idx: number) => {
            return (
              <View key={idx}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    editToSaveUri(uri);
                  }}
                  onLongPress={() => startSavingMode(uri)}
                >
                  <View>
                    {toSaveUri.includes(uri) ? (
                      <FontAwesome
                        style={statusImages.markedIcon}
                        name="check"
                        size={50}
                        color={WHATSAPPDEFAULTCOLOUR}
                      />
                    ) : null}
                    <Image
                      style={
                        toSaveUri.includes(uri)
                          ? statusImages.touchedImage
                          : statusImages.touchableImage
                      }
                      source={{ uri: uri }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default StatusItem;
