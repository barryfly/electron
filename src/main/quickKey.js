import { globalShortcut } from 'electron'

const registerQuickKey = (mainWindow, instance)=>{
    globalShortcut.register('ESC',()=>{
        let {id} = instance.getCaptureWindow()
        if (id) {
            mainWindow.webContents.send('pressESC', id)
        }
    })

    globalShortcut.register('F1',()=>{
        mainWindow.webContents.send('pressF1')
    })
}

export default registerQuickKey