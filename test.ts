import { DateTimeFormatter } from "./lib/index";

const my_time = new DateTimeFormatter()
console.log(my_time.format("dd:mm:yy"))
console.log("personal time", my_time.date("yy:mm:dd"))
console.log("personal time", my_time.time("hh:mm:ss"))
console.log("personal time", my_time.time("hh:mm"))
