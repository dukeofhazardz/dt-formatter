import { DateTimeFormatter } from "../lib";
import { padZero } from "../lib/helper";

describe('DateTimeFormatter', () => {
  describe('constructor', () => {
    it("should create a DateTimeFormatter instance with the current date if no timestamp is provided", () => {
      const formatter = DateTimeFormatter;
      const currentDate = new Date();
      expect(formatter.date()).toEqual(`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`);
      expect(formatter.time()).toEqual(`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`);
    });

    it('should create a DateTimeFormatter instance with the provided timestamp', () => {
      const timestamp = '2024-03-05T12:30:45';
      const formatter = DateTimeFormatter;
      expect(formatter.date({timestamp: timestamp})).toEqual('5/3/2024');
      expect(formatter.date({timestamp: timestamp, prefixZero: true})).toEqual('05/03/2024');
      expect(formatter.date({timestamp: timestamp, prefixZero: false})).toEqual('5/3/2024');
      expect(formatter.time({timestamp: timestamp})).toEqual('12:30:45');
    });
  });
});
