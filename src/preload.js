const { clipboard, contextBridge } = require('electron')

const copyToClip = () => {
    console.log('clip')
}

contextBridge.exposeInMainWorld('preloaded', {
    copyToClip
})