import * as React from "react";

import { IndexContainerStyle } from "./index.style";

import { Title } from "./title";
import { AddContent } from "./content/add";
import { ImageContent } from "./content/image";
import { usePillCreator } from "../../../../utils/hooks/pill_creator";

import { Collapse } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { ElementWithTransition } from "../making.type";
import {
  PillContentData,
  PillContentType,
} from "../../../../utils/reducers/pill/pill.type";
import {
  ExchangeType,
  RemoveType,
  UpdateOrderType,
} from "../../../../utils/hooks/pill_creator/pill_creator.type";
import { TextContent } from "./content/text";

interface IndexContainerProps {
  index: number;
  onRemove: () => void;
}

// 아래의 useState 변수들은 상위 Index 요소가 변경될 때마다 초기화된다는 점에 유의한다.
const IndexContainer = React.forwardRef<HTMLDivElement, IndexContainerProps>(
  (props, ref) => {
    const creator = usePillCreator();

    // 아래의 변수들은 컨텐츠 삭제 시에만 이용하므로 위의 유의에 대비할 필요가 없다.
    const [afterRemove, setAfterRemove] = useState<boolean>(false);
    const [removeContentIndex, setRemoveContentIndex] = useState<number>(-1);

    // 아래와 같이 Transition을 위한 Wrapper는 실질적으로 render에 관련된 변수이므로 대비가 필요하다.
    const [contents, setContents] = useState<Array<ElementWithTransition>>(
      creator.data.indexes[props.index].contents.map((content) => ({
        transition: true,
        removed: false,
        key: content.key,
      }))
    );

    // 이때 Wrapper만 추가되며 실질적인 추가는 개별 컨텐츠의 로직에서 일어난다.
    const handleAddContent = () => {
      setContents(
        contents.concat({
          transition: false,
          removed: false,
          key: contents.length,
        })
      );

      setAfterRemove(false);
    };

    const handleRemoveContent = useCallback(
      (contentIndex: number) => {
        setContents(
          contents.map((content) =>
            content.key === contentIndex
              ? { ...content, removed: true }
              : content
          )
        );

        setRemoveContentIndex(contentIndex);
        setAfterRemove(false);
      },
      [contents]
    );

    const handleUpdateContentOrder = () => {
      creator.remove(RemoveType.INDEX_CONTENT, {
        index: props.index,
        contentIndex: removeContentIndex,
      });

      creator.updateOrder(UpdateOrderType.INDEX_CONTENT, {
        index: props.index,
      });

      setContents(
        contents
          .filter((content) => !content.removed)
          .map((content, contentIndex) => ({ ...content, key: contentIndex }))
      );

      setRemoveContentIndex(-1);
      setAfterRemove(true);
    };

    const handleExchange = useCallback(
      (contentIndex: number, exchangeContentIndex: number) => {
        creator.exchange(ExchangeType.INDEX_CONTENT, {
          index: props.index,
          contentIndex: contentIndex,
          exchangeContentIndex: exchangeContentIndex,
        });
      },
      [creator, props.index]
    );

    const resolve = useCallback(
      (data: PillContentData, index: number) => {
        switch (data.type) {
          case PillContentType.IMAGE:
            return (
              <ImageContent
                onRemove={() => handleRemoveContent(data.key)}
                key={data.key}
                access={{ index: index, contentIndex: data.key }}
                onExchange={handleExchange}
              />
            );
          case PillContentType.TEXT:
            return (
              <TextContent
                onRemove={() => handleRemoveContent(data.key)}
                key={data.key}
                access={{ index: index, contentIndex: data.key }}
                onExchange={handleExchange}
              />
            );
        }
      },
      [handleRemoveContent, handleExchange]
    );

    useEffect(() => {
      /* 새로 생긴 Content의 Transition 변화 */
      if (
        !!contents
          .filter((content) => !content.removed)
          .find((content) => !content.transition)
      ) {
        setContents(
          contents.map((content) =>
            !content.removed && !content.transition
              ? { ...content, transition: true }
              : content
          )
        );
      }

      /* 삭제될 Content의 Transition 변화 */
      if (
        !!contents
          .filter((content) => content.removed)
          .find((content) => content.transition)
      ) {
        setContents(
          contents.map((content) =>
            content.removed && content.transition
              ? { ...content, transition: false }
              : content
          )
        );
      }
    }, [contents]);

    const { onRemove, ...refProps } = props;

    return (
      <IndexContainerStyle ref={ref} {...refProps}>
        <Title index={props.index} onRemove={props.onRemove} />

        {contents.map((content) => {
          const data: PillContentData =
            creator.data.indexes[props.index].contents[content.key];

          const element = resolve(data, props.index);

          if (!afterRemove) {
            return (
              <Collapse
                in={content.transition}
                key={content.key}
                onExited={handleUpdateContentOrder}
              >
                {element}
              </Collapse>
            );
          }

          return element;
        })}

        <AddContent addWrapper={handleAddContent} index={props.index} />
      </IndexContainerStyle>
    );
  }
);

export { IndexContainer };
