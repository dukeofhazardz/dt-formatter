import { DateTimeFormatter } from "../lib";
import { padZero } from "../lib/helper";

describe('DateTimeFormatter', () => {
  describe('dateTimeAndFormat', () => {
    it("should return the current date or time if no timestamp is provided", () => {
      const formatter = DateTimeFormatter;
      const currentDate = new Date();
      expect(formatter.date()).toEqual(`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`);
      expect(formatter.time()).toEqual(`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`);
      expect(formatter.format()).toEqual(`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`);
    });

    it('should return the current date or time with the provided timestamp', () => {
      const timestamp = '2024-03-05T12:30:45';
      const formatter = DateTimeFormatter;
      expect(formatter.date({timestamp: timestamp})).toEqual('5/3/2024');
      expect(formatter.date({timestamp: timestamp, prefixZero: true})).toEqual('05/03/2024');
      expect(formatter.date({timestamp: timestamp, prefixZero: false})).toEqual('5/3/2024');
      expect(formatter.date({dateFormat: "YY-MM-DD", timestamp: timestamp, prefixZero: true})).toEqual('24/03/05')
      expect(formatter.time({timestamp: timestamp})).toEqual('12:30:45');
      expect(formatter.time({timeFormat: "hh:mm", timestamp: timestamp})).toEqual('12:30');
      expect(formatter.time({prefixZero: true, timeFormat: "HH:MM:SS", timestamp:timestamp})).toEqual("12:30:45");
      expect(formatter.format({timestamp: timestamp, timeFormat: "HH:MM"})).toEqual('5/3/2024 12:30');
      expect(formatter.format({timestamp: timestamp, dateFormat:"YY-MM-DD", prefixZero: true})).toEqual('24/03/05 12:30:45');
    });

    it("should return the expected date or time when only prefixZero is passed", () => {
      const formatter = DateTimeFormatter;
      const currentDate = new Date();
      expect(formatter.date({prefixZero: true})).toEqual(`${padZero(currentDate.getDate())}/${padZero(currentDate.getMonth() + 1)}/${padZero(currentDate.getFullYear())}`);
      expect(formatter.time({prefixZero: true})).toEqual(`${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`);
      expect(formatter.format({prefixZero: true})).toEqual(`${padZero(currentDate.getDate())}/${padZero(currentDate.getMonth() + 1)}/${padZero(currentDate.getFullYear())} ${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`);
    });

    it("should return an error if an invalid format specifier is passed", () => {
      expect(() => DateTimeFormatter.date({dateFormat: "hh-mm-ss"})).toThrow(new Error('Invalid format specifier: hh'));
      expect(() => DateTimeFormatter.time({timeFormat: "YY:MM:DD"})).toThrow(new Error('Invalid format specifier: YY'));
      expect(() => DateTimeFormatter.date({dateFormat: "yy-hh-dd"})).toThrow(new Error('Invalid format specifier: hh'));
      expect(() => DateTimeFormatter.time({timeFormat: "hh:MM:dd"})).toThrow(new Error('Invalid format specifier: dd'));
      expect(() => DateTimeFormatter.format({dateFormat:"yy-mm-dd", timeFormat: "hh:MM:dd"})).toThrow(new Error('Invalid format specifier: dd'));
      expect(() => DateTimeFormatter.format({dateFormat: "yy-hh-dd", timeFormat: "hh:mm:ss"})).toThrow(new Error('Invalid format specifier: hh'));
      expect(() => DateTimeFormatter.format({dateFormat: "yy-hh-dd", timeFormat: "YY:MM:DD"})).toThrow(new Error('Invalid format specifier: hh'));
    });

    it("should return an error if an invalid string format separator is passed", () => {
      expect(() => DateTimeFormatter.date({dateFormat: "YY:MM:DD"})).toThrow(new Error("Date string format literal must be separated with '-'"));
      expect(() => DateTimeFormatter.time({timeFormat: "HH-MM-SS"})).toThrow(new Error("Time string format literal must be separated with ':'"));
      expect(() => DateTimeFormatter.date({dateFormat: "jdjsjvsi"})).toThrow(new Error("Date string format literal must be separated with '-'"));
      expect(() => DateTimeFormatter.time({timeFormat: "jvjsvvn"})).toThrow(new Error("Time string format literal must be separated with ':'"));
      expect(() => DateTimeFormatter.format({timeFormat: "hh:mm:ss", dateFormat: "YY:MM:DD"})).toThrow(new Error("Date string format literal must be separated with '-'"));
      expect(() => DateTimeFormatter.format({timeFormat: "hh-mm-ss", dateFormat: "YY:MM:DD"})).toThrow(new Error("Date string format literal must be separated with '-'"));
      expect(() => DateTimeFormatter.format({dateFormat: "YY-MM-DD", timeFormat: "hh-mm-ss"})).toThrow(new Error("Time string format literal must be separated with ':'"));
    });

    it("should return an error when more than 3 string formats are passed", () => {
      expect(() => DateTimeFormatter.date({dateFormat: "YY-MM-DD-DD"})).toThrow(new Error("Invalid format specifier length: 4, expected 3"));
      expect(() => DateTimeFormatter.time({timeFormat: "HH:MM:SS:hh"})).toThrow(new Error("Invalid format specifier length: 4, expected 2 or 3"));
      expect(() => DateTimeFormatter.date({dateFormat: "DD-MM-DD-YYYY-mm"})).toThrow(new Error("Invalid format specifier length: 5, expected 3"));
      expect(() => DateTimeFormatter.time({timeFormat: "hh:mm:ss:hh:ss"})).toThrow(new Error("Invalid format specifier length: 5, expected 2 or 3"));
      expect(() => DateTimeFormatter.format({timeFormat: "hh:mm:ss:hh:ss", dateFormat: "YY-MM-DD-DD"})).toThrow(new Error("Invalid format specifier length: 4, expected 3"));
      expect(() => DateTimeFormatter.format({dateFormat: "YY-MM-DD", timeFormat: "HH:MM:SS:hh"})).toThrow(new Error("Invalid format specifier length: 4, expected 2 or 3"));
    });
  });
});
