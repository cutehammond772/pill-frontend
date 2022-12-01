import * as Style from "./footer.style";

import * as React from "react";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import useResizeObserver from "@react-hook/resize-observer";
import { Actions as actions } from "../../utils/reducers/page";
import { useI18n } from "../../utils/hooks/i18n";
import { LanguageType } from "../../utils/i18n";

const Footer = () => {
  const { text, changeLanguage } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    !!ref?.current &&
      dispatch(
        actions.updateFooterHeight({
          footerHeight: ref.current.getBoundingClientRect().height,
        })
      );
  }, [dispatch]);

  useResizeObserver(ref, (_) => {
    !!ref?.current &&
      dispatch(
        actions.updateFooterHeight({
          footerHeight: ref.current.getBoundingClientRect().height,
        })
      );
  });

  return (
    <Style.Footer ref={ref}>
      <span className="copyright">&copy; 2022 Jungheon Lee</span>

      <div className="languages">
        <div
          className="button"
          onClick={() => changeLanguage(LanguageType.English)}
        >
          ENG
        </div>
        <div
          className="button"
          onClick={() => changeLanguage(LanguageType.Korean)}
        >
          KOR
        </div>
      </div>
    </Style.Footer>
  );
};

export { Footer };
