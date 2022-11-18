import { Reducer } from "redux";
import {
  HeaderContainer,
  HeaderNode,
  HeaderReducingType,
  INITIAL_STATE,
} from "./header.type";

const initHeader = () => ({
  type: HeaderReducingType.INIT,
});

const changeHeaderTitle = (title: string) => ({
  type: HeaderReducingType.CHANGE_TITLE,
  title: title,
});

const addHeaderSelected = (header: string, selected: string) => ({
  type: HeaderReducingType.ADD_SELECTED,
  header: header,
  selected: selected,
});

const addHeaderDisabled = (header: string, disabled: string) => ({
  type: HeaderReducingType.ADD_DISABLED,
  header: header,
  disabled: disabled,
});

const resetHeaderSelected = (header: string) => ({
  type: HeaderReducingType.RESET_SELECTED,
  header: header,
});

const resetHeaderDisabled = (header: string) => ({
  type: HeaderReducingType.RESET_DISABLED,
  header: header,
});

const lockMenuClick = () => ({
  type: HeaderReducingType.LOCK_CLICK,
});

const unlockMenuClick = () => ({
  type: HeaderReducingType.UNLOCK_CLICK,
});

type HeaderReducingAction =
  | ReturnType<typeof initHeader>
  | ReturnType<typeof changeHeaderTitle>
  | ReturnType<typeof addHeaderSelected>
  | ReturnType<typeof addHeaderDisabled>
  | ReturnType<typeof resetHeaderSelected>
  | ReturnType<typeof resetHeaderDisabled>
  | ReturnType<typeof lockMenuClick>
  | ReturnType<typeof unlockMenuClick>;

const copyHeaderContainer = (container: HeaderContainer) => {
  return Object.keys(container).reduce((acc, key) => {
    acc[key] = [...container[key]];
    return acc;
  }, {} as HeaderContainer);
};

const copy = (node: HeaderNode) => {
  const selected = copyHeaderContainer(node.selected);
  const disabled = copyHeaderContainer(node.disabled);

  return {
    ...node,
    selected: selected,
    disabled: disabled,
  };
};

const headerReducer: Reducer<HeaderNode, HeaderReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  const copied = copy(state);

  switch (action.type) {
    case HeaderReducingType.INIT:
      return INITIAL_STATE;
    case HeaderReducingType.CHANGE_TITLE:
      return {
        ...copied,
        title: action.title,
      };
    case HeaderReducingType.ADD_SELECTED:
      return {
        ...copied,
        selected: {
          ...copied.selected,
          [action.header]: copied?.selected[action.header]?.concat(
            action.selected
          ) || [action.selected],
        },
      };
    case HeaderReducingType.ADD_DISABLED:
      return {
        ...copied,
        disabled: {
          ...copied.disabled,
          [action.header]: copied?.disabled[action.header]?.concat(
            action.disabled
          ) || [action.disabled],
        },
      };
    case HeaderReducingType.RESET_SELECTED:
      return {
        ...copied,
        selected: {
          ...copied.selected,
          [action.header]: []
        },
      };
    case HeaderReducingType.RESET_DISABLED:
      return {
        ...copied,
        disabled: {
          ...copied.disabled,
          [action.header]: []
        },
      };
    case HeaderReducingType.LOCK_CLICK:
      return {
        ...copied,
        preventClick: true,
      };
    case HeaderReducingType.UNLOCK_CLICK:
      return {
        ...copied,
        preventClick: false,
      };
    default:
      return state;
  }
};

export {
  initHeader,
  changeHeaderTitle,
  addHeaderSelected,
  addHeaderDisabled,
  resetHeaderSelected,
  resetHeaderDisabled,
  lockMenuClick,
  unlockMenuClick,
  headerReducer,
};
