import { Snackbar } from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

import { useEffect } from "react";
import { MessageCallback } from "./message.type";

// 일반적으로 notistack를 사용하지만, modal같이 특수한 상황에서 이를 사용할 수 있습니다.
const Message = ({
  message,
  type,
  callback,
  duration = 2000,
}: {
  message: string;
  type: AlertColor;
  callback: MessageCallback;
  duration?: number;
}) => {

  // auto close
  useEffect(() => {
    if (callback.open) {
      setTimeout(() => callback.setOpen(false), duration);
    }
  }, [callback, duration]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={callback.open}
    >
      <MuiAlert elevation={6} variant="filled" severity={type}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export { Message };
