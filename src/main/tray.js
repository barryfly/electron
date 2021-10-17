'use strict'
/* global __static */
import { Tray, ipcMain, Menu } from 'electron';
import { join } from 'path'
import { isWin } from './env';
import menuData from './menu';

export default class Trays {
    constructor(toolTip) {
        this.toolTip = toolTip
        this.timer = null
        this.count = 0
        this.tray = null
        this.createTray()
    }

    createTray() {
        let icon = isWin ? join(__static,'./images/tray.ico') : join(__static, './images/tray.png')
        this.tray = new Tray(icon)
    
        const contextMenu = Menu.buildFromTemplate(menuData)
    
        // 设置托盘提示
        this.tray.setToolTip(this.toolTip)
    
        // 设置托盘右键菜单
        this.tray.setContextMenu(contextMenu)
    
        if (isWin) {
            this.tray.on('click',()=>{
                ipcMain.emit('capture')
            })
        }        
    }

    startFlashing(delayTime = 500) {
        this.timer = setInterval(function() {
            this.count++;
            if (this.count%2 === 0) {            
                this.tray.setImage(join(__static, './images/tray.png'))
            } else {
                this.tray.setImage(join(__static, './images/tray.png'))
            }
        }, delayTime);
    }

    stopFlashing() {
        this.count = 0;
        clearInterval(this.timer);
        this.tray.setImage(join(__static, './images/tray.png'))
    }
}