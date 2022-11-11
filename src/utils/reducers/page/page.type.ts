const PageReducingType = {
    UPDATE_PAGE_HEIGHT: "reducer.page.height.update",
    UPDATE_HEADER_HEIGHT: "reducer.header.height.update",
    UPDATE_FOOTER_HEIGHT: "reducer.footer.height.update",
} as const;

const INITIAL_STATE: PageAttributes = {
    pageHeight: 0,
    headerHeight: 0,
    footerHeight: 0,
};

interface PageAttributes {
    pageHeight: number;
    headerHeight: number;
    footerHeight: number;
}

export type { PageAttributes };
export { INITIAL_STATE, PageReducingType };