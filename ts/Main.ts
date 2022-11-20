import * as fs from "fs";
import * as tstl from "tstl";

const lines = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");

console.log(lines);
