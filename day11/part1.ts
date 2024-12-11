import path from "path";

// const file = Bun.file(path.join(import.meta.dir, "example.txt"));
const file = Bun.file(path.join(import.meta.dir, "input.txt"));

const input = await file.text();

function solution(input: string) {
  let nums = input
    .trim()
    .split(" ")
    .map((s) => parseInt(s));

  for (let i = 0; i < 25; i++) {
    // simulation
    const result = [];
    for (const n of nums) {
      if (n === 0) {
        result.push(1);
      } else if (String(n).length % 2 === 0) {
        // split
        const ar = String(n).split("");
        const mid = ar.length / 2;

        const first = ar.splice(0, mid).join("");
        const second = ar.join("");

        result.push(parseInt(first));
        result.push(parseInt(second));
      } else {
        result.push(n * 2024);
      }
    }

    nums = [...result];
  }

  return nums.length;
}

console.log(solution(input));
