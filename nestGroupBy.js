const { map, groupBy } = require("rambda");

// 多级分组
const nestGroupBy = ([fn, ...fns], list) => {
    if (!fn) {
        return list;
    }
    const g = groupBy(fn, list);
    return map(v => {
        return nestGroupBy(fns, v);
    }, g);
};

export default nestGroupBy;
