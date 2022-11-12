import { Link } from "react-router-dom";
import * as Style from "./footer.style";

import * as React from "react";
import { useRef, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import useResizeObserver from "@react-hook/resize-observer";
import { updateFooterHeight } from "../../utils/reducers/page";

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!!ref?.current) {
      dispatch(updateFooterHeight(ref.current.getBoundingClientRect().height));
    }
  }, [dispatch]);

  useResizeObserver(ref, (_) => {
    if (!!ref?.current) {
      dispatch(updateFooterHeight(ref.current.getBoundingClientRect().height));
    }
  });

  return (
    <Style.Footer ref={ref}>
      <span>&copy; 2022 Jungheon Lee</span>
      <Link to="/help"> Help </Link>
    </Style.Footer>
  );
};

export { Footer };
