import Store from "electron-store";

type HistoryType = {
  name: string;
  url: string;
};

export const store = new Store();

export const getHistories = () => store.get("histories", []) as HistoryType[];

export const clearHistories = () => store.clear();

export const pushHistory = (projectName: string, url: string) => {
  const histories = getHistories();

  if (histories.find((history) => history.name === projectName)) {
    return;
  }

  histories.push({
    name: projectName,
    url,
  });
  store.set("histories", histories);
};
