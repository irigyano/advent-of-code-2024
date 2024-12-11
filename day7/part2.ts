import path from "path";

// const file = Bun.file(path.join(import.meta.dir, "example.txt"));
const file = Bun.file(path.join(import.meta.dir, "input.txt"));

const input = await file.text();

function solution(input: string) {
  const rows = input.trim().split("\n");

  let ans = 0;

  for (const row of rows) {
    const [sum, numString] = row.split(": ");
    const nums = numString.split(" ").map((num) => parseInt(num));

    let product = [nums[0]];

    for (let i = 1; i < nums.length; i++) {
      const curr = nums[i];
      const tmp = [];

      let hasFound = false;

      for (const p of product) {
        const add = p + curr;
        const times = p * curr;
        const concat = parseInt(String(p) + String(curr));

        const target = parseInt(sum);

        if (add === target || times === target || concat === target) {
          hasFound = true;
          break;
        }

        if (add < parseInt(sum)) tmp.push(add);
        if (times < parseInt(sum)) tmp.push(times);
        if (concat < parseInt(sum)) tmp.push(concat);
      }

      if (hasFound) {
        ans += parseInt(sum);
        break;
      } else {
        product = [...tmp];
      }
    }
  }

  return ans;
}

console.log(solution(input));
