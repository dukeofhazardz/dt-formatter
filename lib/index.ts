// A DateTimeFormatter Module

import { padZero, getYear } from "./helper"

export class DateTimeFormatter {
  /**
   * The DateTimeFormatter class facilitates the formatting of date and time values in various formats.
   */

  private static formatDate(dateFormatStringArray: string[], timestamp?: string, prefixZero?: boolean): string[] {
    /**
     * Returns a string[] containing the formatted date
     * @param dateFormatStringArray An array containing the string format for the date.
     * @param timestamp An optional 'Date | string | number' date-string argument for date-time (optional).
     * @param prefixZero An optional boolean value to toogle the prefixing of '0' before a single digit (optional).
    */
    const datetime = timestamp ? new Date(timestamp) : new Date()
    const month = datetime.getMonth() + 1;
    const fullMonth = datetime.toLocaleString('en', { month: "long" });
    const day = datetime.getDate();
    const year = datetime.getFullYear();
    const fullYear = getYear(datetime.getFullYear())

    const dateSectionArray: string[] = []

    dateFormatStringArray.forEach(dateString => {
      switch(dateString.toUpperCase()) {
        case "YYYY":
          dateSectionArray.push(prefixZero ? padZero(fullYear) : (fullYear).toString());
          break;
        case "YY":
          dateSectionArray.push(prefixZero ? padZero(year) : (year).toString());
          break;
        case "MMMM":
          dateSectionArray.push(fullMonth);
          break;
        case "MM":
          dateSectionArray.push(prefixZero ? padZero(month) : (month).toString());
          break;
        case "DD":
          dateSectionArray.push(prefixZero ? padZero(day) : (day).toString());
          break;
        default:
          if (!["YYYY","YY", "MMMM", "MM", "DD"].includes(dateString.toUpperCase())) {
            throw new Error(`Invalid format specifier: ${dateString}`);
        }
      }
    });
    return dateSectionArray
  }
  
  private static formatTime(timeFormatStringArray: string[], timestamp?: string, prefixZero?: boolean): string[] {
    /**
     * Returns a string[] containing the formatted time
     * @param timeFormatStringArray An array containing the string format for the time.
     * @param timestamp An optional 'Date | string | number' date-string argument for date-time (optional).
     * @param prefixZero An optional boolean value to toogle the prefixing of '0' before a single digit (optional).
    */
    const datetime = timestamp ? new Date(timestamp) : new Date()
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const seconds = datetime.getSeconds();

    const timeSectionArray: string[] = []

    timeFormatStringArray.forEach(timeString => {
      switch(timeString.toLowerCase()) {
        case "hh":
          timeSectionArray.push(prefixZero ? padZero(hours) : (hours).toString())
          break;
        case "mm":
          timeSectionArray.push(prefixZero ? padZero(minutes): (minutes).toString())
          break;
        case "ss":
          timeSectionArray.push(prefixZero ? padZero(seconds) : (seconds).toString())
          break;
        default:
          if (!["hh", "mm", "ss"].includes(timeString.toLowerCase())) {
            throw new Error(`Invalid format specifier: ${timeString}`);
        }
      }
    });
    return timeSectionArray
  }
  
  static date(options?: { dateFormat?: string; timestamp?: string; prefixZero?: boolean }) {
    /**
     * Returns a formatted date string
     * @param dateFormat The format for the time (optional).
     * @param timestamp An optional 'Date | string | number' date-string argument for date-time (optional).
     * @param prefixZero An optional boolean value to toogle the prefixing of '0' before a single digit (optional).
    */
    options = options || {};
    const { dateFormat, timestamp, prefixZero } = options;
    const datetime = timestamp ? new Date(timestamp) : new Date()

    if (dateFormat) {
      let dateFormatStringArray: string[] = []
      if (dateFormat.includes(":")) {
        dateFormatStringArray = dateFormat.split(':')
      } else {
        throw new Error("Date string format literal must be separated with ':'")
      }
      const dateSectionArray: string[] = this.formatDate(dateFormatStringArray, timestamp, prefixZero)

      if (dateSectionArray.length !== 3) {
        throw new Error(`Invalid format specifier length: ${dateSectionArray.length}, expected 3`);
      }
      return `${dateSectionArray[0]}/${dateSectionArray[1]}/${dateSectionArray[2]}`
    }
    return `${prefixZero ? padZero(datetime.getDate()) : datetime.getDate()}/${prefixZero ? padZero(datetime.getMonth() + 1) : datetime.getMonth() + 1}/${datetime.getFullYear()}`;
  }

  static time(options?: {timeFormat?: string, timestamp?: string, prefixZero?: boolean}) {
    /**
     * Returns a formatted time string
     * @param timeFormat The format for the time (optional).
     * @param timestamp An optional 'Date | string | number' date-string argument for date-time (optional).
     * @param prefixZero An optional boolean value to toogle the prefixing of '0' before a single digit (optional).
    */
    options = options || {};
    const { timeFormat, timestamp, prefixZero } = options;
    const datetime = timestamp ? new Date(timestamp) : new Date()

    if (timeFormat) {
      let timeFormatStringArray: string[] = []
      if (timeFormat.includes(":")) {
        timeFormatStringArray = timeFormat.split(':')
      } else {
        throw new Error("Time string format literal must be separated with ':'")
      }
      const timeSectionArray: string[] = this.formatTime(timeFormatStringArray, timestamp, prefixZero)

      if (timeSectionArray.length < 2 || timeSectionArray.length > 3) {
        throw new Error(`Invalid format specifier length: ${timeSectionArray.length}, expected 2 or 3`);
      }
        
      return timeSectionArray.length === 3 ? `${timeSectionArray[0]}:${timeSectionArray[1]}:${timeSectionArray[2]}` : `${timeSectionArray[0]}:${timeSectionArray[1]}`
    }
    return `${prefixZero ? padZero(datetime.getHours()) : datetime.getHours()}:${prefixZero ? padZero(datetime.getMinutes()) : datetime.getMinutes()}:${prefixZero ? padZero(datetime.getSeconds()) : datetime.getSeconds()}`
  }

  static format(options: { dateFormat: string, timeFormat?: string, timestamp?: string, prefixZero?: boolean }) {
    /**
     * Returns a formatted date or date-time string
     * @param dateFormat The format for the date.
     * @param timeFormat The format for the time (optional).
     * @param timestamp An optional 'Date | string | number' date-string argument for date-time (optional).
     * @param prefixZero An optional boolean value to toogle the prefixing of '0' before a single digit (optional).
    */

    const { dateFormat, timeFormat, timestamp, prefixZero } = options;
    let timeLiteral: string = ""
    let dateLiteral: string = ""

    if (dateFormat) {
      let dateFormatStringArray: string[] = []
      if (dateFormat.includes(":")) {
        dateFormatStringArray = dateFormat.split(':')
      } else {
        throw new Error("Date string format literal must be separated with ':'")
      }
      const dateSectionArray: string[] = this.formatDate(dateFormatStringArray, timestamp, prefixZero)

      if (dateSectionArray.length !== 3) {
        throw new Error(`Invalid format specifier length: ${dateSectionArray.length}, expected 3`);
      }
      dateLiteral = `${dateSectionArray[0]}/${dateSectionArray[1]}/${dateSectionArray[2]}`
    } else {
      throw new Error("Expected a date string format")
    }

    if (timeFormat) {
      let timeFormatStringArray: string[] = []
      if (timeFormat.includes(":")) {
        timeFormatStringArray = timeFormat.split(':')
      } else {
        throw new Error("Time string format literal must be separated with ':'")
      }
      const timeSectionArray: string[] = this.formatTime(timeFormatStringArray, timestamp, prefixZero)

      if (timeSectionArray.length < 2 || timeSectionArray.length > 3) {
        throw new Error(`Invalid format specifier length: ${timeSectionArray.length}, expected 2 or 3`);
      }
        
      timeLiteral = timeSectionArray.length === 3 ? `${timeSectionArray[0]}:${timeSectionArray[1]}:${timeSectionArray[2]}` : `${timeSectionArray[0]}:${timeSectionArray[1]}`
    }

    let formattedDateTime: string = ""
    if (dateLiteral) {
      formattedDateTime = timeLiteral ? dateLiteral + " " + timeLiteral : dateLiteral
    }
    return formattedDateTime
  }
}
