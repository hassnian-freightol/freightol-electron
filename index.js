const {app, BrowserWindow} = require("electron");
const electron = require('electron')
const path = require("path");
const url = require("url");

let win;
const website= "https://freightol-development.azurewebsites.net/login"

function createWindow(){

	// CREATING BROWSER WINDOW 
	const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
	win = new BrowserWindow({ width, height,icon:__dirname+"/img/logo.png" })


	win.loadURL(website)  

	//  DISABLE TOP BAR
	win.setMenu(null)


	// OPNE DEVLTOOLS
	// win.webContents.openDevTools()


	win.on("close",()=> win= null)

	
}



app.on("ready", createWindow); 


app.on("window-all-closed",()=>{
	if(process.platform !== "darwin"){
		app.quit();
	}
})



