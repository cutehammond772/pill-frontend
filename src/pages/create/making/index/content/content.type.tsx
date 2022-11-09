
interface ContentProps {
    onRemove: () => void;
    onExchange: (contentIndex: number, exchangeContentIndex: number) => void;

    refreshEvent: { refresh: boolean, completeRefresh: () => void };
    access: { index: number; contentIndex: number };
};

export type { ContentProps };