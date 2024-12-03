import path from "path";

const file = Bun.file(path.join(import.meta.dir, "example.txt"));
// const file = Bun.file(path.join(import.meta.dir, "input.txt"));

const input = await file.text();

function solution(input: string) {
  // ...
}

console.log(solution(input));
