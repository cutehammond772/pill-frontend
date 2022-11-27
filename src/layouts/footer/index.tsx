import * as Style from "./footer.style";

import * as React from "react";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import useResizeObserver from "@react-hook/resize-observer";
import { updateFooterHeight } from "../../utils/reducers/page";
import { useLocalization } from "../../utils/hooks/l10n";
import { LanguageType } from "../../localization";

const Footer = () => {
  const { text, changeLanguage } = useLocalization();
  const ref = useRef<HTMLElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    !!ref?.current &&
      dispatch(updateFooterHeight({ footerHeight: ref.current.getBoundingClientRect().height }));
  }, [dispatch]);

  useResizeObserver(ref, (_) => {
    !!ref?.current &&
      dispatch(updateFooterHeight({ footerHeight: ref.current.getBoundingClientRect().height }));
  });

  return (
    <Style.Footer ref={ref}>
      <span className="copyright">&copy; 2022 Jungheon Lee</span>
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
    </Style.Footer>
  );
};

export { Footer };
