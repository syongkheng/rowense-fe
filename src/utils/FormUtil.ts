export namespace FormUtil {
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