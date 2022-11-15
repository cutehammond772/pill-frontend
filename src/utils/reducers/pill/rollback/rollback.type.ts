import { PillContentData, PillIndexData } from "../pill.type";

const RollbackReducingType = {
  CAPTURE_INDEX: "reducer.rollback.capture.index",
  CAPTURE_CONTENT: "reducer.rollback.capture.content",
  REMOVE_INDEX: "reducer.rollback.remove.index",
  REMOVE_CONTENT: "reducer.rollback.remove.content",
  RESET: "reducer.rollback.reset",
} as const;

interface RollbackData {
  indexes: Array<PillIndexData>;
  contents: Array<PillContentData>;
}

interface RollbackProps {
    index: PillIndexData;
    content: PillContentData;
}

const INITIAL_STATE: RollbackData = { indexes: [], contents: [] };

export type { RollbackData, RollbackProps };
export { RollbackReducingType, INITIAL_STATE };
