import { Container } from "../container";
import { Layout } from "./making.style";
import { AddIndex, IndexContainer } from "./index/index";

import * as React from "react";
import { useEffect } from "react";

import { usePillCreator } from "../../../utils/hooks/pill_creator";
import {
  AddType,
  RemoveType,
  UpdateOrderType,
} from "../../../utils/hooks/pill_creator/pill_creator.type";

import { Collapse } from "@mui/material";
import { useState } from "react";
import { IndexWithTransition } from "./making.type";

// 인덱스 제거 후 순서가 업데이트되도록 한다.
const Content = () => {
  const creator = usePillCreator();
  const [afterRemove, setAfterRemove] = useState<boolean>(false);
  const [removeIndex, setRemoveIndex] = useState<number>(-1);

  /* Wrapped Indexes for 'Transition' */
  const [indexes, setIndexes] = useState<Array<IndexWithTransition>>([]);

  const handleAdd = () => {
    // dispatch 후 바로 반영되지 않음에 유의한다.
    creator.add(AddType.INDEX);
    setIndexes(
      indexes.concat({
        transition: false,
        removed: false,
        key: indexes.length,
      })
    );

    setAfterRemove(false);
  };

  const handleRemove = (index: number) => {
    setIndexes(
      indexes.map((indexObj) =>
        indexObj.key === index
          ? { ...indexObj, removed: true }
          : {
              ...indexObj,
              initialTitle: creator.data.indexes[indexObj.key].title,
            }
      )
    );

    setRemoveIndex(index);
    setAfterRemove(false);
  };

  const handleUpdateOrder = () => {
    creator.remove(RemoveType.INDEX, { index: removeIndex });
    creator.updateOrder(UpdateOrderType.INDEX);

    setIndexes(
      indexes
        .filter((indexObj) => !indexObj.removed)
        .map((indexObj, index) => ({ ...indexObj, key: index }))
    );
    setRemoveIndex(-1);
    setAfterRemove(true);
  };

  // render 후에 호출된다.

  // ex. Index 추가 시
  // 1. <AddIndex> 버튼을 통해 handleAdd 호출 -> indexes에 새로운 index 추가됨
  // 2. indexes가 변경됨으로써 re-render
  // 3. re-render 후 아래 useEffect 호출
  // 4. useEffect에서 indexes가 변경되면 다시 re-render
  useEffect(() => {
    /* 새로 생긴 Index의 Transition 변화 */
    if (
      !!indexes
        .filter((indexObj) => !indexObj.removed)
        .find((indexObj) => !indexObj.transition)
    ) {
      setIndexes(
        indexes.map((indexObj) =>
          !indexObj.removed && !indexObj.transition
            ? { ...indexObj, transition: true }
            : indexObj
        )
      );
    }

    /* 삭제될 Index의 Transition 변화 */
    if (
      !!indexes
        .filter((indexObj) => indexObj.removed)
        .find((indexObj) => indexObj.transition)
    ) {
      setIndexes(
        indexes.map((indexObj) =>
          indexObj.removed && indexObj.transition
            ? { ...indexObj, transition: false }
            : indexObj
        )
      );
    }
  }, [indexes]);

  return (
    <Container title="2. Making Pill" complete={false} layout={Layout}>
      {indexes.map((index) => {
        const container = (
          <IndexContainer
            key={index.key}
            index={index.key}
            onRemove={() => handleRemove(index.key)}
          />
        );

        if (!afterRemove) {
          return (
            <Collapse
              in={index.transition}
              key={index.key}
              onExited={handleUpdateOrder}
            >
              {container}
            </Collapse>
          );
        }

        return container;
      })}

      <AddIndex onClick={handleAdd} />
    </Container>
  );
};

export { Content };
