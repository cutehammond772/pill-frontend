import * as React from "react";

import {
  CreateHeaderSignature,
  CreateMenu,
} from "../../components/header/create";

import { Page } from "../../layouts/page";
import { usePageSelect } from "../../utils/hooks/header/page_select";

import * as Style from "./create_preview.style";
import ListIcon from "@mui/icons-material/List";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/reducers";
import {
  PillContentData,
  PillContentType,
} from "../../utils/reducers/pill/pill.type";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "./buttons/like";

const CreatePreviewPage = () => {
  usePageSelect(CreateHeaderSignature, CreateMenu.PREVIEW);
  const navigate = useNavigate();

  const pill = useSelector((state: RootState) => state.pill);
  const profile = useSelector((state: RootState) => state.profile);

  return (
    <Page layout={Style.Background}>
      <Style.Container>
        <Style.Title>
          <LikeButton />
          <span className="title">{pill.title || "Untitled"}</span>
          <div className="info">
            <span className="user">by {profile.userName || "Guest"}</span>
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
            <span className="title">목차</span>
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

export { CreatePreviewPage };
