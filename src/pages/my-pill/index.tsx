import { Box, Option, Select, Typography } from "@mui/joy";
import { Pagination, PaginationItem } from "@mui/material";

import * as React from "react";

import {
  DefaultHeaderSignature,
  DefaultMenu,
} from "../../components/header/default";

import { Page } from "../../layouts/page";
import { usePageSelect } from "../../utils/hooks/header/page-select";

import * as Style from "./my-pill.style";

const MyPillPage = () => {
  // DefaultHeader에서 Board 아이템을 선택한다.
  usePageSelect(DefaultHeaderSignature, DefaultMenu.MY_PILL);

  return (
    <Page>
      <Style.Container>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            mt: "128px",
          }}
        >
          총 20개의 Pill이 존재합니다.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            columnGap: "10px",
            rowGap: "10px",

            mt: "20px",
            mb: "40px",
          }}
        >
          <PtOrderOption name="최신 순" />
          <PtOrderOption name="오래된 순" />
          <PtOrderOption name="좋아요가 많은 순" />
          <PtOrderOption name="좋아요가 적은 순" />
          <PtOrderOption name="조회수가 많은 순" />
          <PtOrderOption name="조회수가 적은 순" />
        </Box>
        <Box
          sx={{
            alignSelf: "stretch",
            height: "1024px",
            borderRadius: "20px",
            boxShadow: "0px 0px 10px grey",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "20px",
          }}
        >
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
        </Box>
      </Style.Container>
    </Page>
  );
};

const PtOrderOption = ({ name }: { name: string }) => (
  <Box
    sx={{
      width: "auto",
      height: "40px",
      borderRadius: "20px",
      boxSizing: "border-box",

      pl: "20px",
      pr: "20px",

      backgroundColor: "var(--dark)",
      color: "var(--light)",

      display: "flex",
      flexFlow: "row",
      alignItems: "center",
      lineHeight: "100%",
    }}
  >
    {name}
  </Box>
);

export { MyPillPage };
