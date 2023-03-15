import { app, BrowserWindow, ipcMain, screen } from "electron";
import path from "path";
import { workspaces } from "./utils/workspaces";

export const createSetting = () => {
  const window = new BrowserWindow({
    width: 500,
    height: 380,
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(process.cwd(), "dist", "preload.js"),
    },
  });

  window.loadFile(
    path.resolve(workspaces["@jira-desktop/view"], "build", "setting.html")
  );

  return window;
};
