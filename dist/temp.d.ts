export declare class DateTimeFormatter {
    /**
     * The DateTimeFormatter class facilitates the formatting of date and time values in various formats.
     * @param timestamp An optional 'Date | string | number' date-string argument for date-time (optional).
     */
    private formatDate;
    private formatTime;
    date(dateStringFormat?: string, timestamp?: string, flags?: {
        padZero: true | false;
    }): string;
    time(timeStringFormat?: string, timestamp?: string, flags?: {
        padZero: true | false;
    }): string;
    format(dateStringFormat: string, timeStringFormat?: string, timestamp?: string, flags?: {
        padZero: true | false;
    }): string;
}
