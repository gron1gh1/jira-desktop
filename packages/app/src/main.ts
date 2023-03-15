import { createSetting, createWebview } from "./windows";
import { getPrefixFromUrl, validateJiraUrl } from "./utils/url";
import { pushHistory } from "./store";
import { app, ipcMain } from "electron";

app.whenReady().then(() => {
  const settingWindow = createSetting();

  ipcMain.on("open-jira", (_, url) => {
    if (!validateJiraUrl(url)) {
      alert("Invalid URL");
      return;
    }

    const projectName = getPrefixFromUrl(url);
    if (!projectName) {
      return;
    }

    settingWindow.hide();
    pushHistory(projectName, url);

    createWebview(url);
  });
});

app.on("window-all-closed", () => app.quit());
