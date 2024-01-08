import React, { useEffect, useRef, useState } from "react";
import { MasonryContents, MasonryProps, MasonryState } from "./interfaces";
import { masonry_class } from "./const";
import { createElement } from "./funcs";

import '../../styles/Layouts/masonry.less'

const MasonryLayout: React.FC<MasonryProps> = (props) => {

    const {
        children,
        gap = 5,
        columns
    } = props;

    const masonryRef = useRef<HTMLDivElement>(null);

    const [state, setState] = useState<MasonryState>({
        columnWidth: 0,
        maxColumnHeightIndex: 0,
        minColumnHeightIndex: 0,
        maxColumnHeight: 0,
        minColumnHeight: 0,
        baseWidth: 0
    });

    const [columnsHeight, setColumnsHeight] = useState<number[]>([]);
    const [contents, setContent] = useState<MasonryContents>({});

    useEffect(() => {
        const currentMasonryContents: MasonryContents = {};
        if (masonryRef.current) {
            masonryRef.current.style.padding = `${gap}px 0`;
            masonryRef.current.style.height = `600px`;
            const width = masonryRef.current?.offsetWidth;
            const mainHeight = masonryRef.current.getBoundingClientRect().height;
            for(let i = 0; i < columns; i++) {
                // contents[i] = [];
                currentMasonryContents[i] = [];
                columnsHeight[i] = 0;
            }
            if(width) {
                const contentWidth = Math.floor((width - columns * 2 * gap) / columns);
                for(let i = 0; i < columns; i ++) {
                    const { height = 0 } = createElement({ width: contentWidth, gap });
                    columnsHeight[i] += (height || 0);
                    currentMasonryContents[i]?.push({
                        width: contentWidth,
                        height,
                        margin: `${gap / 2}px 0`,
                        key: `${i}_${Math.floor(Math.random() * 100000)}`,
                    });
                }
                let i = 0;
                // 小顶堆排序
                while(columnsHeight.some(h => h < (mainHeight - 50))) {
                    const { height = 0 } = createElement({ width: contentWidth, gap });
                    state.minColumnHeightIndex = columnsHeight.indexOf(Math.min(...(columnsHeight.filter(h => h < (mainHeight - 50)))));
                    // console.log(state.minColumnHeightIndex, height, columnsHeight); 
                    currentMasonryContents[state.minColumnHeightIndex]?.push({
                        width: contentWidth,
                        height,
                        margin: `${gap / 2}px 0`,
                        key: `${state.minColumnHeightIndex}_${Math.floor(Math.random() * 100000)}`,
                    });
                    
                    columnsHeight[state.minColumnHeightIndex] += (height || 0);
                }
                setState({...state, columnWidth: width, baseWidth: contentWidth});
                setColumnsHeight(columnsHeight)
                setContent(currentMasonryContents);
            }
        }
    }, [columns]);
    return (
        <div ref={masonryRef} className={masonry_class}>
            <p>{children}</p>
            {Object.keys(contents).map((cK) => {
                return <div
                    style={{
                        width: state.baseWidth,
                        margin: `0 ${gap}px`,
                        float: 'left'
                    }}
                    key={cK}
                >
                    {
                        contents[cK]?.map(({ height, margin, key }) => <div
                            key={key}
                            style={{
                                height,
                                width: '100%',
                                margin,
                                backgroundColor: '#eee',
                            }}
                        >{key}:{height}</div>)
                    }
                </div>
            })}
        </div>
    );
}

export default MasonryLayout;