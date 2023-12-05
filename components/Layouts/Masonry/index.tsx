import React, { useEffect, useRef, useState } from "react";
import { MasonryContentMaxHeight, MasonryContents, MasonryProps, MasonryState } from "./interfaces";
import { masonry_class } from "./const";
import '../../styles/Layouts/masonry.less'

const MasonryLayout: React.FC<MasonryProps> = (props) => {

    const {
        children,
        gap = 5,
        columns
    } = props;

    const masonryRef = useRef<HTMLDivElement>(null);
    const state = useState<MasonryState>({
        columnWidth: 0,
        maxColumnHeightIndex: 0
    });
    const columnsHeight = useState<MasonryContentMaxHeight>({});
    const contents = useState<MasonryContents>({});

    useEffect(() => {
        if (masonryRef.current) {
            console.log(masonryRef.current);
            masonryRef.current.style.padding = `${gap}px 0`;
            const width = masonryRef.current?.offsetWidth;
            masonryRef.current.style.height = `600px`;

            for(let i = 0; i < gap; i++) {
                contents[i] = [];
            }

            let maxColumnHeightIndex = 0;
            if(width) {
                const contentWidth = (width - (columns + 1) * gap) / gap;
                
            }
        }
        
    }, [columns]);

    return (
        <div ref={masonryRef} className={masonry_class}>
            {children}
        </div>
    );
}

export default MasonryLayout;