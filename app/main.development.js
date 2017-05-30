import {app, BrowserWindow} from 'electron'
import MenuBuilder from './menu'

let mainWindow = null

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')()
  const path = require('path')
  const p = path.join(__dirname, '..', 'app', 'node_modules')
  require('module').globalPaths.push(p)
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

const installExtensions = async() => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer')

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ]

    const forceDownload = !!process.env.UPGRADE_EXTENSIONS

        // TODO: Use async interation statement.
        //       Waiting on https://github.com/tc39/proposal-async-iteration
        //       Promises will fail silently, which isn't what we want in development
    return Promise
            .all(extensions.map(name => installer.default(installer[name], forceDownload)))
            .catch(console.log)
  }
}

app.on('ready', async() => {
  await installExtensions()

  mainWindow = new BrowserWindow({
    show: false,
    minWidth: 1024,
    width: 1024,
    minHeigth: 768,
    height: 728
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)

  mainWindow.setAutoHideMenuBar(true)

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()
})
