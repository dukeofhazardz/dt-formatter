"use strict";
// A DateTimeFormatter Module
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeFormatter = void 0;
const helper_1 = require("./lib/helper");
class DateTimeFormatter {
    /**
     * The DateTimeFormatter class facilitates the formatting of date and time values in various formats.
     * @param timestamp An optional 'Date | string | number' date-string argument for date-time (optional).
     */
    formatDate(dateFormatStringArray, timestamp, flags) {
        /**
         * Returns a string[] containing the formatted date
         * @param dateFormatStringArray An array containing the string format for the date.
        */
        const datetime = timestamp ? new Date(timestamp) : new Date();
        const month = datetime.getMonth() + 1;
        const fullMonth = datetime.toLocaleString('en', { month: "long" });
        const day = datetime.getDate();
        const year = datetime.getFullYear();
        const fullYear = (0, helper_1.getYear)(datetime.getFullYear());
        const dateSectionArray = [];
        dateFormatStringArray.forEach(dateString => {
            switch (dateString.toUpperCase()) {
                case "YYYY":
                    dateSectionArray.push(flags ? (0, helper_1.padZero)(fullYear) : (fullYear).toString());
                    break;
                case "YY":
                    dateSectionArray.push(flags ? (0, helper_1.padZero)(year) : (year).toString());
                    break;
                case "MMMM":
                    dateSectionArray.push(fullMonth);
                    break;
                case "MM":
                    dateSectionArray.push(flags ? (0, helper_1.padZero)(month) : (month).toString());
                    break;
                case "DD":
                    dateSectionArray.push(flags ? (0, helper_1.padZero)(day) : (day).toString());
                    break;
                default:
                    if (!["YYYY", "YY", "MMMM", "MM", "DD"].includes(dateString.toUpperCase())) {
                        throw new Error(`Invalid format specifier: ${dateString}`);
                    }
            }
        });
        return dateSectionArray;
    }
    formatTime(timeFormatStringArray, timestamp, flags) {
        /**
         * Returns a string[] containing the formatted time
         * @param timeFormatStringArray An array containing the string format for the time.
        */
        const datetime = timestamp ? new Date(timestamp) : new Date();
        const hours = datetime.getHours();
        const minutes = datetime.getMinutes();
        const seconds = datetime.getSeconds();
        const timeSectionArray = [];
        timeFormatStringArray.forEach(timeString => {
            switch (timeString.toLowerCase()) {
                case "hh":
                    timeSectionArray.push(flags ? (0, helper_1.padZero)(hours) : (hours).toString());
                    break;
                case "mm":
                    timeSectionArray.push(flags ? (0, helper_1.padZero)(minutes) : (minutes).toString());
                    break;
                case "ss":
                    timeSectionArray.push(flags ? (0, helper_1.padZero)(seconds) : (seconds).toString());
                    break;
                default:
                    if (!["hh", "mm", "ss"].includes(timeString.toLowerCase())) {
                        throw new Error(`Invalid format specifier: ${timeString}`);
                    }
            }
        });
        return timeSectionArray;
    }
    date(dateStringFormat, timestamp, flags) {
        /**
         * Returns a formatted date string
         * @param dateStringFormat The format for the time (optional).
        */
        const datetime = timestamp ? new Date(timestamp) : new Date();
        if (dateStringFormat) {
            let dateFormatStringArray = [];
            if (dateStringFormat.includes(":")) {
                dateFormatStringArray = dateStringFormat.split(':');
            }
            else {
                throw new Error("Date string format literal must be separated with ':'");
            }
            const dateSectionArray = this.formatDate(dateFormatStringArray, timestamp, flags);
            if (dateSectionArray.length !== 3) {
                throw new Error(`Invalid format specifier length: ${dateSectionArray.length}, expected 3`);
            }
            return `${dateSectionArray[0]}/${dateSectionArray[1]}/${dateSectionArray[2]}`;
        }
        return `${(0, helper_1.padZero)(datetime.getDate())}/${(0, helper_1.padZero)(datetime.getMonth() + 1)}/${datetime.getFullYear()}`;
    }
    time(timeStringFormat, timestamp, flags) {
        /**
         * Returns a formatted time string
         * @param timeStringFormat The format for the time (optional).
        */
        const datetime = timestamp ? new Date(timestamp) : new Date();
        if (timeStringFormat) {
            let timeFormatStringArray = [];
            if (timeStringFormat.includes(":")) {
                timeFormatStringArray = timeStringFormat.split(':');
            }
            else {
                throw new Error("Time string format literal must be separated with ':'");
            }
            const timeSectionArray = this.formatTime(timeFormatStringArray, timestamp, flags);
            if (timeSectionArray.length < 2 || timeSectionArray.length > 3) {
                throw new Error(`Invalid format specifier length: ${timeSectionArray.length}, expected 2 or 3`);
            }
            return timeSectionArray.length === 3 ? `${timeSectionArray[0]}:${timeSectionArray[1]}:${timeSectionArray[2]}` : `${timeSectionArray[0]}:${timeSectionArray[1]}`;
        }
        return `${(0, helper_1.padZero)(datetime.getHours())}:${(0, helper_1.padZero)(datetime.getMinutes())}:${(0, helper_1.padZero)(datetime.getSeconds())}`;
    }
    format(dateStringFormat, timeStringFormat, timestamp, flags) {
        /**
         * Returns a formatted date or date-time string
         * @param dateStringFormat The format for the date.
         * @param timeStringFormat The format for the time (optional).
        */
        if (!dateStringFormat && !timeStringFormat) {
            throw new Error('At least one argument must be provided.');
        }
        let timeLiteral = "";
        let dateLiteral = "";
        if (dateStringFormat) {
            let dateFormatStringArray = [];
            if (dateStringFormat.includes(":")) {
                dateFormatStringArray = dateStringFormat.split(':');
            }
            else {
                throw new Error("Date string format literal must be separated with ':'");
            }
            const dateSectionArray = this.formatDate(dateFormatStringArray, timestamp, flags);
            if (dateSectionArray.length !== 3) {
                throw new Error(`Invalid format specifier length: ${dateSectionArray.length}, expected 3`);
            }
            dateLiteral = `${dateSectionArray[0]}/${dateSectionArray[1]}/${dateSectionArray[2]}`;
        }
        else {
            throw new Error("Expected a date string format");
        }
        if (timeStringFormat) {
            let timeFormatStringArray = [];
            if (timeStringFormat.includes(":")) {
                timeFormatStringArray = timeStringFormat.split(':');
            }
            else {
                throw new Error("Time string format literal must be separated with ':'");
            }
            const timeSectionArray = this.formatTime(timeFormatStringArray, timestamp, flags);
            if (timeSectionArray.length < 2 || timeSectionArray.length > 3) {
                throw new Error(`Invalid format specifier length: ${timeSectionArray.length}, expected 2 or 3`);
            }
            timeLiteral = timeSectionArray.length === 3 ? `${timeSectionArray[0]}:${timeSectionArray[1]}:${timeSectionArray[2]}` : `${timeSectionArray[0]}:${timeSectionArray[1]}`;
        }
        let formattedDateTime = "";
        if (dateLiteral) {
            formattedDateTime = timeLiteral ? dateLiteral + " " + timeLiteral : dateLiteral;
        }
        return formattedDateTime;
    }
}
exports.DateTimeFormatter = DateTimeFormatter;
