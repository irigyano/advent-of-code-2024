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

  const map = new Map();

  for (const num of list2) {
    if (map.has(num)) map.set(num, map.get(num) + 1);
    else map.set(num, 1);
  }

  let similarity = 0;

  for (const num of list1) {
    if (map.get(num)) {
      similarity += num * map.get(num);
    }
  }

  return similarity;
}

console.log(solution(input));
