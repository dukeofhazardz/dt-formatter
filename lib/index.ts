// A DateTimeFormatter Module

import { padZero, getYear } from "./helper"

export class DateTimeFormatter {
  // Defines the DateTimeFormatter class

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
      const dateSectionArray: string[] = []

      dateFormatStringArray.forEach(dateString => {
        if (!["YYYY", "YY", "MMMM", "MM", "DD"].includes(dateString.toUpperCase())) {
          throw new Error(`Invalid format specifier: ${dateString}`);
        }
        if ((dateString).toUpperCase() === "YYYY") {
          dateSectionArray.push(padZero(this.fullYear))
        }
        if ((dateString).toUpperCase() === "YY") {
          dateSectionArray.push(padZero(this.year))
        }
        if ((dateString).toUpperCase() === "MMMM") {
          dateSectionArray.push(this.fullMonth)
        }
        if ((dateString).toUpperCase() === "MM") {
          dateSectionArray.push(padZero(this.month))
        }
        if ((dateString).toUpperCase() === "DD") {
          dateSectionArray.push(padZero(this.day))
        }
      });

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
      const timeSectionArray: string[] = []

      timeFormatStringArray.forEach(timeString => {
        if (!["hh", "mm", "ss"].includes(timeString.toLowerCase())) {
          throw new Error(`Invalid format specifier: ${timeString}`);
        }
        if ((timeString).toLowerCase() === "hh") {
          timeSectionArray.push(padZero(this.hours))
        }
        if ((timeString).toLowerCase() === "mm") {
          timeSectionArray.push(padZero(this.minutes))
        }
        if ((timeString).toLowerCase() === "ss") {
          timeSectionArray.push(padZero(this.seconds))
        }
      });

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
      const dateSectionArray: string[] = []

      dateFormatStringArray.forEach(dateString => {
        if (!["YY", "MM", "DD"].includes(dateString.toUpperCase())) {
          throw new Error(`Invalid format specifier: ${dateString}`);
        }
        if ((dateString).toUpperCase() === "YY") {
          dateSectionArray.push(padZero(this.year))
        }
        if ((dateString).toUpperCase() === "MM") {
          dateSectionArray.push(padZero(this.month))
        }
        if ((dateString).toUpperCase() === "DD") {
          dateSectionArray.push(padZero(this.day))
        }
      });

      if (dateSectionArray.length !== 3) {
        throw new Error(`Invalid format specifier length: ${dateSectionArray.length}, expected 3`);
      }
      dateLiteral = `${dateSectionArray[0]}/${dateSectionArray[1]}/${dateSectionArray[2]}`

    }

    if (timeStringFormat) {
      let timeFormatStringArray: string[] = []
      if (timeStringFormat.includes(":")) {
        timeFormatStringArray = timeStringFormat.split(':')
      } else {
        throw new Error("Time string format literal must be separated with ':'")
      }
      const timeSectionArray: string[] = []

      timeFormatStringArray.forEach(timeString => {
        if (!["hh", "mm", "ss"].includes(timeString.toLowerCase())) {
          throw new Error(`Invalid format specifier: ${timeString}`);
        }
        if ((timeString).toLowerCase() === "hh") {
          timeSectionArray.push(padZero(this.hours))
        }
        if ((timeString).toLowerCase() === "mm") {
          timeSectionArray.push(padZero(this.minutes))
        }
        if ((timeString).toLowerCase() === "ss") {
          timeSectionArray.push(padZero(this.seconds))
        }
      });

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
