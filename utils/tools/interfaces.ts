type ConditionClass = {
    className: string;      // class 名称
    condition: boolean;     // 是否添加该 class
    isNote?: boolean;       // --className
    isImportant?: boolean;  // -className
};
type Class = string | ConditionClass;
type GetGlasses = (prefix?: string, ...classes: Class[]) => string;

export type {
    Class,
    ConditionClass,
    GetGlasses
};