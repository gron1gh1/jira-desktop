import { BrowserWindow, screen } from "electron";

export const createWebview = (url: string) => {
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
