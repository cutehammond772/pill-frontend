import * as React from "react";
import * as Style from "./dummy.style";
import PillTablet, { PillTabletProps } from "../";

import { SerializedStyles } from "@emotion/react";

const RANDOM_TITLES_LENGTH = 13;
const RANDOM_AUTHORS_LENGTH = 10;

const RANDOM_TITLES = [
  "Lorem ipsum dolor sit amet",
  "consectetur adipiscing elit",
  "sed do eiusmod tempor incididunt ut",
  "labore et dolore magna aliqua",
  "Ut enim ad minim veniam",
  "quis nostrud exercitation ullamco laboris",
  "nisi ut aliquip ex ea commodo consequat",
  "Duis aute irure dolor in reprehenderit",
  "in voluptate velit esse cillum",
  "dolore eu fugiat nulla pariatur",
  "Excepteur sint occaecat cupidatat non proident",
  "sunt in culpa qui officia",
  "deserunt mollit anim id est laborum",
];

const RANDOM_AUTHORS = [
  "Etiam",
  "vel",
  "dolor",
  "non",
  "lacus",
  "pretium",
  "efficitur",
  "gravida",
  "eget",
  "massa",
];

export const DummyContainer = React.memo(
  (
    props: React.PropsWithChildren & {
      dummyLayout?: SerializedStyles;
    }
  ) => (
    <Style.DummyContainer dummyLayout={props.dummyLayout}>
      <div className="fade" />
      {props.children}
    </Style.DummyContainer>
  )
);

export const DummyPillTablet = React.memo(
  (props: PillTabletProps & { blurred?: boolean }) => {
    const tablet = (
      <PillTablet
        title={
          props.title ||
          RANDOM_TITLES[Math.floor(Math.random() * RANDOM_TITLES_LENGTH)]
        }
        author={
          props.author ||
          RANDOM_AUTHORS[Math.floor(Math.random() * RANDOM_AUTHORS_LENGTH)]
        }
        likes={props.likes || Math.floor(Math.random() * 1000)}
        views={props.views || Math.floor(Math.random() * 1000)}
      />
    );

    if (!!props.blurred) {
      return <Style.Blur>{tablet}</Style.Blur>;
    }

    return tablet;
  }
);

export const Dummies = React.memo(
  (props: { amount: number; nonBlur?: boolean }) => (
    <>
      {[...Array(props.amount).keys()].map((index) => (
        <DummyPillTablet key={index} blurred={!props.nonBlur} />
      ))}
    </>
  )
);
