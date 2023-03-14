export interface IApi {
  openJira: (url: string) => void;
}

declare global {
  interface Window {
    api: IApi;
  }
}
