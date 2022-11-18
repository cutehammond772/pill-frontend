import * as React from "react";

import { Button, TextField } from "@mui/joy";
import { useState } from "react";

import AddIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import * as Style from "./modal.style";

import { Message } from "../../../../../../../components/message";
import { Modal } from "../../../../../../../components/modal";

interface ImageContentEditProps {
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
  // Image Content
  const [confirm, setConfirm] = useState<boolean>(!!props.edit);
  const [link, setLink] = useState<string>(props?.edit?.link || "");
  const [description, setDescription] = useState<string>(
    props?.edit?.description || ""
  );

  // Prevention for adding invalid image
  const [load, setLoad] = useState<boolean>(!!props.edit);

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
    if (!!props.edit) {
      if (!!props?.onUpdate) {
        props.onUpdate(link, description);
      }
    } else {
      if (!!props?.onAdd) {
        props.onAdd(link, description);
      }
    }

    safeClose(true);
  };

  const safeClose = (done: boolean) => {
    if (!!props.edit) {
      if (!done) {
        setConfirm(true);
        setLoad(true);

        setLink(props.edit.link);
        setDescription(props.edit.description);
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
        {!!props.edit ? (
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

export { ImageContentModal, type ImageContentEditProps };
