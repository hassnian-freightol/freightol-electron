const {app, BrowserWindow} = require("electron")
const electron = require('electron')
const url = require("url")
const Updater = require("./updater")
const isDev = require('electron-is-dev')

const menu = require("./menu")
const { session } = require ('electron')



let mainWindow
let website="https://freightol-development.azurewebsites.net/login";
const imgUrl="/build/icon.ico"

if(isDev){
	website= "http://localhost:8080"
}


function createWindow(){
	
	// CREATING BROWSER WINDOW 
	const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
	mainWindow = new BrowserWindow({ width, height,icon:__dirname+ imgUrl })

	
	mainWindow.loadURL(website)  
	
	//  DISABLE TOP BAR
	mainWindow.setMenu(menu)

	// mainWindow.setProgressBar(10)
	// OPNE DEVLTOOLS
	mainWindow.webContents.openDevTools()
	
	
	mainWindow.on("close",()=> win= null)
	
}

function sendUserAgent() {
	session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
		details.requestHeaders['User-Agent'] = 'Freightol-electron';
		callback({ cancel: false, requestHeaders: details.requestHeaders });
	  });
}



app.on("ready", ()=>{
	// AUTO UPDATER
	if(!isDev){
		Updater.checkForUpdates(mainWindow)
	}
	sendUserAgent()
	createWindow()
}) 


app.on("window-all-closed",()=>{
	if(process.platform !== "darwin"){
		app.quit()
	}
})