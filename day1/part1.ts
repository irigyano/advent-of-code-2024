import path from "path";
const file = Bun.file(path.join(import.meta.dir, "input.txt"));
const input = await file.text(); // contents as a string

function solution(input: string) {
  const list1 = [];
  const list2 = [];

  const pairs = input.split("\n");

  for (const pair of pairs) {
    const [p1, p2] = pair.split("   ");
    list1.push(Number(p1));
    list2.push(Number(p2));
  }

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  let sum = 0;

  for (let i = 0; i < list1.length; i++) {
    sum += Math.abs(list1[i] - list2[i]);
  }

  return sum;
}

console.log(solution(input));
