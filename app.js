const electron = require('electron')
const { dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let url
if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:8080/'
} else {
  url = `file://${process.cwd()}/dist/index.html`
}

function traverseDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
       console.log(fullPath);
       traverseDir(fullPath);
     } else {
       console.log(fullPath);
     }  
  });
}

app.on('ready', () => {
  let window = new BrowserWindow({width: 1024, height: 768})
  window.loadURL(url)
  console.log(dialog.showOpenDialog({
      title: "Choose music directory",
      properties: ['openFile', 'openDirectory', 'multiSelections']
    },
    (filepath) => {
      if (filepath) {
        console.log(filepath);
        traverseDir(filepath[0]);
      }
    }
  ))
})