/**
 * Utility functions for interacting with session and local storages.
 */
export namespace AppStorageUtil {

  /**
   * List of keys used by the application, please add it here.
   */
  export enum Keys {
    Locale = 'locale',    // Language Setting
    Jwt = 'jwt',          // Jwt authentication
  }

  /**
   * Stores a value in Session Storage
   * @param key - List of keys from AppStorageUtil.Keys
   * @param value - string value to be stored
   */
  export function setSession(key: string, value: string): void {
    window.sessionStorage.setItem(key, value);
  }

  /**
   * Retrieves a value in Session Storage
   * @param key - List of keys from AppStorageUtil.Key
   * @returns - string value, null if not found
   */
  export function getSession(key: string): string | null {
    return window.sessionStorage.getItem(key);
  }

  /**
   * Removes a value in Session Storage based on the key
   * @param key - List of keys from AppStorageUtil.Key
   */
  export function removeSession(key: string): void {
    window.sessionStorage.removeItem(key);
  }

  /**
   * Stores a value in Local Storage
   * @param key - List of keys from AppStorageUtil.Keys
   * @param value - string value to be stored
   */
  export function setLocal(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  /**
   * Retrieves a value in Local Storage
   * @param key - List of keys from AppStorageUtil.Key
   * @returns - string value, null if not found
   */
  export function getLocal(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  /**
   * Removes a value in Local Storage based on the key
   * @param key - List of keys from AppStorageUtil.Key
   */
  export function removeLocal(key: string): void {
    window.sessionStorage.removeItem(key);
  }
}