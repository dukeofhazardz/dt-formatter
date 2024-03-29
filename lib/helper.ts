export const padZero = (value: number): string => {
  /**
     * A helper function that ensures that each component of the date has two digits, with leading zeros if necessary.
     * @param value A number component of the date/time.
    */
  return String(value).padStart(2, '0');
};

export const getYear = (year: number) => {
  /**
   * Returns the last two digits of the year
   * @param year A number variable of the year
   */ 
  return year % 100
}
