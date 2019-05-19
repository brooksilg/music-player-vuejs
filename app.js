const electron = require('electron')
const {
  app,
  BrowserWindow,
  dialog,
  ipcMain
} = require('electron');
const fs = require('fs');
const path = require('path');

let url
if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:8080/'
} else {
  url = `file://${process.cwd()}/dist/index.html`
}

function traverseDir(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
       traverseDir(fullPath, filelist);
     } else {
       filelist.push(fullPath);
       //callback(fullPath);
     }  
  });
  return filelist;
}

ipcMain.on('testEvent', (event, arg) => {
  console.log('testEvent: ', arg)
})

app.on('ready', () => {
  let window = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js'
    }
  })
  window.loadURL(url)
  // console.log(dialog.showOpenDialog({
  //     title: "Choose music directory",
  //     properties: ['openFile', 'openDirectory', 'multiSelections']
  //   },
  //   (filepath) => {
  //     if (filepath) {
  //       console.log(traverseDir(filepath[0]));
  //     }
  //   }
  // ))
})