import {importAll} from 'utils'

const menuModules = importAll(require.context('./modules', true, /\.js$/), true)
const staticMenus = [];

// 排序
menuModules.sort((a, b) => {
    return (a.orderNo || 0) - (b.orderNo || 0);
});

// 转换
const transformMenuModule = function (menuModule) {
    const { menu } = menuModule ;
    const menuList = [menu];
    joinParentPath(menuList);
    return menuList[0];
};

// 添加父级
const joinParentPath = function (menus, parentPath = '') {
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
            menu.path = `${parentPath}/${menu.path}`;
        }

        if (menu.children&&menu.children.length > 0) {
            joinParentPath(menu.children, menu.path);
        }        
    }
};

// 验证url
const isUrl = function (path) {
    const reg =
      /(((^https?:(?:\/\/)?)(?:[-;:&=\\+\\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\\+\\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\\+~%\\/.\w-_]*)?\??(?:[-\\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
};

(() => {
    for (const menu of menuModules) {
      staticMenus.push(transformMenuModule(menu));
    }
})();

export default staticMenus