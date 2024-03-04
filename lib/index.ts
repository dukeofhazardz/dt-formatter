// A DateTimeFormatter Module

import { padZero, getYear } from "./helper"

export class DateTimeFormatter {
  /**
   * The DateTimeFormatter class facilitates the formatting of date and time values in various formats.
   * @param timestamp An optional 'Date | string | number' date-string argument for date-time (optional).
   */

  // Private Properties
  private datetime: Date
  private month: number
  private fullMonth: string
  private day: number
  private year: number
  private fullYear: number
  private hours: number
  private minutes: number
  private seconds: number

  constructor(timestamp?: string) {
    /**
     * Initializes the DateTimeFormatter class
     * @param timestamp The user date-string argument for date-time (optional).
    */
    this.datetime = timestamp ? new Date(timestamp) : new Date()
    this.month = this.datetime.getMonth() + 1;
    this.fullMonth = this.datetime.toLocaleString('en', { month: "long" });
    this.day = this.datetime.getDate();
    this.year = this.datetime.getFullYear();
    this.fullYear = getYear(this.datetime.getFullYear())
    this.hours = this.datetime.getHours();
    this.minutes = this.datetime.getMinutes();
    this.seconds = this.datetime.getSeconds();
  }

  private formatDate(dateFormatStringArray: string[]) {
    /**
     * Returns a string[] containing the formatted date
     * @param dateFormatStringArray An array containing the string format for the date.
    */
    const dateSectionArray: string[] = []

    dateFormatStringArray.forEach(dateString => {
      switch(dateString.toUpperCase()) {
        case "YYYY":
          dateSectionArray.push(padZero(this.fullYear));
          break;
        case "YY":
          dateSectionArray.push(padZero(this.year));
          break;
        case "MMMM":
          dateSectionArray.push(this.fullMonth);
          break;
        case "MM":
          dateSectionArray.push(padZero(this.month));
          break;
        case "DD":
          dateSectionArray.push(padZero(this.day));
          break;
        default:
          if (!["YYYY","YY", "MMMM", "MM", "DD"].includes(dateString.toUpperCase())) {
            throw new Error(`Invalid format specifier: ${dateString}`);
        }
      }
    });
    return dateSectionArray
  }
  
  private formatTime(timeFormatStringArray: string[]) {
    /**
     * Returns a string[] containing the formatted time
     * @param timeFormatStringArray An array containing the string format for the time.
    */
    const timeSectionArray: string[] = []

    timeFormatStringArray.forEach(timeString => {
      switch(timeString.toLowerCase()) {
        case "hh":
          timeSectionArray.push(padZero(this.hours))
          break;
        case "mm":
          timeSectionArray.push(padZero(this.minutes))
          break;
        case "ss":
          timeSectionArray.push(padZero(this.seconds))
          break;
        default:
          if (!["hh", "mm", "ss"].includes(timeString.toLowerCase())) {
            throw new Error(`Invalid format specifier: ${timeString}`);
        }
      }
    });
    return timeSectionArray
  }

  date(dateStringFormat?: string) {
    /**
     * Returns a formatted date string
     * @param dateStringFormat The format for the time (optional).
    */

    if (dateStringFormat) {
      let dateFormatStringArray: string[] = []
      if (dateStringFormat.includes(":")) {
        dateFormatStringArray = dateStringFormat.split(':')
      } else {
        throw new Error("Date string format literal must be separated with ':'")
      }
      const dateSectionArray: string[] = this.formatDate(dateFormatStringArray)

      if (dateSectionArray.length !== 3) {
        throw new Error(`Invalid format specifier length: ${dateSectionArray.length}, expected 3`);
      }
      return `${dateSectionArray[0]}/${dateSectionArray[1]}/${dateSectionArray[2]}`
    }
    return `${padZero(this.day)}/${padZero(this.month)}/${this.year}`;
  }

  time(timeStringFormat?: string) {
    /**
     * Returns a formatted time string
     * @param timeStringFormat The format for the time (optional).
    */

    if (timeStringFormat) {
      let timeFormatStringArray: string[] = []
      if (timeStringFormat.includes(":")) {
        timeFormatStringArray = timeStringFormat.split(':')
      } else {
        throw new Error("Time string format literal must be separated with ':'")
      }
      const timeSectionArray: string[] = this.formatTime(timeFormatStringArray)

      if (timeSectionArray.length < 2 || timeSectionArray.length > 3) {
        throw new Error(`Invalid format specifier length: ${timeSectionArray.length}, expected 2 or 3`);
      }
        
      return timeSectionArray.length === 3 ? `${timeSectionArray[0]}:${timeSectionArray[1]}:${timeSectionArray[2]}` : `${timeSectionArray[0]}:${timeSectionArray[1]}`
    }
    return `${padZero(this.hours)}:${padZero(this.minutes)}:${padZero(this.seconds)}`
  }

  format(dateStringFormat: string, timeStringFormat?: string) {
    /**
     * Returns a formatted date or date-time string
     * @param dateStringFormat The format for the date.
     * @param timeStringFormat The format for the time (optional).
    */
    if (!dateStringFormat && !timeStringFormat) {
      throw new Error('At least one argument must be provided.');
    }
    let timeLiteral: string = ""
    let dateLiteral: string = ""
    if (dateStringFormat) {
      let dateFormatStringArray: string[] = []
      if (dateStringFormat.includes(":")) {
        dateFormatStringArray = dateStringFormat.split(':')
      } else {
        throw new Error("Date string format literal must be separated with ':'")
      }
      const dateSectionArray: string[] = this.formatDate(dateFormatStringArray)

      if (dateSectionArray.length !== 3) {
        throw new Error(`Invalid format specifier length: ${dateSectionArray.length}, expected 3`);
      }
      dateLiteral = `${dateSectionArray[0]}/${dateSectionArray[1]}/${dateSectionArray[2]}`
    } else {
      throw new Error("Expected a date string format")
    }

    if (timeStringFormat) {
      let timeFormatStringArray: string[] = []
      if (timeStringFormat.includes(":")) {
        timeFormatStringArray = timeStringFormat.split(':')
      } else {
        throw new Error("Time string format literal must be separated with ':'")
      }
      const timeSectionArray: string[] = this.formatTime(timeFormatStringArray)

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
