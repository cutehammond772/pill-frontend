import * as React from "react";

import { Page } from "../../layouts/page";
import { usePageCheck } from "../../utils/hooks/header/page_check";
import {
  DefaultHeaderSignature,
  DefaultMenu,
} from "../../components/header/default";

import * as Style from "./explore.style";

import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import TagIcon from "@mui/icons-material/Tag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import TitleIcon from "@mui/icons-material/Title";
import PropaneIcon from "@mui/icons-material/Propane";
import { Pagination, PaginationItem } from "@mui/material";
import { Option, Select, TextField } from "@mui/joy";

const ExplorePage = () => {
  // DefaultHeader에서 Search 아이템을 선택한다.
  usePageCheck(DefaultHeaderSignature, DefaultMenu.EXPLORE);

  return (
    <Page>
      <Style.Container>
        <Style.Title>당신에게 딱 맞는 Pill을 찾아보아요.</Style.Title>
        <SearchBar placeholder="내용이 기억이 안 난다면, 작성자를 입력해 보세요." />
        <Style.SearchOptions>
          <SearchOption name="ALL" checked />
          <SearchOption name="TITLE" />
          <SearchOption name="INDEX" />
          <SearchOption name="CONTENT" />
          <SearchOption name="AUTHOR" />
        </Style.SearchOptions>

        <Style.ResultContainer>
          <AuthorResult
            userName="cutehammond"
            keyword="hammond"
            pills={236}
            comments={102}
          />

          <TitleResult
            userName="cutehammond"
            title="How to make a good dip"
            keyword="to make a"
          />

          <IndexResult
            userName="cutehammond"
            title="Difficulties of Front-End Developer"
            pillTitle="How to be a good FE developer"
            index={3}
            keyword="Difficulties"
          />
        </Style.ResultContainer>

        <Style.PageOptions>
          <Pagination
            count={10}
            hidePrevButton
            hideNextButton
            renderItem={(item) => (
              <PaginationItem
                {...{ ...item, size: "large" }}
                sx={{
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              />
            )}
          />

          <Select defaultValue="10">
            <Option value="10">10개씩 보기</Option>
            <Option value="20">20개씩 보기</Option>
            <Option value="30">30개씩 보기</Option>
            <Option value="40">40개씩 보기</Option>
            <Option value="50">50개씩 보기</Option>
          </Select>
        </Style.PageOptions>
      </Style.Container>
    </Page>
  );
};

interface SearchBarProps {
  placeholder: string;
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <Style.SearchBar>
      <SearchIcon className="icon" />
      <TextField
        placeholder={props.placeholder}
        variant="plain"
        componentsProps={{
          input: {
            style: {
              fontSize: "30px",
              padding: "10px",
              borderRadius: "15px",
            },
          },
        }}
        fullWidth
      />
    </Style.SearchBar>
  );
};

const Result = (
  props: React.PropsWithChildren<{
    typeIcon: React.ComponentType<{ className: string }>;
  }>
) => (
  <Style.Result>
    <props.typeIcon className="type" />
    <Style.ResultContent>{props.children}</Style.ResultContent>
    <ArrowForwardIcon className="goto" />
  </Style.Result>
);

const ResultTitle = (props: {
  title: string;
  subText?: string;
  keyword: string;
}) => {
  const offset = props.title.indexOf(props.keyword);

  return (
    <Style.ResultTitle>
      <span className="title">
        {offset === -1 ? (
          props.title
        ) : (
          <>
            {props.title.slice(0, offset)}
            <span className="keyword">
              {props.title.slice(offset, offset + props.keyword.length)}
            </span>
            {props.title.slice(
              offset + props.keyword.length,
              props.title.length
            )}
          </>
        )}
      </span>
      <span className="subText">{props.subText}</span>
    </Style.ResultTitle>
  );
};

const ResultTagContainer = (props: React.PropsWithChildren) => (
  <Style.ResultTagContainer>{props.children}</Style.ResultTagContainer>
);

const ResultTag = (props: { icon: React.ComponentType; text: string }) => (
  <Style.ResultTag>
    <props.icon />
    <span>{props.text}</span>
  </Style.ResultTag>
);

interface IndexResultProps {
  index: number;
  title: string;

  pillTitle: string;
  userName: string;

  keyword: string;
}

const IndexResult = (props: IndexResultProps) => (
  <Result typeIcon={TagIcon}>
    <ResultTitle title={props.title} keyword={props.keyword} />
    <ResultTagContainer>
      <ResultTag icon={TagIcon} text={`${props.index}`} />
      <ResultTag icon={PropaneIcon} text={props.pillTitle} />
      <ResultTag icon={PersonIcon} text={props.userName} />
    </ResultTagContainer>
  </Result>
);

interface TitleResultProps {
  userName: string;
  title: string;
  keyword: string;
}

const TitleResult = (props: TitleResultProps) => (
  <Result typeIcon={TitleIcon}>
    <ResultTitle title={props.title} keyword={props.keyword} />
    <ResultTagContainer>
      <ResultTag icon={PersonIcon} text={props.userName} />
    </ResultTagContainer>
  </Result>
);

const AuthorResult = (props: {
  userName: string;
  pills: number;
  comments: number;
  keyword: string;
}) => (
  <Result typeIcon={PersonIcon}>
    <ResultTitle
      title={props.userName}
      subText={`Pill ${props.pills}개, 댓글 ${props.comments}개`}
      keyword={props.keyword}
    />
  </Result>
);

interface SearchOptionProps {
  name: string;
  checked?: boolean;
}

const SearchOption = (props: SearchOptionProps) => (
  <Style.SearchOption checked={props.checked}>
    <span className="option">{props.name}</span>
    <CheckIcon className="check" />
  </Style.SearchOption>
);

export { ExplorePage };
