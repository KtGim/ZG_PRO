import React, { useEffect, useRef } from "react";
import { MasonryProps } from "./interfaces";
import { masonry_class } from "./const";

const MasonryLayout: React.FC<MasonryProps> = (props) => {

    const {
        children,
        columns
    } = props;

    const masonryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (masonryRef.current) {
            masonryRef.current.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        }
        console.log('masonryRef.current', masonryRef.current);
    }, [columns]);

    return (
        <div ref={masonryRef} className={masonry_class}>
            {children}
        </div>
    );
}

export default MasonryLayout;