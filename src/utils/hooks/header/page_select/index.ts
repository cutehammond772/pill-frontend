import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectItem, resetHeaderSelection } from "../../../reducers/header";
import { MenuEnum } from "../header.type";

// 이 Hook을 통해 헤더의 메뉴를 선택한다.
const usePageSelect = <E extends MenuEnum>(header: string, item: E[keyof E]) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetHeaderSelection({ header }));
    dispatch(selectItem({ header, item }));
  }, [dispatch, header, item]);
};

export { usePageSelect };
