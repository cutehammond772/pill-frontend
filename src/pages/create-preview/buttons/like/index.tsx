import * as React from "react";
import { useState, useRef, useLayoutEffect } from "react";

import * as Style from "./like.style";
import FavoriteIcon from "@mui/icons-material/Favorite";

const LikeButton = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!!backgroundRef.current) {
      backgroundRef.current.style.backgroundColor = liked
        ? `var(--pink)`
        : "var(--dark)";
    }

    if (!!iconRef.current) {
      iconRef.current.style.color = liked ? "var(--red)" : "var(--light)";
    }

    if (!!countRef.current) {
      countRef.current.style.color = liked ? "var(--dark)" : "var(--light)";
    }
  }, [liked]);

  return (
    <Style.Button onClick={() => setLiked(!liked)} ref={backgroundRef}>
      <div className="icon" ref={iconRef}>
        <FavoriteIcon />
      </div>
      <div className="count" ref={countRef}>
        999+
      </div>
    </Style.Button>
  );
};

export { LikeButton };
