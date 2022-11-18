import {
  MenuEnum,
  MenuItemRef,
} from "../../../utils/reducers/header/header.type";

import { useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/reducers";
import {
  addHeaderSelected,
  addHeaderDisabled,
  changeHeaderTitle,
  resetHeaderSelected,
  resetHeaderDisabled,
} from "../../reducers/header";

// Header 설정을 간편하게 할 수 있는 커스텀 Hook이다.
// 특정 Header의 최상단에만 위치할 수 있다.
const useHeader = <E extends MenuEnum>(
  header: string,
  defaultSelectedItem?: E[keyof E]
) => {
  type MenuItem = E[keyof E];

  // Header 메뉴의 아이템을 가리키는 ref 리스트이다.
  const refs = useRef<MenuItemRef[]>([]);

  // Header의 Title이다.
  const title = useSelector((state: RootState) => state.header.title);

  // 각각 선택된 아이템과 비활성화된 아이템 리스트이다.
  // 여기서는 타입 체킹을 맞추기 위해 'as MenuItem[]'를 통해 강제로 타입을 설정하였다.
  // 이때 리스트에 추가되는 아이템의 타입은 무조건 MenuItem (= E[keyof E])이다.
  // 왜냐하면 아이템을 추가하는 로직은 useHeader 로직 내에만 있으며,
  // 그 로직을 담당하는 함수에서 파라미터로 들어오는 아이템의 타입을 MenuItem으로 설정했기 때문이다.
  const selectedItems = useSelector(
    (state: RootState) => state.header.selected[header]
  ) as MenuItem[];
  const disabledItems = useSelector(
    (state: RootState) => state.header.disabled[header]
  ) as MenuItem[];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Title을 수정한다.
  const changeTitle = useCallback(
    (title: string) => {
      dispatch(changeHeaderTitle(title));
    },
    [dispatch]
  );

  // 선택된 아이템을 추가한다. (= 특정 아이템을 선택시킨다.)
  const addSelected = useCallback(
    (item: MenuItem) => {
      dispatch(addHeaderSelected(header, item));
    },
    [dispatch, header]
  );

  // 비활성화된 아이템을 추가한다. (= 특정 아이템을 비활성화시킨다.)
  const addDisabled = useCallback(
    (item: MenuItem) => {
      dispatch(addHeaderDisabled(header, item));
    },
    [dispatch, header]
  );

  // 선택된 아이템들을 초기화한다.
  const resetSelected = useCallback(() => {
    dispatch(resetHeaderSelected(header));
  }, [dispatch, header]);

  // 비활성화된 아이템들을 초기화한다.
  const resetDisabled = useCallback(() => {
    dispatch(resetHeaderDisabled(header));
  }, [dispatch, header]);

  // 기본적인 아이템 클릭 핸들러이다.
  // 1. { item: "Board" } 이면 '/board'로 navigate된다.
  // => 즉, 아이템의 소문자 형태를 path로 한다.
  // 그러나, 소문자 형태가 아닌 특정 Path를 원하면 mapper를 통해 바꿀 수 있다.
  // 2. 콜백 함수가 존재하면 호출한다. 이때 위의 로직과 blocking 관계가 아님에 유의한다.
  const defaultClickHandler = useCallback(
    (
      item: MenuItem,
      mapper?: { [item: string]: string },
      callback?: (item: MenuItem) => void
    ) => {
      // index page의 경우 path name이 없으므로 undefined로 직접 비교해야 한다.
      const customPath = !!mapper && mapper[item];
      navigate(
        `/${customPath !== undefined ? customPath : item.toLowerCase()}`
      );

      // 콜백 함수를 호출한다.
      !!callback && callback(item);
    },
    [navigate]
  );

  // 만약 첫 로드라면, redux container 내에 이 Header의 정보는 아무것도 없으므로 초기화를 수행한다.
  useEffect(() => {
    if (selectedItems === undefined) {
      if (defaultSelectedItem === undefined) {
        resetSelected();
      } else {
        addSelected(defaultSelectedItem);
      }
    }

    if (disabledItems === undefined) {
      resetDisabled();
    }
  }, [
    selectedItems,
    disabledItems,
    defaultSelectedItem,
    addSelected,
    resetSelected,
    resetDisabled,
  ]);

  return {
    refs,
    title,
    selectedItems,
    disabledItems,
    changeTitle,
    addSelected,
    addDisabled,
    resetSelected,
    resetDisabled,
    defaultClickHandler,
  };
};

export { useHeader };
