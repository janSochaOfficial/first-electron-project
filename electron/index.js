const { app, BrowserWindow, ipcMain, Menu, nativeTheme, net, Notification, globalShortcut  } = require("electron");
const { join } = require("path");
const isDev = !app.isPackaged;
const os = require('node:os');

let count = 0;



let online = true

app.whenReady().then(main);

function main() {



  const template = [
    {
      label: 'theme',
      submenu: [
        {
          label: 'light',
          accelerator: "CommandOrControl+L",
          click: async () => {
            window.webContents.send("chthem", "light");
            nativeTheme.themeSource = 'light'
          }
        },
        {
          label: 'dark',
          accelerator: "CommandOrControl+D",
          click: async () => {
            window.webContents.send("chthem", "dark");
            nativeTheme.themeSource = 'dark'
          }
        },
        {
          label: 'system',
          accelerator: "CommandOrControl+S",
          click: async () => {
            window.webContents.send("chthem", "dark");
            nativeTheme.themeSource = 'system'
          }
        },
  
      ]
    },
    {
      label: "server",
      submenu: [
        {
          label: 'notification',
          accelerator: "CommandOrControl+N",
          click: async () => {
            let myNotification = new Notification
              (
                  
                  { title: "Network status",
                  body: (net.isOnline()) ? "Internet available" : "No internet" }
              ).show(); 
            
          }
        },
      ]
    }
  ]
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

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
    autoHideMenuBar: false,
    webPreferences: {
      preload: join(__dirname, "./preload.js"),
    },
  });
  window.loadFile(join(__dirname, "../public/index.html"));
  window.on("ready-to-show", window.show);
  if (isDev) window.webContents.openDevTools();

  ipcMain.on("chdata", (event, args) => {
    window.webContents.send("rdata", resend[args]);
    console.log(resend);
  });

}
