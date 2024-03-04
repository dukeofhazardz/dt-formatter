# DateTimeFormatter Module

The `DateTimeFormatter` module provides functionality for formatting date and time values in various formats.

## Installation

To install the `DateTimeFormatter` module, use the following command:

```bash
npm install @your-username/dt-formatter
```

## Usage

```javascript
import { DateTimeFormatter } from "@your-username/dt-formatter";

// Create a new instance of DateTimeFormatter
const formatter = new DateTimeFormatter();

// Format the current date
const formattedDate = formatter.date();
console.log("Formatted Date:", formattedDate);

// Format the current time
const formattedTime = formatter.time();
console.log("Formatted Time:", formattedTime);

// Format both date and time
const formattedDateTime = formatter.format("YYYY:MM:DD", "hh:mm:ss");
console.log("Formatted Date and Time:", formattedDateTime);
```

## API Reference

### DateTimeFormatter

The `DateTimeFormatter` class facilitates the formatting of date and time values.

#### Constructor

- **Parameters:**
  - `timestamp?: string`: An optional date-time string argument.

#### Methods

- **date(dateStringFormat?: string): string**: Formats the date according to the specified format.

- **time(timeStringFormat?: string): string**: Formats the time according to the specified format.

- **format(dateStringFormat: string, timeStringFormat?: string): string**: Formats both date and time according to the specified formats.

## Examples

### Format Date

```javascript
const formatter = new DateTimeFormatter();
const formattedDate = formatter.date("YYYY:MM:DD");
console.log("Formatted Date:", formattedDate);
```

### Format Time

```javascript
const formatter = new DateTimeFormatter();
const formattedTime = formatter.time("hh:mm:ss");
console.log("Formatted Time:", formattedTime);
```

### Format Date and Time

```javascript
const formatter = new DateTimeFormatter();
const formattedDateTime = formatter.format("YYYY:MM:DD", "hh:mm:ss");
console.log("Formatted Date and Time:", formattedDateTime);
```

## Testing

This module includes unit tests to ensure its functionality.

```bash
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.