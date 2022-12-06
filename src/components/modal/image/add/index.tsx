import * as React from "react";

import { useState, useCallback } from "react";

import Message from "../../../message";
import { useI18n } from "../../../../utils/hooks/i18n";
import { I18N } from "../../../../utils/i18n";
import { DefaultModal } from "../../../../layouts/modal/default";
import { usePillIndexEditor } from "../../../../utils/hooks/editor";
import { PillContentType } from "../../../../utils/pill/pill.type";

import * as Style from "../image.style";
import AddIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  ConfirmButton,
  DoneButton,
  EditButton,
  ImagePreview,
  Title,
} from "../image.components";
import { CustomModalProps } from "../../../../layouts/modal/modal.type";
import { useSelector } from "react-redux";
import { RootState } from "../../../../utils/reducers";

export interface AddImageContentModalProps {
  id: string;
}

const AddImageContentModal = (props: CustomModalProps) => {
  const { id } = useSelector(
    (state: RootState) => state.modal.data[props.modalID]
  ) as AddImageContentModalProps;

  const { text } = useI18n();
  const editor = usePillIndexEditor(id);

  // 이미지 컨텐츠의 내용이다.
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // 유효하지 않은 이미지를 추가할 시 방지 대책이다.
  const [confirm, setConfirm] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);

  // 알림 메시지에 활용된다.
  const [message, setMessage] = useState<boolean>(false);

  const handleDescription = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      // 수정*
      if (value.length <= 40) {
        setDescription(value);
      }
    },
    []
  );

  const handleAdd = useCallback(() => {
    editor.addContent(PillContentType.IMAGE, link, description);
    props.onClose();
  }, [props, editor, link, description]);

  return (
    <DefaultModal
      open={props.open}
      onClose={props.onClose}
      modalID={props.modalID}
      excludeBackgroundPill
    >
      <Style.Container>
        <Title icon={AddIcon} content={text(I18N.PAGE_CREATE_15)} />

        <Style.Form>
          <ImagePreview
            link={link}
            description={description}
            available={confirm}
            onError={() => {
              setConfirm(false);
              setLoad(false);
              setMessage(true);
            }}
            onLoad={() => setLoad(true)}
            text={text}
          />

          <Style.Inputs>
            <Style.Input>
              <span className="label">{text(I18N.PAGE_CREATE_17)}</span>
              <input
                onChange={(event) => setLink(event.target.value)}
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
            onClick={handleAdd}
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

export default AddImageContentModal;
