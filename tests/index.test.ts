import { DateTimeFormatter } from "../lib";
import { padZero } from "../lib/helper";

describe('DateTimeFormatter', () => {
  describe('constructor', () => {
    it("should create a DateTimeFormatter instance with the current date if no timestamp is provided", () => {
      const formatter = new DateTimeFormatter();
      const currentDate = new Date();
      expect(formatter.date()).toEqual(`${padZero(currentDate.getDate())}/${padZero(currentDate.getMonth() + 1)}/${padZero(currentDate.getFullYear())}`);
      expect(formatter.time()).toEqual(`${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`);
    });

    it('should create a DateTimeFormatter instance with the provided timestamp', () => {
      const timestamp = '2024-03-05T12:30:45';
      const formatter = new DateTimeFormatter(timestamp);
      expect(formatter.date()).toEqual('05/03/2024');
      expect(formatter.time()).toEqual('12:30:45');
    });
  });
});
