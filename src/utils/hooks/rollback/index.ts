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
    dispatch(captureRemovingIndexData(index));

  const captureContent = (content: PillContentData) =>
    dispatch(captureRemovingContentData(content));

  const removeIndex = (id: string) =>
    dispatch(removeRollbackIndexData(id));

  const removeContent = (contentId: string) =>
    dispatch(removeRollbackContentData(contentId));

  const getIndex = (id: string) =>
    indexes.find((index) => index.id === id);

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
