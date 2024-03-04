export declare class DateTimeFormatter {
    /**
     * The DateTimeFormatter class facilitates the formatting of date and time values in various formats.
     * @param timestamp An optional 'Date | string | number' date-string argument for date-time (optional).
     */
    private datetime;
    private month;
    private fullMonth;
    private day;
    private year;
    private fullYear;
    private hours;
    private minutes;
    private seconds;
    constructor(timestamp?: string);
    private formatDate;
    private formatTime;
    date(dateStringFormat?: string): string;
    time(timeStringFormat?: string): string;
    format(dateStringFormat: string, timeStringFormat?: string): string;
}
