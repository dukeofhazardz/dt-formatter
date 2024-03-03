// A DateTimeFormater Module

import { padZero } from "./helper"

export class DateTimeFormatter {
  // Defines the DateTimeFormatter class

  // Private Properties
  private datetime: Date
  private month: number
  private day: number
  private year: number
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
    this.day = this.datetime.getDate();
    this.year = this.datetime.getFullYear();
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
      try {
        const formatStringArray = dateStringFormat.split(':') as string[]
        const dateSectionArray: string[] = []

        formatStringArray.forEach(dateString => {
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
        return `${dateSectionArray[0]}/${dateSectionArray[1]}/${dateSectionArray[2]}`
        
      } catch(error) {
        console.error(error)
      }
    }
    return `${padZero(this.day)}/${padZero(this.month)}/${this.year}`;
  }

  time(timeStringFormat?: string) {
    /**
     * Returns a formatted time string
     * @param timeStringFormat The format for the time (optional).
    */

    if (timeStringFormat) {
      try {
        const formatStringArray = timeStringFormat.split(':') as string[]
        const timeSectionArray: string[] = []

        formatStringArray.forEach(timeString => {
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
        
      } catch(error) {
        console.error(error)
      }
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
      try {
        const formatStringArray = dateStringFormat.split(':') as string[]
        const dateSectionArray: string[] = []

        formatStringArray.forEach(dateString => {
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
        
      } catch(error) {
        console.error(error)
      }
    }

    if (timeStringFormat) {
      try {
        const formatStringArray = timeStringFormat.split(':') as string[]
        const timeSectionArray: string[] = []

        formatStringArray.forEach(timeString => {
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
        
      } catch(error) {
        console.error(error)
      }
    }

    let formattedDateTime: string = ""
    if (dateLiteral) {
      formattedDateTime = timeLiteral ? dateLiteral + " " + timeLiteral : dateLiteral
    }
    return formattedDateTime
  }
}
