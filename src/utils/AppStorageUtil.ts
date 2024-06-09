export namespace AppStorageUtil {

  export function setSession(key: string, value: string): void {
    window.sessionStorage.setItem(key, value);
  }

  export function getSession(key: string): string | null {
    return window.sessionStorage.getItem(key);
  }

  export function removeSession(key: string): void {
    window.sessionStorage.removeItem(key);
  }

  export function setLocal(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }
  export function getLocal(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  export enum Keys {
    Locale = 'locale',
    Jwt = 'jwt',
  }
}