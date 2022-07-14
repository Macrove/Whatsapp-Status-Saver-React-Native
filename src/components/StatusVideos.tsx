import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StatusImageProps } from "../models/interface";
import { statusImages } from "../styles/styles";
import * as FileSystem from "expo-file-system";
import { FontAwesome } from "@expo/vector-icons";
import {
  VideoStatusAlbumName,
  WHATSAPPDEFAULTCOLOUR,
} from "../utils/constants";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";

const StatusVideos: React.FC<StatusImageProps> = ({ assetUri }) => {
  const [isSaveMode, setIsSavingMode] = useState<boolean>(false);
  const [toSaveUri, setToSaveUri] = useState<string[]>([]);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const startSavingMode = (uri: string) => {
    if (!isSaveMode) {
      setToSaveUri([uri]);
      setIsSavingMode(true);
    }
  };

  const editToSaveUri = (uri: string) => {
    if (isSaveMode) {
      if (toSaveUri.includes(uri)) {
        const newToSaveUri = toSaveUri.filter((uri_: string) => uri_ != uri);
        if (newToSaveUri.length == 0) {
          setIsSavingMode(false);
        }
        setToSaveUri(newToSaveUri);
      } else {
        setToSaveUri([...toSaveUri, uri]);
      }
    }
  };

  let videoCacheFolderUri: string;
  const getVideosCacheFilesUri = async () => {
    const cacheDirUri = FileSystem.cacheDirectory!;
    const relativePath = "WHATSAPP/STATUS/VIDEOS";
    videoCacheFolderUri = cacheDirUri + relativePath;

    try {
      await FileSystem.deleteAsync(videoCacheFolderUri);
    } catch (e) {
      console.log(e);
    }

    toSaveUri.forEach(async (uri: string) => {
      await FileSystem.copyAsync({
        from: uri,
        to: `${videoCacheFolderUri}`,
      });
    });

    const videoCacheFiles = await FileSystem.readDirectoryAsync(
      videoCacheFolderUri
    );
    return videoCacheFiles.map(
      (uri: string) => `${videoCacheFolderUri}/${uri}`
    );
  };

  const saveContent = async () => {
    try {
      if (!status?.granted) {
        await requestPermission();
        if (!status?.granted) {
          alert("Sorry! Can't service without permission.");
          cancelSave();
          return;
        }
      }

      const videoCacheFilesUri = await getVideosCacheFilesUri();
      if (videoCacheFilesUri.length) {
        let createdAssets: MediaLibrary.Asset[] = [];
        for (let uri of videoCacheFilesUri) {
          const newAsset = await MediaLibrary.createAssetAsync(uri);
          createdAssets.push(newAsset);
        }

        let album = await MediaLibrary.getAlbumAsync(VideoStatusAlbumName);
        if (!album) {
          //false=>move assets, don't copy
          album = await MediaLibrary.createAlbumAsync(
            VideoStatusAlbumName,
            createdAssets[0],
            true
          );
          createdAssets.shift();
        }

        await MediaLibrary.addAssetsToAlbumAsync(createdAssets, album, true);
        await MediaLibrary.deleteAssetsAsync(createdAssets);
        await FileSystem.deleteAsync(videoCacheFolderUri);
      }
      cancelSave();
    } catch (e) {
      console.log(e);
      FileSystem.deleteAsync(videoCacheFolderUri);
      cancelSave();
      const err = new Error();
      console.log(err.stack);
    }
  };

  const changeMarking = () => {
    if (assetUri.length === toSaveUri.length) {
      cancelSave();
    } else {
      setToSaveUri([...assetUri]);
    }
  };

  const cancelSave = () => {
    setToSaveUri([]);
    setIsSavingMode(false);
  };

  return (
    <>
      {isSaveMode ? (
        <View style={[statusImages.allSaveOptionsView]}>
          <View>
            <TouchableWithoutFeedback onPress={() => changeMarking()}>
              {assetUri.length == toSaveUri.length ? (
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
          <TouchableWithoutFeedback onPress={() => saveContent()}>
            <View style={statusImages.optionView}>
              <AntDesign name="check" size={24} color="black" />
              <Text>Save</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => cancelSave()}>
            <View style={statusImages.optionView}>
              <Entypo name="cross" size={24} color="black" />
              <Text>Cancel</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={statusImages.contentView}>
          {assetUri.map((uri: string, idx: number) => {
            return (
              <View key={idx}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    editToSaveUri(uri);
                  }}
                  onLongPress={() => startSavingMode(uri)}
                >
                  <View
                    style={
                      toSaveUri.includes(uri)
                        ? statusImages.touchedImageView
                        : statusImages.touchableImageView
                    }
                  >
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
      </ScrollView>
    </>
  );
};

export default StatusVideos;
