import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StatusImageProps } from "../models/interface";
import { statusImages } from "../styles/styles";
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

const StatusImages: React.FC<StatusImageProps> = ({ assetUri }) => {
  const [flatListInitialUri, setFlatListInitialUri] = useState<string | null>(
    null
  );
  const [isSaveMode, setIsSavingMode] = useState<boolean>(false);
  const [toSaveUri, setToSaveUri] = useState<string[]>([]);

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

  // const saveContent = async () => {
  //   const statusDir = FileSystem.documentDirectory + "WhatsApp Status";
  //   await FileSystem.makeDirectoryAsync(statusDir, { intermediates: true });

  //   toSaveUri.forEach(async (uri: string) => {
  //     await FileSystem.copyAsync({ from: uri, to: statusDir });
  //   });
  //   const assets = await FileSystem.readDirectoryAsync(statusDir);
  //   console.log(assets, statusDir);
  //   // setMessage("Photo saved")
  // };

  // {isSaveMode ? (
  //   <View
  //     style={{
  //       flexDirection: "row",
  //       justifyContent: "space-between",
  //       margin: 10,
  //     }}
  //   >
  //     {/* <View>
  //       <AntDesign name="checkcircleo" size={24} color="black" />
  //       <AntDesign name="checkcircle" size={24} color="black" />
  //     </View> */}
  //     <TouchableWithoutFeedback onPress={() => saveContent()}>
  //       <AntDesign name="check" size={24} color="black" />
  //     </TouchableWithoutFeedback>
  //     {/* <Entypo name="cross" size={24} color="black" /> */}
  //   </View>
  // ) : null}

  return (
    <View>
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
                  <Image
                    style={
                      toSaveUri.includes(uri)
                        ? statusImages.touchedImage
                        : statusImages.touchableImage
                    }
                    source={{ uri: uri }}
                  />
                </TouchableWithoutFeedback>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default StatusImages;
