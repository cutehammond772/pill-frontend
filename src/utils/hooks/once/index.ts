import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { addAttempt, resetAttempt } from "../../reducers/once";

const useOnce = (key: string) => {
    const dispatch = useDispatch();
    const attempts = useSelector((state: RootState) => state.once.attempts);

    // 로드 시 단 한 번만 실행되도록 한다.
    const attemptOnce = (callback: () => void) => {
        if (!!attempts.find((attempt) => attempt === key)) {
            return false;
        }

        callback();
        dispatch(addAttempt(key));
        return true;
    };

    // 위의 제한을 초기화한다.
    const reset = () => {
        dispatch(resetAttempt(key));
    };

    return { attemptOnce, reset };
};

export { useOnce };