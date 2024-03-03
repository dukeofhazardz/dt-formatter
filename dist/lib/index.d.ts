export declare class DateTimeFormatter {
    private datetime;
    private month;
    private day;
    private year;
    private hours;
    private minutes;
    private seconds;
    constructor(timestamp?: string);
    date(dateStringFormat?: string): string;
    time(timeStringFormat?: string): string;
    format(dateStringFormat: string, timeStringFormat?: string): string;
}
