import { DateTimeFormatter } from "../lib";

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

    it("should return an error if an invalid format specifier is passed", () => {
      const formatter = DateTimeFormatter;
      expect(formatter.date({dateFormat: "hh:mm:ss"})).toThrow(new Error('Invalid format specifier: "hh:mm:ss"'))
    });

    it("should return an error if an invalid string format separator is passed", () => {
      const formatter = DateTimeFormatter;
      expect(formatter.date({dateFormat: "YY:MM:DD"})).toThrow(new Error("Date string format literal must be separated with '-'"))
    });
  });
});
