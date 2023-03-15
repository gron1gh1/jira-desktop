export interface IApi {
  openJira: (url: string) => void;
  getHistories: () => Promise<HistoryType[]>;
}

declare global {
  interface Window {
    api: IApi;
  }

  type HistoryType = {
    name: string;
    url: string;
  };
}
