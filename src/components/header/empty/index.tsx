import { useCallback } from "react";
import { Header } from "../../../layouts/header";
import { I18N } from "../../../utils/i18n";
import { useHeader } from "../../../utils/hooks/header";
import { Menus } from "../../../utils/hooks/header/header.type";
import { usePageNavigate } from "../../../utils/hooks/page-navigate";

export const EmptyHeaderSignature = "EmptyHeader";

export const EmptyMenus: Menus = {
  HOME: I18N.HEADER_EMPTY_01,
  PAGE: I18N.HEADER_EMPTY_02,
} as const;

type EmptyMenu = typeof EmptyMenus[keyof typeof EmptyMenus];

const EmptyHeader = () => {
  const header = useHeader<typeof EmptyMenus>(EmptyHeaderSignature, EmptyMenus.PAGE);
  const { navigate } = usePageNavigate();

  // 다른 페이지로 이동 시 메뉴 초기화 필수
  const handleClick = useCallback((type: EmptyMenu) => {
    switch (type) {
      case EmptyMenus.HOME:
        navigate("/");
        break;
    }
  }, [navigate]);

  return <Header menu={{ enum: EmptyMenus, selected: header.selectedMenu, onClick: handleClick }}/>;
};

export default EmptyHeader;
