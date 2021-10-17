import { ipcRenderer } from "electron";
/**
 * 创建窗口
 */
 export function windowCreate(args) {
    ipcRenderer.send('window-new', args)
}

/**
 * 关闭窗口
 */
export function windowClose(id) {
    ipcRenderer.send('window-closed', id)
}

/**
 * 隐藏窗口
 */
 export function windowHide(id) {
    ipcRenderer.send('window-hide', id)
}

/**
 * 最小化窗口
 */
export function windowMini(id) {
    ipcRenderer.send('window-mini', id)
}


/**
 * 最大化窗口
 */
 export function windowMax(id) {
    ipcRenderer.send('window-max', id)
}

/**
 * 还原窗口
 */
 export function windowRestore(id) {
    ipcRenderer.send('window-restore', id)
}