import * as React from "react";
import * as Style from "./page.style";
import { SerializedStyles } from "@emotion/react";

import { useRef, useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/reducers";
import useResizeObserver from "@react-hook/resize-observer";
import { Actions as actions } from "../../utils/reducers/page/size";

interface PageProps extends React.PropsWithChildren {
  layout?: SerializedStyles;
}

// DynamicPageProvider의 존재 의의는
// Transition이 일어나는 Page와 그렇지 않은 Header, Footer를 분리하기 위함이다.
//
// => 이때 Page의 position은 absolute인데,
// 그 이유는 Transition이 일어날 때 두 페이지가 공존하게 되는데 (Fade-In, Fade-Out)
// 이때 absolute로 설정해야 서로 겹쳐지기 때문이다.
export const DynamicPageProvider = (props: React.PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);
  const attributes = useSelector((state: RootState) => state.page);

  // (Container의 Height) = Header + Page + Footer
  useLayoutEffect(() => {
    !!ref.current?.style &&
      (ref.current.style.height = `${
        attributes.headerHeight +
        attributes.pageHeight +
        attributes.footerHeight
      }px`);
  }, [attributes]);

  return <Style.Container ref={ref}>{props.children}</Style.Container>;
};

export const Page = (props: PageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    !!ref?.current &&
      dispatch(
        actions.updatePageHeight({
          pageHeight: ref.current.getBoundingClientRect().height,
        })
      );
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useResizeObserver(
    ref,
    (_) =>
      !!ref?.current &&
      dispatch(
        actions.updatePageHeight({
          pageHeight: ref.current.getBoundingClientRect().height,
        })
      )
  );
  return (
    <Style.Page ref={ref} layout={props.layout}>
      {props.children}
    </Style.Page>
  );
};
