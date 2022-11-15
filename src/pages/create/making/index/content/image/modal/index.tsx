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
import { ContentProps, PillContentType } from "../../../../../../../utils/reducers/pill/pill.type";
import { ImageContent } from "..";

interface ImageContentModalProps {
  open: boolean;
  onClose: () => void;

  access: Pick<ContentProps, "id"> & Partial<Pick<ContentProps, "contentId">>;
}

const ImageContentModal = (props: ImageContentModalProps) => {
  const creator = usePillCreator();
  const editMode = props.access.contentId !== undefined;

  // Image Content States
  const [confirm, setConfirm] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Prevention for adding invalid image
  const [load, setLoad] = useState<boolean>(false);

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
    // (= is EditMode)
    if (props.access.contentId !== undefined) {
      const contentId = props.access.contentId;
      creator.withIndex(props.access).updateContent({
        contentId,
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

    props.onClose();
  };

  useLayoutEffect(() => {
    if (props.access.contentId !== undefined) {
      const contentId = props.access.contentId;
      const content = creator.getContent({ id: props.access.id, contentId });

      setConfirm(true);
      setLoad(true);

      setLink(content.content);
      setDescription(content.subContent);
    }
  }, [props.access, creator]);

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
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
        {editMode ? (
          <div className="title">
            <EditIcon className="icon" />
            <span className="content">Edit Image</span>
          </div>
        ) : (
          <div className="title">
            <AddIcon className="icon" />
            <span className="content">Add new Image</span>
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
