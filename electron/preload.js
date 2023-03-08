const { ipcRenderer, contextBridge } = require("electron");

const api = {

  changeData: (data) => {
    ipcRenderer.send("chdata", data)
  },
  onDataChange: (callback) => {
    ipcRenderer.on("rdata", (event, args) => {
      callback(args);
    });
  },
  onChangeTheme: (callback) => {
    ipcRenderer.on("chthem", (event, args) => {
      callback(args);
    });
  }
};

contextBridge.exposeInMainWorld("api", api);
