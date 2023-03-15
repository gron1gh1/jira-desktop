import Store from "electron-store";

type HistoryType = {
  name: string;
  url: string;
};

export const store = new Store();

export const getHistories = () => store.get("histories", []) as HistoryType[];

export const pushHistory = (projectName: string, url: string) => {
  const histories = getHistories();

  histories.push({
    name: projectName,
    url,
  });
  store.set("histories", histories);
};
