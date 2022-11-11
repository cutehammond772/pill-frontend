import { Reducer } from "redux";
import { HeaderNode, HeaderReducingType, INITIAL_STATE } from "./header.type";

const initHeader = () => ({
  type: HeaderReducingType.INIT,
});

const changeHeaderTitle = (title: string) => ({
  type: HeaderReducingType.CHANGE_TITLE,
  title: title,
});

const addHeaderChecked = (header: string, checked: string) => ({
  type: HeaderReducingType.ADD_CHECKED,
  header: header,
  checked: checked,
});

const addHeaderDisabled = (header: string, disabled: string) => ({
  type: HeaderReducingType.ADD_DISABLED,
  header: header,
  disabled: disabled,
});

const resetHeaderChecked = (header: string) => ({
  type: HeaderReducingType.RESET_CHECKED,
  header: header,
});

const resetHeaderDisabled = (header: string) => ({
  type: HeaderReducingType.RESET_DISABLED,
  header: header,
});

type HeaderReducingAction =
  | ReturnType<typeof initHeader>
  | ReturnType<typeof changeHeaderTitle>
  | ReturnType<typeof addHeaderChecked>
  | ReturnType<typeof addHeaderDisabled>
  | ReturnType<typeof resetHeaderChecked>
  | ReturnType<typeof resetHeaderDisabled>;

const headerReducer: Reducer<HeaderNode, HeaderReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case HeaderReducingType.INIT:
      return INITIAL_STATE;
    case HeaderReducingType.CHANGE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case HeaderReducingType.ADD_CHECKED:
      return {
        ...state,
        checked: {
          ...state.checked,

          [action.header]: state?.checked[action.header]?.concat(
            action.checked
          ) || [action.checked],
        },
      };
    case HeaderReducingType.ADD_DISABLED:
      return {
        ...state,
        disabled: {
          ...state.disabled,

          [action.header]: state?.disabled[action.header]?.concat(
            action.disabled
          ) || [action.disabled],
        },
      };
    case HeaderReducingType.RESET_CHECKED:
      return {
        ...state,
        checked: {},
      };
    case HeaderReducingType.RESET_DISABLED:
      return {
        ...state,
        disabled: {},
      };
    default:
      return state;
  }
};

export {
  initHeader,
  changeHeaderTitle,
  addHeaderChecked,
  addHeaderDisabled,
  resetHeaderChecked,
  resetHeaderDisabled,
  headerReducer,
};
