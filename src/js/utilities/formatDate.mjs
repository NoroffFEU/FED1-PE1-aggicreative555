/**
 * Converts an ISO date string (e.g., "2025-10-22T08:26:27.892Z")
 * into the format "dd/mm/yyyy".
 *
 * @param {string} isoDate - The date string from the API (ISO 8601 format)
 * @returns {string} - The formatted date, e.g. "22/10/2025"
*/

export function formatDate(isoDate) {
    const date = new Date(isoDate);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    return `${formattedDay}/${formattedMonth}/${year}`;
}