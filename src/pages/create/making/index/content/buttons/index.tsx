import * as React from "react";
import * as Style from "./buttons.style";

import { I18N, I18NTextFunction } from "../../../../../../utils/i18n";
import { ColorAttributes } from "../../../../../../GlobalStyles";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

interface ButtonProps {
  text: I18NTextFunction;
  onClick: () => void;
  disabled: boolean;
}

interface OpenButtonProps {
  open: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const MenuButton = React.memo((props: OpenButtonProps) => (
  <Style.OpenButton
    disabled={props.disabled}
    open={props.open}
    onClick={() => {
      !props.disabled && props.onClick();
    }}
  >
    <KeyboardDoubleArrowLeftIcon />
  </Style.OpenButton>
));

export const UpButton = React.memo((props: ButtonProps) => (
  <Style.Button
    disabled={props.disabled}
    bgColor={ColorAttributes.PRIMARY}
    textColor={ColorAttributes.LIGHT}
    onClick={() => {
      !props.disabled && props.onClick();
    }}
  >
    <KeyboardArrowUpIcon className="icon" />
    <div className="content">{props.text(I18N.PAGE_CREATE_27)}</div>
  </Style.Button>
));

export const DownButton = React.memo((props: ButtonProps) => (
  <Style.Button
    disabled={props.disabled}
    bgColor={ColorAttributes.PRIMARY}
    textColor={ColorAttributes.LIGHT}
    onClick={() => {
      !props.disabled && props.onClick();
    }}
  >
    <KeyboardArrowDownIcon className="icon" />
    <div className="content">{props.text(I18N.PAGE_CREATE_28)}</div>
  </Style.Button>
));

export const EditButton = React.memo((props: ButtonProps) => (
  <Style.Button
    disabled={props.disabled}
    bgColor={ColorAttributes.PURPLE}
    textColor={ColorAttributes.LIGHT}
    onClick={() => {
      !props.disabled && props.onClick();
    }}
  >
    <EditIcon className="icon" />
    <div className="content">{props.text(I18N.PAGE_CREATE_29)}</div>
  </Style.Button>
));

export const DeleteButton = React.memo((props: ButtonProps) => (
  <Style.Button
    disabled={props.disabled}
    bgColor={ColorAttributes.DANGER}
    textColor={ColorAttributes.LIGHT}
    onClick={() => {
      !props.disabled && props.onClick();
    }}
  >
    <ClearIcon className="icon" />
    <div className="content">{props.text(I18N.PAGE_CREATE_30)}</div>
  </Style.Button>
));
