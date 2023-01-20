const { app, BrowserWindow, ipcMain } = require('electron')
const io = require('socket.io-client')
const { v4: uuidv4 } = require('uuid');
const screenshot = require('screenshot-desktop');
const socket = io('http://localhost:8000')

let win

function createWindow () {
  win = new BrowserWindow({
    width: 700,
    height: 250,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation:false
    // preload: path.join(__dirname, 'index.js')
    }
  })

  win.loadFile('index.html')
//   win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('start-capture', (event,arg) => {
    // console.log("it is working")
    var uuid = uuidv4();
    socket.emit("join-message", uuid);
    event.reply("uuid", uuid);
 interval = setInterval(function() {
  screenshot().then((img) => {
      var imgStr = img.toString('base64')

      var obj = {};
      obj.room = uuid;
      obj.image = imgStr;
      socket.emit("screen-data", JSON.stringify(obj));
  })
}, 1000)
})

ipcMain.on('stop-capture', (event) => {
    // console.log("it is working")
  clearInterval(interval)
})