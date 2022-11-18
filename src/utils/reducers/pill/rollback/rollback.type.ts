import { PillContentData, PillIndexData } from "../pill.type";

const RollbackReducingType = {
  CAPTURE_INDEX: "reducer.rollback.CAPTURE_INDEX",
  CAPTURE_CONTENT: "reducer.rollback.CAPTURE_CONTENT",
  REMOVE_INDEX: "reducer.rollback.REMOVE_INDEX",
  REMOVE_CONTENT: "reducer.rollback.REMOVE_CONTENT",
  RESET: "reducer.rollback.RESET",
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
