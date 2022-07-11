// import { ContentType } from "./enums"

import { ContentType } from "./enums";

interface DisplayMessageProps {
  message: string;
  duration: number;
  hideMessage: () => void;
}

interface ContentSelectionBarProps {
  content: string;
  changeContent: (contentName: string) => void;
}

interface ContentDisplayProps {
  content: string;
}

interface StatusImageProps {
  assetUri: string[];
}

export {
  DisplayMessageProps,
  ContentSelectionBarProps,
  ContentDisplayProps,
  StatusImageProps,
};
