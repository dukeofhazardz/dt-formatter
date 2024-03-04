"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const helper_1 = require("../lib/helper");
describe('DateTimeFormatter', () => {
    describe('constructor', () => {
        it("should create a DateTimeFormatter instance with the current date if no timestamp is provided", () => {
            const formatter = new lib_1.DateTimeFormatter();
            const currentDate = new Date();
            expect(formatter.date()).toEqual(`${(0, helper_1.padZero)(currentDate.getDate())}/${(0, helper_1.padZero)(currentDate.getMonth() + 1)}/${(0, helper_1.padZero)(currentDate.getFullYear())}`);
            expect(formatter.time()).toEqual(`${(0, helper_1.padZero)(currentDate.getHours())}:${(0, helper_1.padZero)(currentDate.getMinutes())}:${(0, helper_1.padZero)(currentDate.getSeconds())}`);
        });
        it('should create a DateTimeFormatter instance with the provided timestamp', () => {
            const timestamp = '2024-03-05T12:30:45';
            const formatter = new lib_1.DateTimeFormatter(timestamp);
            expect(formatter.date()).toEqual('05/03/2024');
            expect(formatter.time()).toEqual('12:30:45');
        });
    });
});
