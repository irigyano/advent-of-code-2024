import path from "path";
const file = Bun.file(path.join(import.meta.dir, "input.txt"));
const input = await file.text();

function solution(input: string) {
  const levels = input.split("\n");
  let safeLevels = 0;

  for (const level of levels) {
    const reports = level.split(" ");

    const diff = Number(reports[0]) - Number(reports[1]);

    if (diff === 0) continue;

    const isIncreasing = diff < 0;

    for (let i = 0; i < reports.length - 1; i++) {
      const curr = Number(reports[i]);
      const next = Number(reports[i + 1]);

      const diff = curr - next;

      if (isIncreasing) {
        if (diff >= 0 || diff < -3) break;
      } else {
        if (diff <= 0 || diff > 3) break;
      }

      if (i === reports.length - 2) safeLevels++;
    }
  }

  return safeLevels;
}

console.log(solution(input));
