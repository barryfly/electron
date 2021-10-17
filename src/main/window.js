import { app, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import Trays from './tray';

export const windowsConfig = {
    route: '', // 页面路由URL '/manage?id=123'
    isMultiWindow: false, //是否支持多开窗口 (如果为false，当窗体存在，再次创建不会新建一个窗体 只focus显示即可，，如果为true，即使窗体存在，也可以新建一个)
    isMainWin: false, //是否主窗口(当为true时会替代当前主窗口)
    parentId: '', //父级窗口id
}

/**
 * 窗口配置
 */
export class Window {
    constructor() {
        this.main = null; //主窗口
        this.group = {}; //窗口组
        this.tray = null; //托盘
    }

    // 窗口配置
    winOptions(options) {
        return Object.assign({
            width: 800,
            height: 600,
            backgroundColor: '#fff',
            autoHideMenuBar: true,
            titleBarStyle: "hidden",
            resizable: true,
            minimizable: true,
            maximizable: true,
            // frame: false,
            // transparent: true,
            show: false,
            webPreferences: {
                contextIsolation: false, //上下文隔离
                // nodeIntegration: true, //启用Node集成（是否完整的支持 node）
                nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
                // devTools: false,
                webSecurity: false,
                enableRemoteModule: true, //是否启用远程模块（即在渲染进程页面使用remote）
            }
        }, options)
    }

    // 获取窗口
    getWindow(id) {
        return BrowserWindow.fromId(id)
    }

    // 获取主窗口
    getMainWindow() {
        return this.main
    }

    // 获取截屏窗口
    getCaptureWindow() {
        let captureWin = null
        for(let i in this.group) {
            if(this.group[i].route === '/capture') {
                return captureWin = {id: i, window: this.getWindow(Number(i))};
            }
        }

        return captureWin
    }

    // 获取全部窗口
    getAllWindows() {
        return BrowserWindow.getAllWindows()
    }

    // 创建窗口
    createWindows(args) {
        // 判断窗口是否存在
        let hasWindow = false
        for(let i in this.group) {
            if(this.getWindow(Number(i)) && this.group[i].route === args.route && !this.group[i].isMultiWindow) {
                hasWindow = true;
                this.getWindow(Number(i)).focus()
                return
            }
        }

        if (hasWindow) return

        // 合并参数
        let winOpts = Object.assign({}, windowsConfig, this.winOptions(args))

        // 通过Id，获取父窗口
        if (args.parentId) {
            winOpts.parent = this.getWindow(args.parentId)
        }

        let win = new BrowserWindow(winOpts)
        
        // console.log(`窗口${win.id}参数：`,winOpts)
        // 存储窗口信息
        this.group[win.id] = {
            route: args.route,
            isMultiWindow: args.isMultiWindow,
        }
        // 最大化窗口
        if(args.maximize) {
            win.maximize()
        }
        // 是否主窗口
        if(args.isMainWin) {
            if(this.main) {
                delete this.group[this.main.id]
                this.main.close()
            }
            this.main = win
        }

        win.on('close', () => win.setOpacity(0))

        /**
         * 开发环境: http://localhost:8080
         * 正式环境: app://./index.html
         */
        let winURL
        if (process.env.WEBPACK_DEV_SERVER_URL) {
            // Load the url of the dev server if in development mode
            // win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
            winURL = args.route ? `http://localhost:8080${args.route}` : `http://localhost:8080`;
            if (!process.env.IS_TEST) win.webContents.openDevTools()
        } else {
            createProtocol('app')
            // Load the index.html when not in development
            // win.loadURL('app://./index.html')
            winURL = args.route ? `app://./index.html${args.route}` : `app://./index.html`
        }
        win.loadURL(winURL)

        win.once('ready-to-show', () => {
            win.show()
        })

        // 屏蔽窗口菜单（-webkit-app-region: drag）
        win.hookWindowMessage(278, function(){
            win.setEnabled(false)
            setTimeout(() => {
                win.setEnabled(true)
            }, 100)

            return true
        })
    }

    // 关闭所有窗口
    closeAllWindow() {
        for(let i in this.group) {
            if(this.group[i]) {
                if(this.getWindow(Number(i))) {
                    this.getWindow(Number(i)).close()
                } else {
                    console.log('----- Close All Window -----')
                    app.quit()
                }
            }
        }
    }

    // 创建托盘
    createTray() {
        this.tray = new Trays(app.name)
    }


    // 开启监听
    listen() {
        // 关闭
        ipcMain.on('window-closed', (event, winId) => {
            if(winId) {
                this.getWindow(Number(winId)).close()
                if(this.group[Number(winId)]) delete this.group[Number(winId)]
            } else {
                this.closeAllWindow()
            }
        })

        // 隐藏
        ipcMain.on('window-hide', (event, winId) => {
            if(winId) {
                this.getWindow(Number(winId)).hide()
            } else {
                for(let i in this.group) if(this.group[i]) this.getWindow(Number(i)).hide()
            }
        })

        // 显示
        ipcMain.on('window-show', (event, winId) => {
            if(winId) {
                this.getWindow(Number(winId)).show()
            } else {
                for(let i in this.group) if(this.group[i]) this.getWindow(Number(i)).show()
            }
        })

        // 最小化
        ipcMain.on('window-mini', (event, winId) => {
            if(winId) {
                this.getWindow(Number(winId)).minimize()
            } else {
                for(let i in this.group) if(this.group[i]) this.getWindow(Number(i)).minimize()
            }
        })

        // 最大化
        ipcMain.on('window-max', (event, winId) => {
            if(winId) {
                this.getWindow(Number(winId)).maximize()
            } else {
                for(let i in this.group) if(this.group[i]) this.getWindow(Number(i)).maximize()
            }
        })

        // 最大化/最小化
        ipcMain.on('window-max-min-size', (event, winId) => {
            if(winId) {
                if(this.getWindow(winId).isMaximized()) {
                    this.getWindow(winId).unmaximize()
                }else {
                    this.getWindow(winId).maximize()
                }
            }
        })

        // 还原
        ipcMain.on('window-restore', (event, winId) => {
            if(winId) {
                this.getWindow(Number(winId)).restore()
            } else {
                for(let i in this.group) if(this.group[i]) this.getWindow(Number(i)).restore()
            }
        })

        // 重新加载
        ipcMain.on('window-reload', (event, winId) => {
            if(winId) {
                this.getWindow(Number(winId)).reload()
            } else {
                for(let i in this.group) if(this.group[i]) this.getWindow(Number(i)).reload()
            }
        })

        // 创建窗口
        ipcMain.on('window-new', (event, args) => this.createWindows(args))
    }
}