import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import {
  PillContentData,
  PillIndexData,
} from "../../reducers/pill/pill.type";
import {
  captureRemovingContentData,
  captureRemovingIndexData,
  removeRollbackContentData,
  removeRollbackIndexData,
} from "../../reducers/pill/rollback";

const useRollback = () => {
  const dispatch = useDispatch();

  const indexes = useSelector((state: RootState) => state.rollback.indexes);
  const contents = useSelector((state: RootState) => state.rollback.contents);

  const captureIndex = (index: PillIndexData) =>
    dispatch(captureRemovingIndexData({ index }));

  const captureContent = (content: PillContentData) =>
    dispatch(captureRemovingContentData({ content }));

  const removeIndex = (props: { id: string }) =>
    dispatch(removeRollbackIndexData(props));

  const removeContent = (props: { contentId: string }) =>
    dispatch(removeRollbackContentData(props));

  const getIndex = (props: { id: string }) =>
    indexes.find((index) => index.id === props.id);

  const getContent = (props: { contentId: string }) =>
    contents.find((content) => content.contentId === props.contentId);

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
