import { DateTimeFormatter } from "./lib/index.js";

const my_time = new DateTimeFormatter()
console.log(my_time.format("dd:mm:yy", "hh:mm:ss"))
