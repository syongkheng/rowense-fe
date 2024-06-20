/**
 * Utility functions for dealing with date conversion.
 */
export namespace DateUtil {

  /**
   * Converts unix timestamp to DD/MM/YYYY HH:MM
   * @param timestamp - must of of number type
   * @returns - date string in DD/MM/YYYY HH:MM 12H format
   */
  export function convertUnixToDDMMYYYYHHMM(timestamp: number) {
    // Create a new JavaScript Date object based on the timestamp
    const date = new Date(timestamp * 1000);

    // Get day, month, and year from the date object
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so we add 1
    const year = date.getFullYear().toString();

    // Get hours (in 12-hour format), minutes, and AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Return the date and time in DD/MM/YYYY hh:mm AM/PM format
    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  }
}
