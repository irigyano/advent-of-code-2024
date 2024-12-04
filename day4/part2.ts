import path from "path";

// const file = Bun.file(path.join(import.meta.dir, "example.txt"));
const file = Bun.file(path.join(import.meta.dir, "input.txt"));

const input = await file.text();

function solution(input: string) {
  const rows = input.trim().split("\n");

  let validCount = 0;

  for (const [index, row] of rows.entries()) {
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === "A") {
        const lu = goDeep(index, i, -1, 1, 0);
        const lb = goDeep(index, i, 1, -1, 0);

        const ru = goDeep(index, i, 1, 1, 0);
        const rb = goDeep(index, i, -1, -1, 0);

        if (lu && lb && ru && rb && lu !== lb && ru !== rb) validCount++;
      }
    }
  }

  return validCount;

  function goDeep(
    currX: number,
    currY: number,
    dirX: number,
    dirY: number,
    index: number
  ) {
    const newX = currX + dirX;
    const newY = currY + dirY;

    if (newX < 0 || newX >= rows.length) return;
    if (newY < 0 || newY >= rows.length) return;

    const char = rows[newX][newY];
    if (char === "M" || char === "S") return char;
  }
}

console.log(solution(input));
