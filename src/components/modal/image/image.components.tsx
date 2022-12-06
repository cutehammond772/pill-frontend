import * as React from "react";

import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import * as Style from "./image.style";

import { I18N, I18NTextFunction } from "../../../utils/i18n";
import { ColorAttributes } from "../../../GlobalStyles";

interface ButtonProps {
  text: I18NTextFunction;
  onClick: () => void;
  disabled?: boolean;
}

interface TitleProps {
  icon: React.ElementType;
  content: string;
}

interface ImagePreviewProps {
  link: string;
  description: string;

  available: boolean;
  text: I18NTextFunction;

  onError: () => void;
  onLoad: () => void;
}

export const Title = React.memo((props: TitleProps) => (
  <Style.Title>
    <props.icon className="icon" />
    <span className="content">{props.content}</span>
  </Style.Title>
));

export const ImagePreview = React.memo((props: ImagePreviewProps) => (
  <Style.ImagePreview>
    {props.available ? (
      <img
        src={props.link}
        alt={props.description}
        onError={props.onError}
        onLoad={props.onLoad}
        className="image"
      />
    ) : (
      <div className="preview">
        <ImageSearchIcon className="icon" />
        <span className="message">{props.text(I18N.PAGE_CREATE_16)}</span>
      </div>
    )}
  </Style.ImagePreview>
));

export const ConfirmButton = React.memo((props: ButtonProps) => (
  <Style.Button
    bgColor={ColorAttributes.WARNING}
    textColor={ColorAttributes.LIGHT}
    disabled={!!props.disabled}
    onClick={() => {
      !props.disabled && props.onClick();
    }}
  >
    <CheckIcon className="icon" />
    <div className="title">{props.text(I18N.PAGE_CREATE_19)}</div>
  </Style.Button>
));

export const EditButton = React.memo((props: ButtonProps) => (
  <Style.Button
    bgColor={ColorAttributes.PURPLE}
    textColor={ColorAttributes.LIGHT}
    disabled={!!props.disabled}
    onClick={() => {
      !props.disabled && props.onClick();
    }}
  >
    <EditIcon className="icon" />
    <div className="title">{props.text(I18N.PAGE_CREATE_20)}</div>
  </Style.Button>
));

export const DoneButton = React.memo((props: ButtonProps) => (
  <Style.Button
    bgColor={ColorAttributes.PRIMARY}
    textColor={ColorAttributes.LIGHT}
    disabled={!!props.disabled}
    onClick={() => {
      !props.disabled && props.onClick();
    }}
  >
    <div className="title">{props.text(I18N.PAGE_CREATE_24)}</div>
  </Style.Button>
));
