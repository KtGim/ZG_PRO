import { ReactNode } from "react";

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
};

type CreateElement = (props: CreateElementProps & Partial<MasonryItemProps>) => { div: HTMLElement, height?: number };

export type { MasonryProps, MasonryState, MasonryItemProps, CreateElement, MasonryContents, MasonryContentMaxHeight };



