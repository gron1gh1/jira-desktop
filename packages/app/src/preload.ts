import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  openJira: (url: string) => {
    ipcRenderer.send("open-jira", url);
  },
  getHistories: async () => {
    const result = await ipcRenderer.invoke("get-histories");
    return result;
  },
});
