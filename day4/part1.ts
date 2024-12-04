import path from "path";

// const file = Bun.file(path.join(import.meta.dir, "example.txt"));
const file = Bun.file(path.join(import.meta.dir, "input.txt"));

const input = await file.text();

function solution(input: string) {
  const charset = ["X", "M", "A", "S"];

  const rows = input.trim().split("\n");

  let validCount = 0;

  for (const [index, row] of rows.entries()) {
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === "X") {
        if (goDeep(index, i, -1, 0, 0)) validCount++;
        if (goDeep(index, i, -1, 1, 0)) validCount++;
        if (goDeep(index, i, 0, 1, 0)) validCount++;
        if (goDeep(index, i, 1, 1, 0)) validCount++;
        if (goDeep(index, i, 1, 0, 0)) validCount++;
        if (goDeep(index, i, 1, -1, 0)) validCount++;
        if (goDeep(index, i, 0, -1, 0)) validCount++;
        if (goDeep(index, i, -1, -1, 0)) validCount++;
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
    if (index === 3) return true;

    const newX = currX + dirX;
    const newY = currY + dirY;

    if (newX < 0 || newX >= rows.length) return;
    if (newY < 0 || newY >= rows.length) return;

    index++;

    if (rows[newX][newY] !== charset[index]) return;

    return goDeep(newX, newY, dirX, dirY, index);
  }
}

console.log(solution(input));
