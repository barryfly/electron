import { ipcRenderer, remote } from "electron";

/**
 * 调用 ipc 的处理事件
 * @param eventName - ipc 事件名
 * @param args - 参数
 * @returns `Promise<any>`
 */
export const ipcRendererInvoke = (eventName, ...args) => {
    return ipcRenderer.invoke(eventName, ...args)
}

/**
 * 获取下载路径
 */
export const getDownloadPath = () => {
    return remote.app.getPath('downloads')
}

/**
 * 打开选择保存位置对话框
 * @param path - 路径
 */
export const openFileDialog = (path) => {
    return ipcRendererInvoke('openFileDialog', path)
}

/**
 * 新建文件下载
 * @param data - 下载地址url，文件名fileName，保存路径path
 */
export const newDownloadFile = (data) => {
    return ipcRendererInvoke('newDownloadFile', data)
}
