"use strict";
// A DateTimeFormatter Module
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeFormatter = void 0;
const helper_1 = require("./helper");
class DateTimeFormatter {
    constructor(timestamp) {
        /**
         * Initializes the DateTimeFormatter class
         * @param timestamp The user date-string argument for date-time (optional).
        */
        this.datetime = timestamp ? new Date(timestamp) : new Date();
        this.month = this.datetime.getMonth() + 1;
        this.fullMonth = this.datetime.toLocaleString('en', { month: "long" });
        this.day = this.datetime.getDate();
        this.year = this.datetime.getFullYear();
        this.fullYear = (0, helper_1.getYear)(this.datetime.getFullYear());
        this.hours = this.datetime.getHours();
        this.minutes = this.datetime.getMinutes();
        this.seconds = this.datetime.getSeconds();
    }
    formatDate(dateFormatStringArray) {
        /**
         * Returns a string[] containing the formatted date
         * @param dateFormatStringArray An array containing the string format for the date.
        */
        const dateSectionArray = [];
        dateFormatStringArray.forEach(dateString => {
            if (!["YYYY", "YY", "MMMM", "MM", "DD"].includes(dateString.toUpperCase())) {
                throw new Error(`Invalid format specifier: ${dateString}`);
            }
            if ((dateString).toUpperCase() === "YYYY") {
                dateSectionArray.push((0, helper_1.padZero)(this.fullYear));
            }
            if ((dateString).toUpperCase() === "YY") {
                dateSectionArray.push((0, helper_1.padZero)(this.year));
            }
            if ((dateString).toUpperCase() === "MMMM") {
                dateSectionArray.push(this.fullMonth);
            }
            if ((dateString).toUpperCase() === "MM") {
                dateSectionArray.push((0, helper_1.padZero)(this.month));
            }
            if ((dateString).toUpperCase() === "DD") {
                dateSectionArray.push((0, helper_1.padZero)(this.day));
            }
        });
        return dateSectionArray;
    }
    formatTime(timeFormatStringArray) {
        /**
         * Returns a string[] containing the formatted time
         * @param timeFormatStringArray An array containing the string format for the time.
        */
        const timeSectionArray = [];
        timeFormatStringArray.forEach(timeString => {
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
        return timeSectionArray;
    }
    date(dateStringFormat) {
        /**
         * Returns a formatted date string
         * @param dateStringFormat The format for the time (optional).
        */
        if (dateStringFormat) {
            let dateFormatStringArray = [];
            if (dateStringFormat.includes(":")) {
                dateFormatStringArray = dateStringFormat.split(':');
            }
            else {
                throw new Error("Date string format literal must be separated with ':'");
            }
            const dateSectionArray = this.formatDate(dateFormatStringArray);
            if (dateSectionArray.length !== 3) {
                throw new Error(`Invalid format specifier length: ${dateSectionArray.length}, expected 3`);
            }
            return `${dateSectionArray[0]}/${dateSectionArray[1]}/${dateSectionArray[2]}`;
        }
        return `${(0, helper_1.padZero)(this.day)}/${(0, helper_1.padZero)(this.month)}/${this.year}`;
    }
    time(timeStringFormat) {
        /**
         * Returns a formatted time string
         * @param timeStringFormat The format for the time (optional).
        */
        if (timeStringFormat) {
            let timeFormatStringArray = [];
            if (timeStringFormat.includes(":")) {
                timeFormatStringArray = timeStringFormat.split(':');
            }
            else {
                throw new Error("Time string format literal must be separated with ':'");
            }
            const timeSectionArray = this.formatTime(timeFormatStringArray);
            if (timeSectionArray.length < 2 || timeSectionArray.length > 3) {
                throw new Error(`Invalid format specifier length: ${timeSectionArray.length}, expected 2 or 3`);
            }
            return timeSectionArray.length === 3 ? `${timeSectionArray[0]}:${timeSectionArray[1]}:${timeSectionArray[2]}` : `${timeSectionArray[0]}:${timeSectionArray[1]}`;
        }
        return `${(0, helper_1.padZero)(this.hours)}:${(0, helper_1.padZero)(this.minutes)}:${(0, helper_1.padZero)(this.seconds)}`;
    }
    format(dateStringFormat, timeStringFormat) {
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
            const dateSectionArray = this.formatDate(dateFormatStringArray);
            if (dateSectionArray.length !== 3) {
                throw new Error(`Invalid format specifier length: ${dateSectionArray.length}, expected 3`);
            }
            dateLiteral = `${dateSectionArray[0]}/${dateSectionArray[1]}/${dateSectionArray[2]}`;
        }
        if (timeStringFormat) {
            let timeFormatStringArray = [];
            if (timeStringFormat.includes(":")) {
                timeFormatStringArray = timeStringFormat.split(':');
            }
            else {
                throw new Error("Time string format literal must be separated with ':'");
            }
            const timeSectionArray = this.formatTime(timeFormatStringArray);
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
