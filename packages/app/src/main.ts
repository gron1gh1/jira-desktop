import { app, BrowserWindow, ipcMain, screen } from "electron";
import path from "path";
import { getWorkspaces } from "workspace-tools";

const workspaces = getWorkspaces(process.cwd()).reduce<Record<string, string>>(
  (acc, workspace) => {
    acc[workspace.name] = workspace.path;
    return acc;
  },
  {}
);

const createSetting = () => {
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

const createJira = (url: string) => {
  const size = screen.getPrimaryDisplay().workAreaSize;

  const window = new BrowserWindow({
    center: true,
    width: Math.floor(size.width * 0.9),
    height: Math.floor(size.height * 0.9),
  });

  const urlWithHttps = url.includes("https://")
    ? url
    : ["https://", url].join("");

  window.loadURL(urlWithHttps);
};

app.whenReady().then(() => {
  const settingWindow = createSetting();

  ipcMain.on("open-jira", (_, url) => {
    settingWindow.hide();
    createJira(url);
  });
});

app.on("window-all-closed", () => app.quit());
