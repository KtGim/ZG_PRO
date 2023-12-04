type MasonryProps = {
    columns: number;
    children?: React.ReactNode;
    height?: number;
    width?: number;
    minWidth?: number;
};

type MasonryState = {
    columnsHeight: Map<number, number>;
    maxColumnHeightIndex: number;
    fetchUrl?: string;
};

type MasonryItemProps = {
    height: number;
    width: number;
    children: React.ReactNode;
};

export type { MasonryProps, MasonryState, MasonryItemProps };



