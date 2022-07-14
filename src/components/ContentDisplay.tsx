import { StorageAccessFramework } from "expo-file-system";
import { useEffect, useState } from "react";
import { ContentDisplayProps } from "../models/interface";
import { WHATSAPPSTATUSDIRECTORY } from "../utils/constants";
import StatusImages from "./StatusImages";
import Loading from "./Loading";
import StatusVideos from "./StatusVideos";

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  const [whatsappImageUri, setWhatsappImageUri] = useState<string[]>([]);
  const [whatsappVidUri, setWhatsappVidUri] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [oneSecPassed, setOneSecPassed] = useState<boolean>(false);
  const [toShowLoading, setToShowLoading] = useState<boolean>(true);

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
    }, 2000);
    getStatusMedia();
  }, []);

  if (toShowLoading) {
    return <Loading />;
  }
  if (content == "video") {
    return <StatusVideos assetUri={whatsappVidUri} />;
  }
  return <StatusImages assetUri={whatsappImageUri} />;
};

export default ContentDisplay;
