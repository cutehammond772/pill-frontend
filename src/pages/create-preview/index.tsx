import * as React from "react";

import {
  CreateHeaderSignature,
  CreateMenus,
} from "../../components/header/create";

import { Page } from "../../layouts/page";
import { usePageSelect } from "../../utils/hooks/header/page-select";

import * as Style from "./create-preview.style";
import ListIcon from "@mui/icons-material/List";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/reducers";
import { PillContentData, PillContentType } from "../../utils/pill/pill.type";

import { useNavigate } from "react-router-dom";
import LikeButton from "./buttons/like";
import { useI18n } from "../../utils/hooks/i18n";
import { I18N } from "../../utils/i18n";
import { format } from "../../utils/other/format";

const CreatePreviewPage = () => {
  const { text } = useI18n();
  usePageSelect(CreateHeaderSignature, CreateMenus.PREVIEW);
  const navigate = useNavigate();

  const pill = useSelector((state: RootState) => state.editor);
  const profile = useSelector((state: RootState) => state.profile);

  return (
    <Page layout={Style.Background}>
      <Style.Container>
        <Style.Title>
          <LikeButton />
          <span className="title">
            {pill.title || text(I18N.PAGE_PREVIEW_03)}
          </span>
          <div className="info">
            <span className="user">
              {format(
                text(I18N.PAGE_PREVIEW_01),
                profile.userName || text(I18N.PAGE_PREVIEW_04)
              )}
            </span>
            <div className="categories">
              {pill.categories.map((category) => (
                <div className="category" key={category.categoryId}>
                  {category.category}
                </div>
              ))}
            </div>
          </div>
        </Style.Title>

        <Style.Index>
          <div className="index_title">
            <ListIcon className="icon" />
            <span className="title">{text(I18N.PAGE_PREVIEW_02)}</span>
          </div>
          <div className="index_list">
            {pill.indexes.map((index, order) => (
              <div
                className="index"
                onClick={() => navigate(`/create/preview#${order + 1}`)}
                key={index.id}
              >
                #{order + 1}. {index.title}
              </div>
            ))}
          </div>
        </Style.Index>

        <Style.ContentContainer>
          {pill.indexes.map((index, order) => (
            <Style.Content id={`${order + 1}`} key={index.id}>
              <div className="title_container">
                <div className="order">#{order + 1}</div>
                <div className="title">{index.title}</div>
              </div>
              <div className="content_container">
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
