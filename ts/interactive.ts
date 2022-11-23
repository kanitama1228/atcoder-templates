import * as readline from "readline";

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

reader.on("line", (line: string) => {
  // some process

  // return if process ends
  return;
});
