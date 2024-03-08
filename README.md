# DateTimeFormatter Module

The **DateTimeFormatter** module facilitates the formatting of date and time values in various formats. It provides methods to format dates, times, or both in customizable formats. This module is designed to be easy to use and flexible to accommodate different formatting needs.

The **DateTimeFormatter** module provides a convenient way to format dates and times in JavaScript/TypeScript applications. With its flexible API and customizable options, you can easily tailor the formatting to your specific needs. Whether you need to format dates, times, or both, this module has you covered.

## Installation

To use the **DateTimeFormatter** module, you can install it via npm:

```bash
npm install dt-formatter
```

## Usage

### Importing

```javascript
const { DateTimeFormatter } = require("dt-formatter");
```

### Formatting Dates

You can format dates using the `date` method:

```javascript
// Format the current date in the default format (DD/MM/YYYY)
const formattedDate = DateTimeFormatter.date(); // returns '5/3/2024'
```

You can also specify a custom date format:

```javascript
// Format the current date in the custom format (YYYY-MM-DD) must be separated with a '-'
const formattedDate = DateTimeFormatter.date({ dateFormat: 'YYYY-MM-DD' }); // returns '2024/3/5'
const formattedDate = DateTimeFormatter.date({ dateFormat: 'YY-MM-DD', prefixZero: true }); // returns '24/03/05'
```

### Formatting Times

Similarly, you can format times using the `time` method:

```javascript
// Format the current time in the default format (HH:MM:SS)
const formattedTime = DateTimeFormatter.time(); // returns '12:30:45'
```

You can customize the time format as well:

```javascript
// Format the current time in the custom format (HH:MM) must be separated with a ':'
const formattedTime = DateTimeFormatter.time({ timeFormat: 'HH:MM' }); // returns '12:30'
const formattedTime = DateTimeFormatter.time({ timeFormat: 'HH:MM:SS' }); // returns '12:30:45'
```

### Formatting Date and Time Together

If you need to format both date and time together, you can use the `format` method:

```javascript
// Format the current date and time in the default formats (DD/MM/YYYY HH:MM:SS)
const formattedDateTime = DateTimeFormatter.format(); // returns '5/3/2024 12:30:45'
```

You can specify custom formats for both date and time:

```javascript
// Format the current date and time in custom formats (YYYY-MM-DD HH:MM)
const formattedDateTime = DateTimeFormatter.format({ dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:MM' }); // returns '2024/5/3 12:30'
```

### Additional Options

You can also provide additional options to control the formatting behavior:

- `timestamp`: An optional timestamp to format. It can be a Date object, a string, or a number.
- `prefixZero`: An optional boolean value to toggle the prefixing of '0' before a single digit in the formatted output.

## Format String Table

| Format String | Output Description                              |
|---------------|-------------------------------------------------|
| YYYY          | Full year (e.g., 2024)                          |
| YY            | Last two digits of the year (e.g., 24)          |
| MMMM          | Full month name (e.g., January)                 |
| MM            | Month with leading zero (e.g., 01 for January)  |
| DD            | Day of the month with leading zero (e.g., 01)   |
| hh            | Hour with leading zero (e.g., 08 for 8 AM)      |
| mm            | Minutes with leading zero (e.g., 05)            |
| ss            | Seconds with leading zero (e.g., 03)            |


## Testing

This module includes unit tests to ensure its functionality.

```bash
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.