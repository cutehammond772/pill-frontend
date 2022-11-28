import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../layouts/header";
import { L10N } from "../../../localization";
import { useHeader } from "../../../utils/hooks/header";
import { Menus } from "../../../utils/hooks/header/header.type";

const EmptyHeaderSignature = "EmptyHeader";

const EmptyMenus: Menus = {
  HOME: L10N.HEADER_EMPTY_01,
  PAGE: L10N.HEADER_EMPTY_02,
} as const;

type EmptyMenu = typeof EmptyMenus[keyof typeof EmptyMenus];

const EmptyHeader = () => {
  const header = useHeader<typeof EmptyMenus>(EmptyHeaderSignature, EmptyMenus.PAGE);
  const navigate = useNavigate();

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

export { EmptyHeader, EmptyHeaderSignature, EmptyMenus };
