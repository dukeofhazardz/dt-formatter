export const padZero = (value: number): string => {
    // A helper function that ensures that each component of the date has two digits, with leading zeros if necessary.
    return String(value).padStart(2, '0');
};