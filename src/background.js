'use strict'

import { app, protocol, BrowserWindow, globalShortcut } from 'electron'

import installExtension from 'electron-devtools-installer'

import { isDevelopment, isWin, isMac } from './main/env'

import { Window } from './main/window'
import Upgrade from './main/checkUpdate'
import registerIpcMain from './main/ipcMain'
import registerQuickKey from './main/quickKey'
import {upgradeDb} from './apis/sql/version'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
    // Create the browser window.
    let window = new Window();
    window.listen();
    window.createTray();
    window.createWindows({isMainWin: true})
    let mainWindow = window.getWindow(1)
    new Upgrade(mainWindow);
    registerIpcMain(mainWindow);
    registerQuickKey(mainWindow, window);
    // ipcMain.on('newDownloadFile', (event, arg) => {
    //     event.reply('asynchronous-reply', arg)
    // })
    
}


app.on('will-quit', () => {
    // 注销所有快捷键
    globalShortcut.unregisterAll()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (!isMac) {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            const vue_devtools_beta = { id: "ljjemllljcmogpfapbkkighbhhppjdbg", electron: ">=1.2.1" }
            await installExtension(vue_devtools_beta)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }

    // 主窗口
    createWindow();
    // 数据库
    upgradeDb();
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (isWin) {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
