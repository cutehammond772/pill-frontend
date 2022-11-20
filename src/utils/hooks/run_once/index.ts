import { useRef } from "react";

const useRunOnce = () => {
  const isRun = useRef<boolean>(false);

  // 로드 시 단 한 번만 실행되도록 한다.
  const runOnce = (callbackFn: () => void) => {
    if (!isRun.current) {
      isRun.current = true;
      callbackFn();
    }
  };

  // 위의 제한을 초기화한다.
  const reset = () => {
    isRun.current = false;
  };

  return { runOnce, reset };
};

export { useRunOnce };
