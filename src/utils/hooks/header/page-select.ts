import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Actions as actions } from "../../reducers/header";
import { Menus } from "./header.type";

// 이 Hook을 통해 헤더의 메뉴를 선택한다.
export const usePageSelect = <E extends Menus>(header: string, menu: E[keyof E]) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.resetHeaderSelection({ header }));
    dispatch(actions.select({ header, menu }));
  }, [dispatch, header, menu]);
};
