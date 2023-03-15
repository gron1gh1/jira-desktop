import { createSetting, createWebview } from "./windows";
import { getPrefixFromUrl, validateJiraUrl } from "./utils/url";
import { getHistories, pushHistory } from "./store";
import { app, ipcMain } from "electron";

app.whenReady().then(() => {
  const settingWindow = createSetting();

  ipcMain.handle("get-histories", async () => {
    const result = await getHistories();
    return result;
  });

  ipcMain.on("open-jira", (_, url) => {
    const httpsUrl = url.includes("https://")
      ? url
      : ["https://", url].join("");

    if (!validateJiraUrl(httpsUrl)) {
      alert("Invalid URL");
      return;
    }

    const projectName = getPrefixFromUrl(httpsUrl);
    if (!projectName) {
      return;
    }

    settingWindow.hide();
    pushHistory(projectName, httpsUrl);

    createWebview(httpsUrl);
  });
});

app.on("window-all-closed", () => app.quit());
