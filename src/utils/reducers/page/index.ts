import { Reducer } from "redux";
import { INITIAL_STATE, PageAttributes, PageReducingType } from "./page.type";

const updatePageHeight = (height: number) => ({
  type: PageReducingType.UPDATE_PAGE_HEIGHT,
  pageHeight: height,
});

const updateHeaderHeight = (headerHeight: number) => ({
  type: PageReducingType.UPDATE_HEADER_HEIGHT,
  headerHeight: headerHeight,
});

const updateFooterHeight = (footerHeight: number) => ({
  type: PageReducingType.UPDATE_FOOTER_HEIGHT,
  footerHeight: footerHeight,
});

type PageReducingAction =
  | ReturnType<typeof updatePageHeight>
  | ReturnType<typeof updateHeaderHeight>
  | ReturnType<typeof updateFooterHeight>;

const pageReducer: Reducer<PageAttributes, PageReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case PageReducingType.UPDATE_PAGE_HEIGHT:
      return {
        ...state,
        pageHeight: action.pageHeight,
      };
    case PageReducingType.UPDATE_HEADER_HEIGHT:
      return {
        ...state,
        headerHeight: action.headerHeight,
      };
    case PageReducingType.UPDATE_FOOTER_HEIGHT:
      return {
        ...state,
        footerHeight: action.footerHeight,
      };
    default:
      return state;
  }
};

export {
  updatePageHeight,
  updateHeaderHeight,
  updateFooterHeight,
  pageReducer,
};
