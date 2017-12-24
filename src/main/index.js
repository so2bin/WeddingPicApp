'use strict'

import { app, BrowserWindow, Menu } from 'electron'
let tools = require('../tools')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 620,
    width: 1000,
    minWidth: 1000,
    minHeight: 580,
    useContentSize: true,
    webPreferences: {webSecurity: false}, // 加上这个就可以获取到了本地的图片
    // frame: false,  // 无边框
    show: true,
    backgroundColor: '#e9eef3',
    // icon: "",    // 图标
    titleBarStyle: 'hiddenInset',
  })

  mainWindow.loadURL(winURL)
  // close Menu
  Menu.setApplicationMenu(null)

  // self define functions
  // tools.funcs()
  tools.saveBase64()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
