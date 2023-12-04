import { components_prefix } from "../../consts";
import { ConditionClass, GetGlasses } from "./interfaces";

/**
 * 根据条件拼接 class 名称
 * @param prefix 通用前缀名称，默认为 'zg'
 * @param classes class 名称，可以是字符串或者对象
 * @returns 拼接后的 class 名称
 */
const getClasses: GetGlasses = (prefix = components_prefix, ...classes) => {
    const classList = (classes || []).reduce((acc, cur) => {
        if (typeof cur === 'string') {
            return [...acc, ` ${cur}`];
        }
        return [...acc, getClassString(cur)];
    }, [prefix]);
    return classList.join('');
};

const getClassString = (conditionClass: ConditionClass) => {
    const { className, condition, isNote, isImportant } = conditionClass;
    if(condition) {
        if(isNote) {
            return `--${className}`;
        } else if(isImportant) {
            return `-${className}`;
        } else {
            return ` ${className}`;
        }
    }
    return '';
};

export {
    getClasses
};
