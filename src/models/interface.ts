// import { ContentType } from "./enums"

import { ContentType } from "./enums";

interface DisplayMessageProps {
  message: string;
  duration: number;
  hideMessage: () => void;
}

interface ContentSelectionBarProps {
  content: string;
  handleChangeContent: (contentName: "images" | "videos") => void;
}

interface StatusImageProps {
  assetUri: string[];
}

interface StatusItemProps {
  itemType: "IMAGES" | "VIDEOS";
  albumName: string;
  itemUri: string[];
}

export {
  DisplayMessageProps,
  ContentSelectionBarProps,
  StatusImageProps,
  StatusItemProps,
};
