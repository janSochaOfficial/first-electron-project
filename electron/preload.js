const { ipcRenderer, contextBridge } = require("electron");

const api = {
  onCount: (callback) => {
    ipcRenderer.on("count", (event, args) => {
      callback(args);
    });
  },
  sendMessage: (message) => ipcRenderer.send("smsg", message),
  changeData: (data) => {
    ipcRenderer.send("chdata", data)
  },
  onDataChange: (callback) => {
    ipcRenderer.on("rdata", (event, args) => {
      callback(args);
    });
  }
};

contextBridge.exposeInMainWorld("api", api);
