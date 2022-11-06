import * as React from "react";

import { Button, TextField } from "@mui/joy";

import { Transition } from "react-transition-group";
import { useState, useEffect } from "react";

import AddIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import {
  ModalStyle,
  ModalDialogStyle,
  ImagePreview,
  CloseButton,
  FormStyle,
  ImageInputFormStyle,
} from "./modal.style";
import {
  AddFunction,
  PillContentType,
} from "../../../../../../../utils/reducers/pill/pill.type";

import { Message } from "../../../../../../../components/message";

const ImageContentModal = ({
  open,
  onClose,
  onAdd,
  editIndex,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: AddFunction;

  editIndex?: number;
}) => {
  // Image Content States
  const [confirm, setConfirm] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Prevention for adding broken image
  const [load, setLoad] = useState<boolean>(false);

  // Cleaning After Closing Modal
  const [clean, setClean] = useState<boolean>(false);

  // Message
  const [imgInvalidMsg, setImgInvalidMsg] = useState<boolean>(false);

  // TextField Handlers
  const handleLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLink(value);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDescription(value);
  };

  //
  const handleInvalidImageError = () => {
    setConfirm(false);
    setLoad(false);

    setImgInvalidMsg(true);
  };

  const handleAddImage = () => {
    onAdd({
      type: PillContentType.IMAGE,
      content: link,
      subContent: description,
    });

    safeClose();
  };

  // Cleaning Values
  const cleanInformation = () => {
    setConfirm(false);
    setLoad(false);

    setLink("");
    setDescription("");
    setClean(true);

    setImgInvalidMsg(false);
  };

  const safeClose = () => {
    onClose();
    cleanInformation();
  };

  useEffect(() => {
    if (clean) {
      // 이미 render 시에 clean되었으므로 false로 다시 초기화한다.
      setClean(false);
    }
  }, [clean]);

  return (
    <Transition in={open} timeout={200}>
      {(state) => (
        <ModalStyle
          keepMounted
          disableScrollLock
          open={!["exited", "exiting"].includes(state)}
          onClose={safeClose}
          state={state}
        >
          <ModalDialogStyle state={state}>
            <ImagePreview>
              {confirm ? (
                <img
                  src={link}
                  alt={description}
                  onError={handleInvalidImageError}
                  onLoad={() => setLoad(true)}
                />
              ) : (
                <div>
                  <ImageSearchIcon />
                  <span>
                    Type Image Link and press Confirm to check the Preview
                    before adding the image.
                  </span>
                </div>
              )}
            </ImagePreview>

            <FormStyle>
              {editIndex !== undefined ? (
                <div>
                  <EditIcon />
                  <span>Edit Image</span>
                </div>
              ) : (
                <div>
                  <AddIcon />
                  <span>Add new Image</span>
                </div>
              )}

              <ImageInputFormStyle>
                <TextField
                  label="Image Link"
                  variant="soft"
                  color="neutral"
                  fullWidth
                  onChange={handleLink}
                  disabled={confirm}
                  {...(clean && { value: "" })}
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
              </ImageInputFormStyle>

              <TextField
                label="Description"
                variant="soft"
                onChange={handleDescription}
                {...(clean && { value: "" })}
              />

              <Button
                disabled={!(confirm && load && !!description.trim())}
                onClick={handleAddImage}
              >
                Done
              </Button>
            </FormStyle>

            <CloseButton
              size="sm"
              color="neutral"
              variant="plain"
              onClick={safeClose}
            >
              <CloseIcon />
            </CloseButton>

            <Message
              message="Invalid Image Link."
              type="error"
              callback={{ open: imgInvalidMsg, setOpen: setImgInvalidMsg }}
            />
          </ModalDialogStyle>
        </ModalStyle>
      )}
    </Transition>
  );
};

export { ImageContentModal };
