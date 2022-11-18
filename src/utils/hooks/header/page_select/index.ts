import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addHeaderSelected, resetHeaderSelected } from "../../../reducers/header";
import { MenuEnum } from "../../../reducers/header/header.type";

const usePageSelect = <E extends MenuEnum>(header: string, item: E[keyof E]) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetHeaderSelected(header));
    dispatch(addHeaderSelected(header, item));
  }, [dispatch, header, item]);
};

export { usePageSelect };
