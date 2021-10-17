import { dialog, app } from 'electron'
import { type, arch, release } from 'os'
// const { nativeImage } = require('electron')
// let settingIcon = nativeImage.createFromPath(path.join(__static,'./images/settings.png'))
// let exitIcon = nativeImage.createFromPath(path.join(__static,'./images/exit.png'))

const menuData = [
    {
        label: '设置',
        submenu: [
            {
                label: '重启',
                accelerator: 'Ctrl+R',
                role: 'reload'
            },
            {
                label: '退出',
                accelerator: 'CmdOrCtrl+Q',
                role: 'quit'
            }
        ]
    },
    {type: 'separator'},
    {label: "关于", click: function() {
        showAbout()
    }},
]

const showAbout = function() {
    dialog.showMessageBox({
        title: '关于',
        type: 'info',
        message: `${app.name}`,
        detail: `版本信息：${app.getVersion()}\n当前系统：${type()} ${arch()} ${release()}`,
        noLink: true,
        buttons: ['确定']
    })
}

export default menuData
