import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  CreateHeaderSignature,
  CreateMenus,
} from "../../components/header/create";

import Page from "../../layouts/page";
import { usePageSelect } from "../../utils/hooks/header/page-select";

import { useSelector } from "react-redux";
import { PillContentData, PillContentType } from "../../utils/pill/pill.type";

import LikeButton from "./buttons/like";
import { useI18n } from "../../utils/hooks/i18n";
import { I18N } from "../../utils/i18n";
import { format } from "../../utils/other/format";

import * as Style from "./create-preview.style";
import ListIcon from "@mui/icons-material/List";
import useResizeObserver from "@react-hook/resize-observer";
import { StaticSelectors as pageSizeSelectors } from "../../utils/reducers/page/size";
import { StaticSelectors as profileSelectors } from "../../utils/reducers/profile";
import { StaticSelectors as selectors } from "../../utils/reducers/editor";

const CreatePreviewPage = () => {
  const { text } = useI18n();
  usePageSelect(CreateHeaderSignature, CreateMenus.PREVIEW);

  const profile = useSelector(profileSelectors.PROFILE);
  const headerHeight = useSelector(pageSizeSelectors.HEADER_HEIGHT);

  const title = useSelector(selectors.PILL_TITLE);
  const categories = useSelector(selectors.CATEGORIES);
  const indexes = useSelector(selectors.INDEXES);

  const [width, setWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<{ [id: string]: HTMLDivElement | null }>({});
  const offsets = useRef<{ [id: string]: number }>({});

  const handleMoveIndex = useCallback((id: string) => {
    const offset = offsets.current[id];
    !!offset && window.scrollTo({ top: offset });
  }, []);

  useEffect(() => {
    indexes.forEach((index) => {
      const ref = refs.current[index.id];
      !!ref &&
        (offsets.current[index.id] =
          window.scrollY + ref.getBoundingClientRect().top - headerHeight - 20);
    });
  }, [indexes, width, headerHeight]);

  useResizeObserver(
    containerRef,
    (_) =>
      !!containerRef?.current &&
      setWidth(containerRef.current.getBoundingClientRect().width)
  );

  return (
    <Page layout={Style.Background}>
      <Style.Container ref={containerRef}>
        <Style.Title>
          <LikeButton />
          <span className="title">
            {title || text(I18N.PAGE_PREVIEW_03)}
          </span>
          <div className="info">
            <span className="user">
              {format(
                text(I18N.PAGE_PREVIEW_01),
                profile.userName || text(I18N.PAGE_PREVIEW_04)
              )}
            </span>
            <div className="categories">
              {categories.map((category) => (
                <div className="category" key={category.categoryId}>
                  {category.category}
                </div>
              ))}
            </div>
          </div>
        </Style.Title>

        <Style.Index>
          <div className="index-title">
            <ListIcon className="icon" />
            <span className="title">{text(I18N.PAGE_PREVIEW_02)}</span>
          </div>
          <div className="index-list">
            {indexes.map((index, order) => (
              <div
                className="index"
                onClick={() => handleMoveIndex(index.id)}
                key={index.id}
              >
                #{order + 1}. {index.title}
              </div>
            ))}
          </div>
        </Style.Index>

        <Style.ContentContainer>
          {indexes.map((index, order) => (
            <Style.Content
              id={`${order + 1}`}
              key={index.id}
              ref={(ref) => (refs.current[index.id] = ref)}
            >
              <div className="title-container">
                <div className="order">#{order + 1}</div>
                <div className="title">{index.title}</div>
              </div>
              <div className="content-container">
                {index.contents.map(resolveContent)}
              </div>
            </Style.Content>
          ))}
        </Style.ContentContainer>
      </Style.Container>
    </Page>
  );
};

const resolveContent = (content: PillContentData) => {
  switch (content.type) {
    case PillContentType.IMAGE:
      return (
        <img
          src={content.content}
          alt={content.subContent}
          key={content.contentId}
        />
      );
    case PillContentType.TEXT:
      return (
        <div className="text" key={content.contentId}>
          {content.content}
        </div>
      );
  }
};

export default CreatePreviewPage;
