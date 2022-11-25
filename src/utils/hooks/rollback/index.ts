import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { PillContentData, PillIndexData } from "../../reducers/creator";
import * as reducer from "../../reducers/rollback";

const useRollback = () => {
  const dispatch = useDispatch();

  const indexes = useSelector((state: RootState) => state.rollback.indexes);
  const contents = useSelector((state: RootState) => state.rollback.contents);

  const captureIndex = (index: PillIndexData) =>
    dispatch(reducer.captureIndex({ data: index }));

  const captureContent = (content: PillContentData) =>
    dispatch(reducer.captureContent({ data: content }));

  const removeIndex = (id: string) => dispatch(reducer.removeIndex({ id }));

  const removeContent = (contentId: string) =>
    dispatch(reducer.removeContent({ contentId }));

  const getIndex = (id: string) => indexes.find((index) => index.id === id);

  const getContent = (contentId: string) =>
    contents.find((content) => content.contentId === contentId);

  return {
    indexes,
    contents,
    captureIndex,
    captureContent,
    removeIndex,
    removeContent,
    getIndex,
    getContent,
  };
};

export { useRollback };
