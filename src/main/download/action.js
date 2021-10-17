import { dialog, app } from "electron";
import {isExistFile, getFileName, pathJoin,} from './helper/util'
import {isExistItem, addDownloadItem, updateDownloadItem} from './helper'

let downloadItemData = [];
let newDownloadItem = null;
let downloadCompletedIds = [];
let tempDownloadItemIds = [];

/**
* 打开文件选择框
* @param oldPath - 上一次打开的路径
*/
export const openFileDialog = async (oldPath, win) => {
    if (!win) return oldPath;

    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
    title: "选择保存位置",
    properties: ["openDirectory", "createDirectory"],
    defaultPath: oldPath,
    });

    return !canceled ? filePaths[0] : oldPath;
};


/**
* 新建下载
* @param data - 下载对象信息
*/
export const newDownloadFile = (newItem, win) => {
    let {url, fileName, path: savePath} = newItem;
    // 处理文件名
    const newFileName = getFileName(fileName || '', url) // 处理文件名
    // 处理保存路径
    const downloadPath = pathJoin(savePath, newFileName);
    // 查找下载记录中是否存在历史下载
    const existItem = isExistItem(url, downloadItemData);
    newItem.fileName = newFileName
    newItem.path = downloadPath
    // 判断是否存在
    if (isExistFile(downloadPath)) {
        const id = existItem.id
        return { id, ...newItem }
    }

    // 重新下载
    if (existItem) {
        // retryDownloadFile({ ...existItem, ...newItem })
        return null
    }

    newDownloadItem = {
        url,
        fileName: newFileName,
        path: downloadPath,
    }
    win.webContents.downloadURL(url);
    // return null
};

export const listenerDownload = async (event, item, webContents) => {
    // 新建下载为空时，会执行 electron 默认的下载处理
    if (!newDownloadItem) return;

    // 设置保存路径
    item.setSavePath(newDownloadItem.path);

    // 记录上一次下载的字节数据
    let prevReceivedBytes = 0;

    // 添加下载项
    const downloadItem = await addDownloadItem({
        item,
        downloadIds: tempDownloadItemIds,
        data: downloadItemData,
        newDownloadItem,
    });
    // 渲染进程监听新下载项
    webContents.send('newDownloadItem', { ...downloadItem });
    

    // 更新下载
    item.on('updated', (e, state) => {
        const receivedBytes = updateDownloadItem({
            item,
            downloadItem,
            data: downloadItemData,
            prevReceivedBytes,
            state,
        })
        prevReceivedBytes = receivedBytes

        // 更新任务栏进度
        console.log('下载进度', downloadItem.progress);

        // 通知渲染进程，更新下载状态
        webContents.send('downloadItemUpdate', { ...downloadItem})
    });

    // 下载完成
    item.on('done', (e, state) => {
        downloadItem.state = state
        downloadItem.receivedBytes = item.getReceivedBytes()
        console.log('下载完成', state)
        if (state !== 'cancelled') {
            downloadCompletedIds.push(downloadItem.id)
        }

        // 下载成功
        if (state === 'completed' && process.platform === 'darwin') {
            app.dock.downloadFinished(downloadItem.path)
        }

        // 通知渲染进程，更新下载状态
        webContents.send('downloadItemDone', { ...downloadItem, _sourceItem: null })
    })
}