import { useState } from "react";
import {
  FlatList,
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
import { WHATSAPPDEFAULTCOLOUR } from "../utils/constants";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { StorageAccessFramework } from "expo-file-system";

const StatusImages: React.FC<StatusImageProps> = ({ assetUri }) => {
  const [flatListInitialUri, setFlatListInitialUri] = useState<string | null>(
    null
  );
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

  const saveContent = async () => {
    // console.log("saving");
    try {
      if (!status?.granted) {
        await requestPermission();
        if (!status?.granted) {
          alert("Can't do this");
          setToSaveUri([]);
          setIsSavingMode(false);
          return;
        }
      }

      const cacheDirUri = FileSystem.cacheDirectory!;
      const relativePath = "WHATSAPP/STATUS/IMAGES";
      const imageCacheFolderUri = cacheDirUri + relativePath;
      const finalAlbumUri = FileSystem.documentDirectory + relativePath;

      toSaveUri.forEach(async (uri: string) => {
        await FileSystem.copyAsync({
          from: uri,
          to: `${imageCacheFolderUri}`,
        });
      });

      const imageCacheFiles = await FileSystem.readDirectoryAsync(
        imageCacheFolderUri
      );
      const imageCacheFilesUri = imageCacheFiles.map(
        (uri: string) => `${imageCacheFolderUri}/${uri}`
      );

      let album = await MediaLibrary.getAlbumAsync("WHATSAPP STATUS IMAGES");
      const newAsset = await MediaLibrary.createAssetAsync(
        imageCacheFilesUri[0]
      );
      console.log(album);
      if (!album && imageCacheFilesUri.length) {
        album = await MediaLibrary.createAlbumAsync(
          "WHATSAPP STATUS IMAGES",
          newAsset,
          false
        );
        console.log(album);
      }
      const shiftedAssets = imageCacheFilesUri.shift()!;
      let createdAssets: MediaLibrary.Asset[] = [];
      for (let uri of imageCacheFilesUri) {
        const newAsset = await MediaLibrary.createAssetAsync(uri);
        createdAssets.push(newAsset);
      }
      MediaLibrary.addAssetsToAlbumAsync(createdAssets, album, false);
      FileSystem.deleteAsync(imageCacheFolderUri);
      setToSaveUri([]);
      setIsSavingMode(false);
    } catch (e) {
      console.log(e);
    }

    // const statusDir = FileSystem.documentDirectory + "WhatsApp Status";
    // await FileSystem.makeDirectoryAsync(statusDir, { intermediates: true });

    // toSaveUri.forEach(async (uri: string) => {
    //   await FileSystem.copyAsync({ from: uri, to: statusDir });
    // });
    // const assets = await FileSystem.readDirectoryAsync(statusDir);
    // console.log(assets, statusDir);
    // setMessage("Photo saved")
  };

  const changeMarking = () => {
    if (assetUri.length === toSaveUri.length) {
      setToSaveUri([]);
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
        <View style={statusImages.allSaveOptionsView}>
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

export default StatusImages;
