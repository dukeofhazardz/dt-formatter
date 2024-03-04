"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYear = exports.padZero = void 0;
const padZero = (value) => {
    // A helper function that ensures that each component of the date has two digits, with leading zeros if necessary.
    return String(value).padStart(2, '0');
};
exports.padZero = padZero;
const getYear = (year) => {
    // Returns the last two digits of the year
    return year % 100;
};
exports.getYear = getYear;
