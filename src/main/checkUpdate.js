/**
 * 应用更新
 * -1 检查更新失败 
 * 0 正在检查更新 
 * 1 检测到新版本，准备下载 
 * 2 未检测到新版本 
 * 3 下载中 
 * 4 下载完成
 **/

import { autoUpdater } from 'electron-updater'
import { ipcMain } from 'electron'
// import { feedUrl } from './config'
const feedUrl = 'http://apps.jwis.cn/release/'

class Upgrade {
    constructor(mainWindow) {
        autoUpdater.setFeedURL(feedUrl)
        this.mainWindow = mainWindow
        // 注册事件
        this.checkUpdate()
        this.start()
        this.hasData()
        this.noData()
        this.listen()
        this.done()
        this.quitInstall()
        this.error()
    }

    // 负责向渲染进程发送信息
    sendMessage(mainWindow, data = {}) {
        mainWindow.webContents.send('UpdateApp', data)
    }

    // 当更新发生错误的时候触发。
    error() {
        autoUpdater.on('error', () => {
            this.sendMessage(this.mainWindow, {state: -1, message: '检查更新失败'})
        })
    }

    // 开始检查更新
    start() {
        autoUpdater.on('checking-for-update', () => {
            this.sendMessage(this.mainWindow, {state: 0, message: '正在检查更新'})
        })
    }

    // 发现新版本
    hasData() {
        autoUpdater.on('update-available', () => {
            this.sendMessage(this.mainWindow, {state: 1, message: '检测到新版本'})
        })
    }

    // 没有更新
    noData() {
        autoUpdater.on('update-not-available', () => {
            this.sendMessage(this.mainWindow, {state: 2, message: '无新版'})
        })
    }

    // 下载监听
    listen() {
        autoUpdater.on('download-progress', (progressObj) => {
            this.sendMessage(this.mainWindow, {state: 3, message: '正在下载', data: progressObj})
        })
    }

    // 下载完成
    done() {
        autoUpdater.on('update-downloaded', () => {
            this.sendMessage(this.mainWindow, {state: 4, message: '下载完成'})
        })
    }

    // 执行自动更新检查
    checkUpdate() {
        ipcMain.handle('check-update', () => {
            autoUpdater.checkForUpdates().catch(err => {
                console.log('网络连接问题', err)
            })
        })
    }

    // 退出并安装
    quitInstall() {
        ipcMain.handle('confirm-update', () => {
            autoUpdater.quitAndInstall()
        })
    }
}

export default Upgrade
