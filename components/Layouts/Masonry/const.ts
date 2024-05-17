import { components_prefix } from "consts";
import { getClasses } from "utils";


const masonry_prefix = 'masonry';
const masonry_class = getClasses(components_prefix, masonry_prefix);
const defaultColumns = 3; // 默认列数
const defaultGap = 1;     // 默认列间隔


export {
    masonry_class,
    masonry_prefix,
    defaultColumns,
    defaultGap
};