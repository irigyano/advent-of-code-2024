import path from "path";
const file = Bun.file(path.join(import.meta.dir, "input.txt"));
const input = await file.text();

function solution(input: string) {
  const reports = input.split("\n");
  let safeLevels = 0;

  for (const report of reports) {
    const levels = report.split(" ").map((str) => Number(str));

    if (isSafe(levels)) safeLevels++;
  }

  return safeLevels;
}

function isSafe(levels: number[]) {
  for (let i = 0; i < levels.length; i++) {
    const local = [...levels];
    local.splice(i, 1);

    if (local.length < 2) return true;

    const isIncreasing = local[0] - local[1] < 0;

    for (let j = 0; j < local.length - 1; j++) {
      const diff = local[j] - local[j + 1];

      if (diff === 0) break;

      if (isIncreasing) {
        if (diff < -3 || diff > 0) break;
      } else {
        if (diff > 3 || diff < 0) break;
      }

      if (j === local.length - 2) {
        return true;
      }
    }
  }

  return false;
}

console.log(solution(input));
