const { clipboard, contextBridge } = require('electron')

const copyToClip = (text) => {
    if (process.platform === 'linux') {
        clipboard.writeText(text, 'selection')
        return
    }

    clipboard.writeText(text)
}

contextBridge.exposeInMainWorld('preloaded', {
    copyToClip
})