import { Link } from "react-router-dom";
import * as Style from "./footer.style";

import * as React from "react";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import useResizeObserver from "@react-hook/resize-observer";
import { updateFooterHeight } from "../../utils/reducers/page";

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    !!ref?.current &&
      dispatch(updateFooterHeight(ref.current.getBoundingClientRect().height));
  }, [dispatch]);

  useResizeObserver(ref, (_) => {
    !!ref?.current &&
      dispatch(updateFooterHeight(ref.current.getBoundingClientRect().height));
  });

  return (
    <Style.Footer ref={ref}>
      <span className="copyright">&copy; 2022 Jungheon Lee</span>
      <Link to="/about" className="about">
        About
      </Link>
    </Style.Footer>
  );
};

export { Footer };
