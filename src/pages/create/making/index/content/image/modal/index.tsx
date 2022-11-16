import * as React from "react";

import { Button, TextField } from "@mui/joy";
import { useState, useLayoutEffect } from "react";

import AddIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import * as Style from "./modal.style";

import { Message } from "../../../../../../../components/message";
import { usePillCreator } from "../../../../../../../utils/hooks/pill_creator";
import { Modal } from "../../../../../../../components/modal";
import {
  ContentProps,
  PillContentType,
} from "../../../../../../../utils/reducers/pill/pill.type";

interface ImageContentModalProps {
  open: boolean;
  onClose: () => void;
  editMode?: boolean;

  access: ContentProps;
}

const ImageContentModal = (props: ImageContentModalProps) => {
  const creator = usePillCreator();

  if (!!props.editMode && !props.access.contentId) {
    throw new Error();
  }

  // Image Content States
  const [confirm, setConfirm] = useState<boolean>(!!props.editMode);
  const [link, setLink] = useState<string>(
    !!props.editMode ? creator.getContent(props.access).content : ""
  );
  const [description, setDescription] = useState<string>(
    !!props.editMode ? creator.getContent(props.access).subContent : ""
  );

  // Prevention for adding invalid image
  const [load, setLoad] = useState<boolean>(!!props.editMode);

  // Message
  const [message, setMessage] = useState<boolean>(false);

  // TextField Handlers
  const handleLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setLink(value);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length <= 40) {
      setDescription(value);
    }
  };

  const handleError = () => {
    setConfirm(false);
    setLoad(false);
    setMessage(true);
  };

  const handleAddImage = () => {
    if (!!props.editMode) {
      creator.withIndex(props.access).updateContent({
        contentId: props.access.contentId,
        content: link,
        subContent: description,
      });
    } else {
      creator.withIndex(props.access).addContent({
        contentType: PillContentType.IMAGE,
        content: link,
        subContent: description,
      });
    }

    safeClose(true);
  };

  const safeClose = (done: boolean) => {
    if (!!props.editMode) {
      if (!done) {
        const content = creator.getContent(props.access);

        setConfirm(true);
        setLoad(true);

        setLink(content.content);
        setDescription(content.subContent);
      }
    } else {
      setConfirm(false);
      setLoad(false);

      setLink("");
      setDescription("");
    }

    setMessage(false);
    props.onClose();
  };

  return (
    <Modal
      open={props.open}
      onClose={() => safeClose(false)}
      layout={Style.Layout}
      closeButton
    >
      <Style.ImagePreview>
        {confirm ? (
          <img
            src={link}
            alt={description}
            onError={handleError}
            onLoad={() => setLoad(true)}
            className="image"
          />
        ) : (
          <div className="preview">
            <ImageSearchIcon className="icon" />
            <span className="message">
              Type Image Link and press Confirm to check the Preview before
              adding the image.
            </span>
          </div>
        )}
      </Style.ImagePreview>

      <Style.Form>
        {!!props.editMode ? (
          <div className="title">
            <EditIcon className="icon" />
            <span className="content">이미지 편집</span>
          </div>
        ) : (
          <div className="title">
            <AddIcon className="icon" />
            <span className="content">이미지 추가</span>
          </div>
        )}

        <Style.ImageInputForm>
          <TextField
            label="Image Link"
            variant="soft"
            color="neutral"
            fullWidth
            onChange={handleLink}
            disabled={confirm}
            value={link || ""}
          />

          {confirm ? (
            <Button
              variant="solid"
              color="info"
              startDecorator={<EditIcon />}
              onClick={() => {
                setConfirm(false);
                setLoad(false);
              }}
            >
              Change
            </Button>
          ) : (
            <Button
              variant="solid"
              color="success"
              startDecorator={<CheckIcon />}
              onClick={() => setConfirm(true)}
            >
              Confirm
            </Button>
          )}
        </Style.ImageInputForm>

        <TextField
          label="Description"
          variant="soft"
          onChange={handleDescription}
          placeholder="~40 characters"
          value={description || ""}
        />

        <Button
          disabled={!(confirm && load && !!description.trim())}
          onClick={handleAddImage}
        >
          Done
        </Button>
      </Style.Form>

      <Message
        message="Invalid Image Link."
        type="error"
        callback={{ open: message, setOpen: setMessage }}
      />
    </Modal>
  );
};

export { ImageContentModal };
