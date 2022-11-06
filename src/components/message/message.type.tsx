import * as React from "react";

// useState Hook에서 제공하는 변수와 변경 함수를 모두 포함해야 합니다.
interface MessageCallback {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export type { MessageCallback };
