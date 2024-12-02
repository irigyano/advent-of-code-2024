import path from "path";
const file = Bun.file(path.join(import.meta.dir, "input.txt"));
const input = await file.text();

function solution() {}

console.log(solution());
