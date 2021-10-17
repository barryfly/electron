import { ipcMain, app, session  } from "electron";
import path from 'path'
import { openFileDialog, newDownloadFile, listenerDownload } from './download/action'

const registerIpcMain = (mainWindow) => {
    // 打开文件选择框
    ipcMain.handle("openFileDialog", (event, oldPath) => openFileDialog(oldPath, mainWindow));

    // 新建文件下载
    ipcMain.handle("newDownloadFile", (event, fileData) => newDownloadFile(fileData, mainWindow));

    // 触发will-download事件
    session.defaultSession.on('will-download',  listenerDownload)

    // 开机启动
    ipcMain.on('set-autostart',(event,{autostart})=>{
        const exeName = path.basename(process.execPath)
        app.setLoginItemSettings({
        openAtLogin: autostart, //boolean
        openAsHidden:false,
        path: process.execPath,
        args: [
            '--processStart', `"${exeName}"`,
            ]
        })
    })
};

export default registerIpcMain;
