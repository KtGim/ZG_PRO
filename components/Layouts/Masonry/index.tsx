import React, { useEffect, useRef, useState } from "react";
import { MasonryContents, MasonryProps, MasonryState } from "./interfaces";
import { masonry_class } from "./const";
import { createElement } from "./funcs";

import '../../styles/Layouts/masonry.less'

const MasonryLayout: React.FC<MasonryProps> = (props) => {

    const {
        children,
        dataSource = [],
        callBackRender
    } = props;

    const masonryRef = useRef<HTMLDivElement>(null);
    const [layoutInfo, setLayout] = useState({
        gap: 5,
        columns: 3
    });

    useEffect(() => {
        setLayout({
            gap: (Math.floor(Math.random() * 2) + 1) * 5,
            columns: Math.floor(Math.random() * 3) + 3,
        });
    }, [])

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
            const { gap, columns } = layoutInfo;
            masonryRef.current.style.padding = `${gap}px 0`;
            masonryRef.current.style.height = `600px`;
            const width = masonryRef.current?.offsetWidth;
            const mainHeight = masonryRef.current.getBoundingClientRect().height;
            let index = 0;
            for(let i = 0; i < columns; i++) {
                // contents[i] = [];
                currentMasonryContents[i] = [];
                columnsHeight[i] = 0;
            }
            if(width) {
                const contentWidth = Math.floor((width - columns * 2 * gap) / columns);
                for(let i = 0; i < columns; i ++) {
                    let info = null;

                    if(index < dataSource.length) {
                        info = dataSource[index];
                        index ++;
                    }

                    const { height = 0, dom } = createElement({ width: contentWidth, gap, callBackRender, info });
                    columnsHeight[i] += (height || 0);
                    currentMasonryContents[i]?.push({
                        width: contentWidth,
                        height,
                        margin: `${gap / 2}px 0`,
                        key: `${i}_${Math.floor(Math.random() * 100000)}`,
                        dom
                    });
                }
                // 小顶堆排序
                while(columnsHeight.some(h => h < (mainHeight - 50))) {
                    const { height = 0, dom } = createElement({ width: contentWidth, gap });
                    state.minColumnHeightIndex = columnsHeight.indexOf(Math.min(...(columnsHeight.filter(h => h < (mainHeight - 50)))));
                    // console.log(state.minColumnHeightIndex, height, columnsHeight); 
                    currentMasonryContents[state.minColumnHeightIndex]?.push({
                        width: contentWidth,
                        height,
                        margin: `${gap / 2}px 0`,
                        key: `${state.minColumnHeightIndex}_${Math.floor(Math.random() * 100000)}`,
                        dom
                    });
                    
                    columnsHeight[state.minColumnHeightIndex] += (height || 0);
                }
                setState({...state, columnWidth: width, baseWidth: contentWidth});
                setColumnsHeight(columnsHeight)
                setContent(currentMasonryContents);
            }
        }
    }, [layoutInfo]);
    return (
        <div ref={masonryRef} className={masonry_class}>
            <p>{children}</p>
            {Object.keys(contents).map((cK) => {
                return <div
                    style={{
                        width: state.baseWidth,
                        margin: `0 ${layoutInfo.gap}px`,
                        float: 'left'
                    }}
                    key={cK}
                >
                    {
                        contents[cK]?.map(({ height, margin, key, dom }) => <div
                            key={key}
                            style={{
                                height,
                                width: '100%',
                                margin,
                                backgroundColor: '#eee',
                            }}
                        >{dom}</div>)
                    }
                </div>
            })}
        </div>
    );
}

export default MasonryLayout;