"use strict";
// A DateTimeFormater Module
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeFormatter = void 0;
const helper_1 = require("./helper");
class DateTimeFormatter {
    constructor(timestamp) {
        this.datetime = timestamp ? new Date(timestamp) : new Date();
        this.month = this.datetime.getMonth() + 1;
        this.day = this.datetime.getDate();
        this.year = this.datetime.getFullYear();
        this.hours = this.datetime.getHours();
        this.minutes = this.datetime.getMinutes();
        this.seconds = this.datetime.getSeconds();
    }
    date(dateStringFormat) {
        // Explicitly returns a formatted date time string
        if (dateStringFormat) {
            try {
                const formatStringArray = dateStringFormat.split(':');
                const dateSectionArray = [];
                formatStringArray.forEach(dateString => {
                    if (!["YY", "MM", "DD"].includes(dateString.toUpperCase())) {
                        throw new Error(`Invalid format specifier: ${dateString}`);
                    }
                    if ((dateString).toUpperCase() === "YY") {
                        dateSectionArray.push((0, helper_1.padZero)(this.year));
                    }
                    if ((dateString).toUpperCase() === "MM") {
                        dateSectionArray.push((0, helper_1.padZero)(this.month));
                    }
                    if ((dateString).toUpperCase() === "DD") {
                        dateSectionArray.push((0, helper_1.padZero)(this.day));
                    }
                });
                if (dateSectionArray.length !== 3) {
                    throw new Error(`Invalid format specifier length: ${dateSectionArray.length}, expected 3`);
                }
                return `${dateSectionArray[0]}/${dateSectionArray[1]}/${dateSectionArray[2]}`;
            }
            catch (error) {
                console.error(error);
            }
        }
        return `${(0, helper_1.padZero)(this.day)}/${(0, helper_1.padZero)(this.month)}/${this.year}`;
    }
    time(timeStringFormat) {
        if (timeStringFormat) {
            try {
                const formatStringArray = timeStringFormat.split(':');
                const timeSectionArray = [];
                formatStringArray.forEach(timeString => {
                    if (!["hh", "mm", "ss"].includes(timeString.toLowerCase())) {
                        throw new Error(`Invalid format specifier: ${timeString}`);
                    }
                    if ((timeString).toLowerCase() === "hh") {
                        timeSectionArray.push((0, helper_1.padZero)(this.hours));
                    }
                    if ((timeString).toLowerCase() === "mm") {
                        timeSectionArray.push((0, helper_1.padZero)(this.minutes));
                    }
                    if ((timeString).toLowerCase() === "ss") {
                        timeSectionArray.push((0, helper_1.padZero)(this.seconds));
                    }
                });
                if (timeSectionArray.length < 2 || timeSectionArray.length > 3) {
                    throw new Error(`Invalid format specifier length: ${timeSectionArray.length}, expected 2 or 3`);
                }
                return timeSectionArray.length === 3 ? `${timeSectionArray[0]}:${timeSectionArray[1]}:${timeSectionArray[2]}` : `${timeSectionArray[0]}:${timeSectionArray[1]}`;
            }
            catch (error) {
                console.error(error);
            }
        }
        return `${(0, helper_1.padZero)(this.hours)}:${(0, helper_1.padZero)(this.minutes)}:${(0, helper_1.padZero)(this.seconds)}`;
    }
    format(dateStringFormat, timeStringFormat) {
        /**
         * @param dateStringFormat The format for the date.
         * @param timeStringFormat The format for the time (optional).
        */
        if (!dateStringFormat && !timeStringFormat) {
            throw new Error('At least one argument must be provided.');
        }
        let timeLiteral = "";
        let dateLiteral = "";
        if (dateStringFormat) {
            try {
                const formatStringArray = dateStringFormat.split(':');
                const dateSectionArray = [];
                formatStringArray.forEach(dateString => {
                    if (!["YY", "MM", "DD"].includes(dateString.toUpperCase())) {
                        throw new Error(`Invalid format specifier: ${dateString}`);
                    }
                    if ((dateString).toUpperCase() === "YY") {
                        dateSectionArray.push((0, helper_1.padZero)(this.year));
                    }
                    if ((dateString).toUpperCase() === "MM") {
                        dateSectionArray.push((0, helper_1.padZero)(this.month));
                    }
                    if ((dateString).toUpperCase() === "DD") {
                        dateSectionArray.push((0, helper_1.padZero)(this.day));
                    }
                });
                if (dateSectionArray.length !== 3) {
                    throw new Error(`Invalid format specifier length: ${dateSectionArray.length}, expected 3`);
                }
                dateLiteral = `${dateSectionArray[0]}/${dateSectionArray[1]}/${dateSectionArray[2]}`;
            }
            catch (error) {
                console.error(error);
            }
        }
        if (timeStringFormat) {
            try {
                const formatStringArray = timeStringFormat.split(':');
                const timeSectionArray = [];
                formatStringArray.forEach(timeString => {
                    if (!["hh", "mm", "ss"].includes(timeString.toLowerCase())) {
                        throw new Error(`Invalid format specifier: ${timeString}`);
                    }
                    if ((timeString).toLowerCase() === "hh") {
                        timeSectionArray.push((0, helper_1.padZero)(this.hours));
                    }
                    if ((timeString).toLowerCase() === "mm") {
                        timeSectionArray.push((0, helper_1.padZero)(this.minutes));
                    }
                    if ((timeString).toLowerCase() === "ss") {
                        timeSectionArray.push((0, helper_1.padZero)(this.seconds));
                    }
                });
                if (timeSectionArray.length < 2 || timeSectionArray.length > 3) {
                    throw new Error(`Invalid format specifier length: ${timeSectionArray.length}, expected 2 or 3`);
                }
                timeLiteral = timeSectionArray.length === 3 ? `${timeSectionArray[0]}:${timeSectionArray[1]}:${timeSectionArray[2]}` : `${timeSectionArray[0]}:${timeSectionArray[1]}`;
            }
            catch (error) {
                console.error(error);
            }
        }
        let formattedDateTime = "";
        if (dateLiteral) {
            formattedDateTime = timeLiteral ? dateLiteral + " " + timeLiteral : dateLiteral;
        }
        return formattedDateTime;
    }
}
exports.DateTimeFormatter = DateTimeFormatter;
