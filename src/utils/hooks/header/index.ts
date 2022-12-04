import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/reducers";
import { Actions as actions } from "../../reducers/header";
import { Menus } from "./header.type";
import { usePageNavigate } from "../page-navigate";

// Header 설정을 간편하게 할 수 있는 커스텀 Hook이다.
// 특정 Header의 최상단에만 위치할 수 있다.
export const useHeader = <E extends Menus>(
  header: string,
  defaultSelectedMenu?: E[keyof E]
) => {
  type Menu = E[keyof E];

  const selectedMenu = useSelector(
    (state: RootState) => state.header.selected[header]
  ) as Menu;

  const disabledMenus = useSelector(
    (state: RootState) => state.header.disabled[header]
  ) as Menu[];

  const dispatch = useDispatch();
  const { navigate } = usePageNavigate();

  // 특정 메뉴를 선택한다.
  const selectMenu = useCallback(
    (menu: Menu) => {
      dispatch(actions.select({ header, menu }));
    },
    [dispatch, header]
  );

  // 특정 메뉴를 비활성화한다.
  const disableMenu = useCallback(
    (menu: Menu) => {
      dispatch(actions.disable({ header, menu }));
    },
    [dispatch, header]
  );

  // 메뉴의 선택을 해제한다.
  const resetSelectedMenu = useCallback(() => {
    dispatch(actions.resetHeaderSelection({ header }));
  }, [dispatch, header]);

  // 비활성화된 메뉴들을 초기화한다.
  const resetDisabledMenus = useCallback(() => {
    dispatch(actions.resetHeaderDisabled({ header }));
  }, [dispatch, header]);

  // 메뉴 클릭 시 mapper에 명시된 경로로 이동하는 핸들러를 반환한다.
  // 별도로 콜백 함수를 추가할 수 있다.
  const getSimpleLinkHandler = useCallback(
    (
      item: Menu,
      mapper: Partial<{ [item in Menu]: string }>,
      callback?: (item: Menu) => void
    ) => {
      navigate(`/${mapper[item]}`);

      // 콜백 함수를 호출한다.
      !!callback && callback(item);
    },
    [navigate]
  );

  useEffect(() => {
    if (selectedMenu === undefined) {
      if (!!defaultSelectedMenu) {
        selectMenu(defaultSelectedMenu);
      }
    }
  }, [selectedMenu, disabledMenus, defaultSelectedMenu, selectMenu]);

  return {
    selectedMenu,
    disabledMenus,
    selectMenu,
    disableMenu,
    resetSelectedMenu,
    resetDisabledMenus,
    getSimpleLinkHandler,
  };
};
