export interface IApi {
  onAlert: (callback: (message: string) => void) => () => void;
  openJira: (url: string) => Promise<void>;
  getHistories: () => Promise<HistoryType[]>;
  clearHistories: () => Promise<void>;
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
