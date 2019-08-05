const { autoUpdater } = require("electron-updater")
const log = require('electron-log')
const isDev = require('electron-is-dev')
const path = require("path")

autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

if (isDev) {
	autoUpdater.updateConfigPath = path.join(__dirname, 'app-update.yml')
}



module.exports = new class Updater {
	constructor(mainWindow){
		this.mainWindow=mainWindow
	}
	checkForUpdates() {
	autoUpdater.checkForUpdates()

	const sendStatusToWindow = (text) => {
		log.info(text)
		if (this.mainWindow) {
			this.mainWindow.webContents.send('message', text)
		}
	}


	autoUpdater.on('checking-for-update', () => {
		sendStatusToWindow('Checking for update...')
	})
	autoUpdater.on('update-available', info => {
		// this.window.open('https://github.com', '_blank', 'nodeIntegration=no')
		sendStatusToWindow('Update available.')
	})
	autoUpdater.on('update-not-available', info => {
		sendStatusToWindow('Update not available.')
	})
	autoUpdater.on('error', err => {
		sendStatusToWindow(`Error in auto-updater: ${err.toString()}`)
	})
	autoUpdater.on('download-progress', progressObj => {
		sendStatusToWindow(
			`Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
		)
	})
	autoUpdater.on('update-downloaded', info => {
		sendStatusToWindow('Update downloaded will install now')
	})

	autoUpdater.on('update-downloaded', info => {
		// Wait 5 seconds, then quit and install
		// In your application, you don't need to wait 500 ms.
		// You could call autoUpdater.quitAndInstall() immediately
		autoUpdater.quitAndInstall()
	})
}
}







