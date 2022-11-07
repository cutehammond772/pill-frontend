import * as React from "react";

import { Button, TextField } from "@mui/joy";

import { Transition } from "react-transition-group";
import { useState } from "react";

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
import { usePillCreator } from "../../../../../../../utils/hooks/pill_creator";

interface ImageContentModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: AddFunction;

  editIndex?: { index: number; contentIndex: number };
}

const ImageContentModal = (props: ImageContentModalProps) => {
  const creator = usePillCreator();
  const editData = !!props.editIndex
    ? creator.data.indexes[props.editIndex.index].contents[
        props.editIndex.contentIndex
      ]
    : undefined;

  // Image Content States
  const [confirm, setConfirm] = useState<boolean>(!!editData);
  const [link, setLink] = useState<string>(editData?.content || "");
  const [description, setDescription] = useState<string>(
    editData?.subContent || ""
  );

  // Prevention for adding broken image
  const [load, setLoad] = useState<boolean>(!!editData);

  // Message
  const [imgInvalidMsg, setImgInvalidMsg] = useState<boolean>(false);
  let afterAdd: boolean = false;

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

  //
  const handleInvalidImageError = () => {
    setConfirm(false);
    setLoad(false);

    setImgInvalidMsg(true);
  };

  const handleAddImage = () => {
    props.onAdd({
      type: PillContentType.IMAGE,
      content: link,
      subContent: description,
    });

    afterAdd = true;
    safeClose();
  };

  // Resetting Values
  // 컴포넌트가 언마운트되지 않는 이상 기존 내용이 계속 유지되기 때문에 이를 고려해야 한다.
  const resetInformation = () => {
    if (!!editData) {
      setConfirm(true);
      setLoad(true);

      if (afterAdd) {
        // Edit 과정에서 변경 발생 시(= Done 누를 시)
        // afterAdd가 true이면 변경이 확실하므로 link와 description 값을 유지한다.
        afterAdd = false;
      } else {
        // Edit 과정에서 그냥 Modal를 빠져나갈 때
        // 컨텐츠 내용이 바뀌었을 수 있으므로 기존 내용으로 다시 채운다.

        setLink(editData.content);
        setDescription(editData.subContent || "");
      }
    } else {
      // 일반적인 Add 과정
      // 닫을 때마다 내용을 비운다.
      setConfirm(false);
      setLoad(false);

      setLink("");
      setDescription("");
    }

    setImgInvalidMsg(false);
  };

  const safeClose = () => {
    props.onClose();
    resetInformation();
  };

  return (
    <Transition in={props.open} timeout={200}>
      {(state) => (
        <ModalStyle
          keepMounted
          disableScrollLock
          state={state}
          open={!["exited", "exiting"].includes(state)}
          onClose={safeClose}
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
              {!!editData ? (
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
              </ImageInputFormStyle>

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
