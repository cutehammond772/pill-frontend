import * as React from "react";

import { Snackbar } from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

import { useEffect, useRef } from "react";

interface MessageProps {
  message: string;
  type: AlertColor;
  state: MessageState;
  duration?: number;
}

// useState Hook에서 제공하는 변수와 변경 함수를 모두 포함해야 합니다.
interface MessageState {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

// 일반적으로 notistack를 사용하지만, modal같이 특수한 상황에서 이를 사용할 수 있습니다.
const Message = (props: MessageProps) => {
  const timeout = useRef<NodeJS.Timeout>();
  
  // auto close
  useEffect(() => {
    clearTimeout(timeout.current);

    if (props.state.open) {
      timeout.current = setTimeout(() => props.state.setOpen(false), props.duration || 2000);
    }
  }, [props.state, props.duration]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={props.state.open}
    >
      <MuiAlert elevation={6} variant="filled" severity={props.type}>
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
};

export { Message };
