// import { ContentType } from "./enums"

import { ContentType } from "./enums";

interface DisplayMessageProps {
  message: string;
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
  handleDisplayMessage: (message: string) => void;
  handleRefresh: () => void;
}

interface ContentDisplayProps {
  handleDisplayMessage: (message: string) => void;
}

export {
  DisplayMessageProps,
  ContentSelectionBarProps,
  StatusImageProps,
  StatusItemProps,
  ContentDisplayProps,
};
