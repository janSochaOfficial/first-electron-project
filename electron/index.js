const { app, BrowserWindow, ipcMain } = require("electron");
const { join } = require("path");
const isDev = !app.isPackaged;
const os = require('node:os');

let count = 0;

app.whenReady().then(main);

function main() {
  const resend = {
    "versions": {
      electron: process.versions.electron,
      chrome: process.versions.chrome,
      node: process.version
    },
    "user":{
      user: os.userInfo()
    },
    "osInfo": {
      version: os.version(),
      patform: os.platform(),
      release: os.release()
    }
  }

  const window = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "./preload.js"),
    },
  });
  window.loadFile(join(__dirname, "../public/index.html"));
  window.on("ready-to-show", window.show);
  //   if (isDev) window.webContents.openDevTools();

  ipcMain.on("smsg", (event, args) => {
    console.log("received a new message: ", args);
    count++;
    window.webContents.send("count", count);
    console.log(count);
  });

  ipcMain.on("chdata", (event, args) => {
    window.webContents.send("rdata", resend[args]);
    console.log(resend);
  });
}
