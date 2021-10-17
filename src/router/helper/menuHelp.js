import { findPath } from 'utils/helper/treeHelp'

const getAllParentPath = (menus, path) => {
    const menuList = findPath(menus, (n) => n.path === path, {id: 'path'});
    return (menuList || []).map((item) => item.path);
};

const getMatched = (menus, parent) => {
    const metched = [];
    menus.forEach((item) => {
        if (parent.includes(item.path)) {
            metched.push({
              ...item,
              name: item.meta?.title || item.name,
            });
        }
        if (item.children?.length) {
            metched.push(...getMatched(item.children, parent));
        }
    });
    return metched;            
};

const filterItem = (list) => {
    let resultList = list.filter((item) => {
        const { meta, name } = item;
        if (!meta) {
            return !!name;
        }
        const { title } = meta;
        if (!title) {
            return false;
        }
        return true;
    });

    return resultList;
};

export {
    getAllParentPath,
    getMatched,
    filterItem
} 