type MasonryProps = {
    columns: number;
    gap: number;
    children?: React.ReactNode;
    height?: number;
    width?: number;
    minWidth?: number;
    fetchUrl?: string;
};

type MasonryState = {
    columnWidth: number;
    maxColumnHeightIndex: number;
};

type MasonryContents = {
    [key in number]: MasonryItemProps[]
}

type MasonryContentMaxHeight = {
    [key in number]: number
};

type MasonryItemProps = {
    height: number;
    width: number;
    children?: React.ReactNode;
};

type CreateElementProps = {
    identifier?: HTMLElementTagNameMap | string;
    width: number;
    gap: number;
};

type CreateElement = (props: CreateElementProps & MasonryItemProps) => { div: HTMLElement, height?: number } | void;

export type { MasonryProps, MasonryState, MasonryItemProps, CreateElement, MasonryContents, MasonryContentMaxHeight };



