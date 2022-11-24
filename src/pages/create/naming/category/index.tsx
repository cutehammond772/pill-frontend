import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";

import * as Style from "./category.style";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { usePillDefaultEditor } from "../../../../utils/hooks/pill_creator";
import { L10N } from "../../../../localization";
import { useLocalization } from "../../../../utils/hooks/localization";

const validateContent = (value: string) => {
  if (value.trim() !== value) {
    return "공백이 들어갈 수 없습니다.";
  }

  if (!!value && !value.match("^(([a-zA-Z]+)|([ㅏ-ㅣㄱ-ㅎ가-힣]+))$")) {
    return "카테고리는 영어와 한글 중 한 언어로만 입력할 수 있습니다.";
  }

  if (value.length > 10) {
    return "카테고리의 글자 수는 10자를 넘길 수 없습니다.";
  }

  return null;
};

interface CategoryProps {
  category: string;
  onRemove: () => void;
  disabled?: boolean;
}

const CategoryButton = React.memo((props: CategoryProps) => {
  return (
    <Style.Button
      onClick={props.onRemove}
      disabled={props.disabled}
    >
      <span className="title">{props.category}</span>
      <CloseIcon />
    </Style.Button>
  );
});

interface AddCategoryButtonProps {
  onAdd: (category: string) => void;
}

const AddCategoryButton = (props: AddCategoryButtonProps) => {
  const { text } = useLocalization();
  const editor = usePillDefaultEditor();

  const [edit, setEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);

  const { enqueueSnackbar } = useSnackbar();
  const toggleEdit = () => {
    setEdit(!edit);
    setContent("");
  };

  const handleContent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const validateMsg = validateContent(value);

      if (!!validateMsg) {
        enqueueSnackbar(validateMsg, {
          variant: "error",
          preventDuplicate: true,
        });
        return;
      }

      setContent(value);
    },
    [enqueueSnackbar]
  );

  const handleEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        if (editor.categories.find((category) => category.category === content)) {
          enqueueSnackbar("이미 존재하는 카테고리입니다.", {
            variant: "error",
            preventDuplicate: true,
          });

          return;
        }
        setEdit(false);
        !!content && props.onAdd(content);
      }
    },
    [editor, content, enqueueSnackbar, props]
  );

  // toggle transition
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
        <Style.InputField
          onChange={handleContent}
          onBlur={toggleEdit}
          onKeyDown={handleEnter}
          value={content || ""}
          placeholder={text(L10N.PAGE_CREATE_06)}
          autoFocus
        />
      ) : (
        <Style.Button onClick={toggleEdit} addButton>
          <span className="title">{text(L10N.PAGE_CREATE_05)}</span>
          <AddIcon />
        </Style.Button>
      )}
    </Style.Container>
  );
};

export { CategoryButton, type CategoryProps, AddCategoryButton };
