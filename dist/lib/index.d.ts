export declare class DateTimeFormatter {
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
