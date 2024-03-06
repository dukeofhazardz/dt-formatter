export declare class DateTimeFormatter {
    /**
     * The DateTimeFormatter class facilitates the formatting of date and time values in various formats.
     */
    private static formatDate;
    private static formatTime;
    static date(dateStringFormat?: string, timestamp?: string, flags?: {
        prefixZero: boolean;
    }): string;
    static time(timeStringFormat?: string, timestamp?: string, flags?: {
        prefixZero: boolean;
    }): string;
    static format(dateStringFormat: string, timeStringFormat?: string, timestamp?: string, flags?: {
        prefixZero: boolean;
    }): string;
}
