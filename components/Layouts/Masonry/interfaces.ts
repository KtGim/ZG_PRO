import { ReactNode } from "react";

type MasonryProps = {
    children?: React.ReactNode;
    dataSource?: object[];
    callBackRender?: Function;
};

type MasonryState = {
    columnWidth: number;
    maxColumnHeightIndex: number;
    minColumnHeightIndex: number;
    maxColumnHeight: number;
    minColumnHeight: number;
    baseWidth: number;
};

type MasonryContent = {
    width: number;
    height: number;
    padding?: string;
    margin:string;
    key: string | number;
    item?: object,
    dom?: ReactNode
}

type MasonryContents = {
    [key in number | string]?: MasonryContent[]
}

type MasonryContentMaxHeight = number[];

type MasonryItemProps = {
    height: number;
    width: number;
    children?: React.ReactNode;
};

type CreateElementProps = {
    identifier?: HTMLElementTagNameMap | string;
    width: number;
    gap: number;
    callBackRender?: Function,
    info?: object | null
};

type CreateElement = (props: CreateElementProps & Partial<MasonryItemProps>) => { dom: ReactNode, height?: number };

export type { MasonryProps, MasonryState, MasonryItemProps, CreateElement, MasonryContents, MasonryContentMaxHeight };



