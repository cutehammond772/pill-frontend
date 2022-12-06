import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";
import { usePillDefaultEditor } from "../../../../utils/hooks/editor";
import { I18N } from "../../../../utils/i18n";
import { useI18n } from "../../../../utils/hooks/i18n";

import * as Style from "./category.style";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { validateCategory } from "../validation";

interface AddCategoryButtonProps {
  onAdd: (category: string) => void;
}

export const AddCategoryButton = (props: AddCategoryButtonProps) => {
  const { text } = useI18n();
  const editor = usePillDefaultEditor();

  const [edit, setEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const toggleEdit = useCallback(() => {
    setEdit((edit) => !edit);
    setContent("");
  }, []);

  const handleContent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      const validateMsg = validateCategory(value);

      if (!!validateMsg) {
        enqueueSnackbar(text(validateMsg), {
          variant: "error",
          preventDuplicate: true,
        });
        return;
      }

      setContent(value);
    },
    [text, enqueueSnackbar]
  );

  const handleEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        if (
          editor.categories.find((category) => category.category === content)
        ) {
          enqueueSnackbar(text(I18N.PAGE_CREATE_37), {
            variant: "error",
            preventDuplicate: true,
          });

          return;
        }

        setEdit(false);
        !!content && props.onAdd(content);
      }
    },
    [editor, content, text, enqueueSnackbar, props]
  );

  // 카테고리 추가 Animation
  useEffect(() => {
    if (!containerRef?.current) {
      return;
    }

    if (edit) {
      containerRef.current.style.width = Style.EDIT_WIDTH;
    } else {
      containerRef.current.style.width = Style.BUTTON_WIDTH;
    }
  }, [edit]);

  return (
    <Style.Container ref={containerRef}>
      {edit ? (
        <Style.Input
          onChange={handleContent}
          onBlur={toggleEdit}
          onKeyDown={handleEnter}
          value={content || ""}
          placeholder={text(I18N.PAGE_CREATE_06)}
          autoFocus
        />
      ) : (
        <Style.Button onClick={toggleEdit} addButton>
          <span className="title">{text(I18N.PAGE_CREATE_05)}</span>
          <AddIcon />
        </Style.Button>
      )}
    </Style.Container>
  );
};

export interface CategoryProps {
  category: string;
  onRemove: () => void;
  disabled?: boolean;
}

export const CategoryButton = React.memo((props: CategoryProps) => {
  return (
    <Style.Button onClick={props.onRemove} disabled={props.disabled}>
      <span className="title">{props.category}</span>
      <CloseIcon />
    </Style.Button>
  );
});
