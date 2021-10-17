const DEFAULT_CONFIG = {
    id: 'id',
    children: 'children',
    pid: 'pid',
};

const getConfig = (config) => Object.assign({}, DEFAULT_CONFIG, config);

const findPath = (tree, func, config = {}) => {
    config = getConfig(config);
    const path = [];
    const list = [...tree];
    const visitedSet = new Set();
    const { children } = config;
    while (list.length) {
        const node = list[0];
        if (visitedSet.has(node)) {
            path.pop();
            list.shift();
        } else {
            visitedSet.add(node);
            node[children] && list.unshift(...node[children]);
            path.push(node);
            if (func(node)) {
                return path;
            }
        }
    }
    return null;
};

const listToTree = (list, config = {}) => {
    config = getConfig(config);
    const nodeMap = new Map();
    const result = [];
    const { id, children, pid } = config;
    for (const node of list) {
        node[children] = node[children] || [];
        nodeMap.set(node[id], node);
    }
    for (const node of list) {
        const parent = nodeMap.get(node[pid]);
        (parent ? parent.children : result).push(node);
    }
    return result;
};

const treeToList = (tree, config = {}) => {
    config = getConfig(config);
    const { children } = config;
    const result = [...tree];
    for (let i = 0; i < result.length; i++) {
        if (!result[i][children]) continue;
        result.splice(i + 1, 0, ...result[i][children]);
    }
    return result;
};

export { findPath, listToTree, treeToList }