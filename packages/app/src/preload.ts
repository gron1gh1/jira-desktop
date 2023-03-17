import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  onAlert: (callback: (message: string) => void) => {
    ipcRenderer.on("alert", (_, message) => {
      callback(message);
    });

    return () => {
      ipcRenderer.removeAllListeners("alert");
    };
  },
  openJira: (url: string) => {
    ipcRenderer.send("open-jira", url);
  },
  getHistories: async () => {
    const result = await ipcRenderer.invoke("get-histories");
    return result;
  },
  clearHistories: async () => {
    return ipcRenderer.invoke("clear-histories");
  },
});
