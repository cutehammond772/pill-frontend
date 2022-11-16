import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";

import * as Style from "./category.style";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { usePillCreator } from "../../../../utils/hooks/pill_creator";
import { CategoryProps } from "../../../../utils/reducers/pill/pill.type";

const validateText = (value: string) => {
  if (value.trim() !== value) {
    return "공백이 들어갈 수 없습니다.";
  }

  if (!!value && !value.match("^(([a-zA-z]+)|([ㅏ-ㅣㄱ-ㅎ가-힣]+))$")) {
    return "카테고리는 영어와 한글 중 한 언어로만 입력할 수 있습니다.";
  }

  if (value.length > 10) {
    return "카테고리의 글자 수는 10자를 넘길 수 없습니다.";
  }

  return null;
};

// onClick 등을 통해 이벤트 핸들러를 상위 컴포넌트에 위임하는 방법도 있을 것이다.
const Category = (props: CategoryProps) => {
  const creator = usePillCreator();

  const handleClick = useCallback(() => {
    creator.removeCategory(props);
  }, [creator, props]);

  const removed = !creator.data.categories.find(
    (category) => category.categoryId === props.categoryId
  );

  return (
    <Style.Button
      customBackground="var(--shadow)"
      onClick={handleClick}
      disabled={removed}
    >
      <span className="title">{props.category}</span>
      <CloseIcon />
    </Style.Button>
  );
};

const AddCategory = () => {
  const creator = usePillCreator();

  const [edit, setEdit] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);

  const { enqueueSnackbar } = useSnackbar();
  const toggleEdit = () => {
    setEdit(!edit);
    setText("");
  };

  const handleText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const validateMsg = validateText(value);

      if (!!validateMsg) {
        enqueueSnackbar(validateMsg, {
          variant: "error",
          preventDuplicate: true,
        });
        return;
      }

      setText(value);
    },
    [enqueueSnackbar]
  );

  const handleEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        if (
          creator.data.categories.find((category) => category.category === text)
        ) {
          enqueueSnackbar("이미 존재하는 카테고리입니다.", {
            variant: "error",
            preventDuplicate: true,
          });

          return;
        }
        setEdit(false);

        if (!!text) {
          creator.addCategory({ category: text });
        }
      }
    },
    [creator, text, enqueueSnackbar]
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
          onChange={handleText}
          onBlur={toggleEdit}
          onKeyDown={handleEnter}
          value={text || ""}
          placeholder="Enter 키로 추가"
          autoFocus
        />
      ) : (
        <Style.Button onClick={toggleEdit} addButton>
          <span className="title">추가</span>
          <AddIcon />
        </Style.Button>
      )}
    </Style.Container>
  );
};

export { Category, AddCategory };
