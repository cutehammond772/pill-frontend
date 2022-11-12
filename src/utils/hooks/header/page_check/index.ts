import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { addHeaderChecked, resetHeaderChecked } from "../../../reducers/header";
import { MenuEnum } from "../../../reducers/header/header.type";

const usePageCheck = <E extends MenuEnum>(header: string, item: E[keyof E]) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(resetHeaderChecked(header));
    dispatch(addHeaderChecked(header, item));
  }, [dispatch, header, item]);
};

export { usePageCheck };
