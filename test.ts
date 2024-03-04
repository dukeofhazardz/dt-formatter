import { DateTimeFormatter } from "./lib/index";

const my_time = new DateTimeFormatter()
console.log(my_time.format("dd:mm:yy", "hh:mm"))
console.log("personal time", my_time.date("yy:mm:dd"))
console.log("personal time", my_time.date("yyyy:mmmm:dd"))
//console.log("personal time", my_time.format("yyyymmmmdd"))
console.log("personal time", my_time.time("hh:mm:ss"))
console.log("personal time", my_time.time("SS:MM:HH"))
//console.log("personal time", my_time.time("ssmmhh"))
