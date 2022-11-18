const PageReducingType = {
    UPDATE_PAGE_HEIGHT: "reducer.page.UPDATE_PAGE_HEIGHT",
    UPDATE_HEADER_HEIGHT: "reducer.header.UPDATE_HEADER_HEIGHT",
    UPDATE_FOOTER_HEIGHT: "reducer.footer.UPDATE_FOOTER_HEIGHT",
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