const electron = require('electron')
const {
  app,
  BrowserWindow,
  dialog,
  ipcMain
} = require('electron');
const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

let url
if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:8080/'
} else {
  url = `file://${process.cwd()}/dist/index.html`
}

function parseFileList(fileList) {
  const parsedFilePromises = fileList.map(filePath => {
    return mm.parseFile(filePath, {native: true})
    .then( metadata => {
      return {
        filepath: filePath,
        tags: {
          ...metadata.common,
          codec: metadata.format.codec,
          bitrate: metadata.format.bitrate
        }
      }
    })
    .catch( err => {
      console.error(err.message);
    });
  })
  return Promise.all(parsedFilePromises).then(parsedFileList => {
    return parsedFileList
  })
}

function traverseDir(dir, fileList = []) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath, fileList);
     } else {
      if (path.extname(fullPath).toLowerCase() === '.mp3') {
        fileList.push(fullPath)        
      }
     }  
  });

  return parseFileList(fileList).then((value) => {
    return value
  })
}

ipcMain.on('choose-library-source-request', (event, arg) => {
  dialog.showOpenDialog({
      title: "Choose library folder",
      properties: ['openDirectory']
    },
    (filepath) => {
      if (filepath) {
        event.reply('choose-library-source-reply', {
          status: 'parsing'
        })
        traverseDir(filepath[0]).then(fileList => {
          event.reply('choose-library-source-reply', {
            status: 'success',
            data: fileList
          })
        })
      }
    }
  )
})

ipcMain.on('file-from-path-request', (event, arg) => {
  fs.readFile(arg.filepath, function(err, buffer) {
    var arrByte= Uint8Array.from(Buffer.from(buffer))
    event.reply('file-from-path-reply', {
      status: 'success',
      blob: arrByte
    })
  })
})

app.on('ready', () => {
  let window = new BrowserWindow({
    width: 1280,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js'
    }
  })
  window.loadURL(url)
})