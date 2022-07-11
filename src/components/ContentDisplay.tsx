import { StorageAccessFramework } from "expo-file-system";
import { useEffect, useState } from "react";
import { ContentDisplayProps } from "../models/interface";
import { WHATSAPPSTATUSDIRECTORY } from "../utils/constants";

import StatusImages from "./StatusImages";
import * as FileSystem from "expo-file-system";
import { View } from "react-native";
import Loading from "./Loading";

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  const [whatsappImageUri, setWhatsappImageUri] = useState<string[]>([]);
  const [whatsappVidUri, setWhatsappVidUri] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    getStatusMedia();
  }, []);

  // const handleSave = async (uri: string) => {
  //   const statusDir = FileSystem.documentDirectory + "WhatsApp Status";
  //   await FileSystem.makeDirectoryAsync(statusDir, { intermediates: true });

  //   await FileSystem.copyAsync({ from: uri, to: statusDir });
  //   const assets = await FileSystem.readDirectoryAsync(statusDir);
  //   console.log(assets, statusDir);
  //   // setMessage("Photo saved")
  // };

  // if(content == "image")
  if (isLoading) {
    return <Loading />;
  }
  return <StatusImages assetUri={whatsappImageUri} />;
  // return <StatusVideos/>
};

export default ContentDisplay;
