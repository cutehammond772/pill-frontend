import * as React from "react";

import { Button, TextField } from "@mui/joy";
import { useState } from "react";

import AddIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import * as Style from "./modal.style";

import Message from "../../../../../../../components/message";
import Modal from "../../../../../../../components/modal";
import { useI18n } from "../../../../../../../utils/hooks/i18n";
import { I18N } from "../../../../../../../utils/i18n";

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
    if (!!props.edit && !!props?.onUpdate) {
      props.onUpdate(link, description);
    } else if (!!props?.onAdd) {
      props.onAdd(link, description);
    }

    safeClose(true);
  };

  const safeClose = (done: boolean) => {
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
            <span className="message">{text(I18N.PAGE_CREATE_16)}</span>
          </div>
        )}
      </Style.ImagePreview>

      <Style.Form>
        {!!props.edit ? (
          <div className="title">
            <EditIcon className="icon" />
            <span className="content">{text(I18N.PAGE_CREATE_21)}</span>
          </div>
        ) : (
          <div className="title">
            <AddIcon className="icon" />
            <span className="content">{text(I18N.PAGE_CREATE_15)}</span>
          </div>
        )}

        <Style.ImageInputForm>
          <TextField
            label={text(I18N.PAGE_CREATE_17)}
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
              {text(I18N.PAGE_CREATE_20)}
            </Button>
          ) : (
            <Button
              variant="solid"
              color="success"
              startDecorator={<CheckIcon />}
              onClick={() => setConfirm(true)}
            >
              {text(I18N.PAGE_CREATE_19)}
            </Button>
          )}
        </Style.ImageInputForm>

        <TextField
          label={text(I18N.PAGE_CREATE_18)}
          variant="soft"
          onChange={handleDescription}
          placeholder={text(I18N.PAGE_CREATE_22)}
          value={description || ""}
        />

        <Button
          disabled={!(confirm && load && !!description.trim())}
          onClick={handleAddImage}
        >
          {text(I18N.PAGE_CREATE_24)}
        </Button>
      </Style.Form>

      <Message
        message={text(I18N.PAGE_CREATE_23)}
        type="error"
        state={{ open: message, setOpen: setMessage }}
      />
    </Modal>
  );
};

export default ImageContentModal;
