import * as React from "react";

import { useState, useEffect, useCallback } from "react";

import AddIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import * as Style from "./image.style";

import Message from "../../message";
import { useI18n } from "../../../utils/hooks/i18n";
import { I18N, I18NTextFunction } from "../../../utils/i18n";
import { DefaultModal } from "../default";
import { ColorAttributes } from "../../../GlobalStyles";

export interface ImageContentEditProps {
  link: string;
  description: string;
}

interface ImageContentModalProps {
  open: boolean;
  edit?: ImageContentEditProps;

  onAdd?: (link: string, description: string) => void;
  onUpdate?: (link: string, description: string) => void;

  onClose: () => void;
}

const ImageContentModal = (props: ImageContentModalProps) => {
  const { text } = useI18n();

  // 이미지 컨텐츠의 내용이다.
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // 유효하지 않은 이미지를 추가할 시 방지 대책이다.
  const [confirm, setConfirm] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(!!props.edit);

  // 알림 메시지에 활용된다.
  const [message, setMessage] = useState<boolean>(false);

  const handleLink = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setLink(value);
    },
    []
  );

  const handleDescription = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (value.length <= 40) {
        setDescription(value);
      }
    },
    []
  );

  const handleError = useCallback(() => {
    setConfirm(false);
    setLoad(false);
    setMessage(true);
  }, []);

  const safeClose = useCallback(
    (done: boolean) => {
      if (!!props.edit && !done) {
        setConfirm(true);
        setLoad(true);

        setLink(props.edit.link);
        setDescription(props.edit.description);
      } else {
        setConfirm(false);
        setLoad(false);

        setLink("");
        setDescription("");
      }

      setMessage(false);
      props.onClose();
    },
    [props]
  );

  const handleAddImage = useCallback(() => {
    if (!!props.edit && !!props?.onUpdate) {
      props.onUpdate(link, description);
    } else if (!!props?.onAdd) {
      props.onAdd(link, description);
    }

    safeClose(true);
  }, [props, safeClose, link, description]);

  useEffect(() => {
    // 이미지 편집 창으로 여는 경우 이미지 링크 검증이 이미 끝난 상태이다.
    setConfirm(!!props.edit);

    setLink(props?.edit?.link || "");
    setDescription(props?.edit?.description || "");
  }, [props.edit]);

  return (
    <DefaultModal
      open={props.open}
      onClose={() => safeClose(false)}
      excludeBackgroundPill
    >
      <Style.Container>
        <Title
          {...(!!props.edit
            ? { icon: EditIcon, content: text(I18N.PAGE_CREATE_21) }
            : { icon: AddIcon, content: text(I18N.PAGE_CREATE_15) })}
        />

        <Style.Form>
          <ImagePreview
            link={link}
            description={description}
            available={confirm}
            onError={handleError}
            onLoad={() => setLoad(true)}
            text={text}
          />

          <Style.Inputs>
            <Style.Input>
              <span className="label">{text(I18N.PAGE_CREATE_17)}</span>
              <input
                onChange={handleLink}
                disabled={confirm}
                value={link || ""}
                placeholder={text(I18N.PAGE_CREATE_33)}
                className="input"
              />
            </Style.Input>

            <Style.Input>
              <span className="label">{text(I18N.PAGE_CREATE_18)}</span>
              <input
                onChange={handleDescription}
                value={description || ""}
                placeholder={text(I18N.PAGE_CREATE_22)}
                className="input"
              />
            </Style.Input>
          </Style.Inputs>
        </Style.Form>

        <Style.Buttons>
          {confirm ? (
            <EditButton
              text={text}
              onClick={() => {
                setConfirm(false);
                setLoad(false);
              }}
            />
          ) : (
            <ConfirmButton text={text} onClick={() => setConfirm(true)} />
          )}

          <DoneButton
            text={text}
            onClick={handleAddImage}
            disabled={!(confirm && load && !!description.trim())}
          />
        </Style.Buttons>

        <Message
          message={text(I18N.PAGE_CREATE_23)}
          type="error"
          state={{ open: message, setOpen: setMessage }}
        />
      </Style.Container>
    </DefaultModal>
  );
};

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

const Title = React.memo((props: TitleProps) => (
  <Style.Title>
    <props.icon className="icon" />
    <span className="content">{props.content}</span>
  </Style.Title>
));

const ImagePreview = React.memo((props: ImagePreviewProps) => (
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

const ConfirmButton = React.memo((props: ButtonProps) => (
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

const EditButton = React.memo((props: ButtonProps) => (
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

const DoneButton = React.memo((props: ButtonProps) => (
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

export default ImageContentModal;
