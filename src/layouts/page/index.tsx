import * as React from "react";
import * as Style from "./page.style";
import { SerializedStyles } from "@emotion/serialize";

import { useRef, useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/reducers";
import useResizeObserver from "@react-hook/resize-observer";
import { updatePageHeight } from "../../utils/reducers/page";

interface PageProps extends React.PropsWithChildren {
  layout?: SerializedStyles;
}

const DynamicPageProvider = (props: React.PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);
  const attributes = useSelector((state: RootState) => state.page);

  useLayoutEffect(() => {
    if (!!ref.current?.style) {
      ref.current.style.height = `${ attributes.headerHeight + attributes.pageHeight + attributes.footerHeight }px`;
    } 
  }, [attributes]);

  return <Style.Container ref={ref}>{props.children}</Style.Container>;
};

const Page = (props: PageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!!ref?.current) {
      dispatch(updatePageHeight(ref.current.getBoundingClientRect().height));
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useResizeObserver(ref, (entry) => dispatch(updatePageHeight(entry.contentRect.height)));
  return <Style.Page ref={ref} layout={props.layout}>{props.children}</Style.Page>;
};

export { DynamicPageProvider, Page };
