export namespace AppStorageUtil {
  export function setLocal(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }
  export function getLocal(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  export enum Keys {
    Locale = 'locale',
  }
}