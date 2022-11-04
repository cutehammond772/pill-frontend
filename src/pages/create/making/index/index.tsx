import * as React from "react";

import { IndexContainerStyle } from "./index.style";

import { Title } from "./title";
import { AddContent } from "./content/add";
import { ImageContent } from "./content/image";

const IndexContainer = ({
  index,
  onRemove,
}: {
  index: number;
  onRemove: () => void;
}) => {
  return (
    <IndexContainerStyle>
      <Title index={index} onRemove={onRemove} />

      <ImageContent>
        <img
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F996333405A8280FC23"
          alt="test"
        />
      </ImageContent>

      <AddContent />
    </IndexContainerStyle>
  );
};

export { IndexContainer };
