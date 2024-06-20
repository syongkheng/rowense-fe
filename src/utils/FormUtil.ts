/**
 * Utility functions for Forms used in the application
 */
export namespace FormUtil {

  /**
   * Pass in a form (usually a dictionary), and the function will iterate through the keys and check if its empty.
   * @param form - Record<string, any>
   * @returns - true if empty, false if not empty
   */
  export function isFormEmpty(form: Record<string, any>): boolean {
    const keys = Object.keys(form);
    for (const key of keys) {
      const value = form[key];
      if (value !== "") {
        return false;
      }
    }
    return true;
  }
}