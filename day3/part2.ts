import path from "path";

const file = Bun.file(path.join(import.meta.dir, "input.txt"));

const input = await file.text();

function solution(input: string) {
  let sum = 0;

  const mulInstructions = input.matchAll(
    /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g
  );

  let isIgnoring = false;

  for (const match of mulInstructions) {
    if (match[0] === "don't()") {
      isIgnoring = true;
    } else if (match[0] === "do()") {
      isIgnoring = false;
    } else if (!isIgnoring) {
      sum += parseInt(match[1]) * parseInt(match[2]);
    }
  }

  return sum;
}

console.log(solution(input));
