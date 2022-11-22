
const RunOnceReducingType = {
    ADD: "reducer.run_once.ADD",
    REMOVE: "reducer.run_once.REMOVE",
    RESET: "reducer.run_once.RESET",
} as const;

interface RunOnceContainer {
    runIds: Array<string>;
}

const INITIAL_STATE: RunOnceContainer = {
    runIds: [],
};

export { RunOnceReducingType, INITIAL_STATE, type RunOnceContainer };