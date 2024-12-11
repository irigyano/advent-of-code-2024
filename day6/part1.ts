import path from "path";

// const file = Bun.file(path.join(import.meta.dir, "example.txt"));
const file = Bun.file(path.join(import.meta.dir, "input.txt"));

const input = await file.text();

function solution(input: string) {
  const rows = input
    .trim()
    .split("\n")
    .map((row) => row.split(""));

  // find guard starting position
  let guardPos = [-1, -1];
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[0].length; j++) {
      const row = rows[i];
      const col = row[j];
      if (col === "^") guardPos = [i, j];
    }
  }

  let steps = 0;
  // start simulation
  while (isInbound(guardPos[0], guardPos[1], rows.length, rows[0].length)) {
    // move logic
    const guard = rows[guardPos[0]][guardPos[1]];

    try {
      if (guard === "^") {
        if (isNextValid(guardPos[0], guardPos[1], -1, 0, rows)) {
          rows[guardPos[0]][guardPos[1]] = "X";

          if (rows[guardPos[0] - 1][guardPos[1]] !== "X") steps++;

          rows[guardPos[0] - 1][guardPos[1]] = "^";
          guardPos = [guardPos[0] - 1, guardPos[1]];
        } else changeDirection(guardPos[0], guardPos[1], rows);
      }

      if (guard === ">") {
        if (isNextValid(guardPos[0], guardPos[1], 0, 1, rows)) {
          rows[guardPos[0]][guardPos[1]] = "X";

          if (rows[guardPos[0]][guardPos[1] + 1] !== "X") steps++;

          rows[guardPos[0]][guardPos[1] + 1] = ">";
          guardPos = [guardPos[0], guardPos[1] + 1];
        } else changeDirection(guardPos[0], guardPos[1], rows);
      }

      if (guard === "v") {
        if (isNextValid(guardPos[0], guardPos[1], 1, 0, rows)) {
          rows[guardPos[0]][guardPos[1]] = "X";

          if (rows[guardPos[0] + 1][guardPos[1]] !== "X") steps++;

          rows[guardPos[0] + 1][guardPos[1]] = "v";
          guardPos = [guardPos[0] + 1, guardPos[1]];
        } else changeDirection(guardPos[0], guardPos[1], rows);
      }

      if (guard === "<") {
        if (isNextValid(guardPos[0], guardPos[1], 0, -1, rows)) {
          rows[guardPos[0]][guardPos[1]] = "X";

          if (rows[guardPos[0]][guardPos[1] - 1] !== "X") steps++;

          rows[guardPos[0]][guardPos[1] - 1] = "<";
          guardPos = [guardPos[0], guardPos[1] - 1];
        } else changeDirection(guardPos[0], guardPos[1], rows);
      }
    } catch (error) {
      return steps + 1;
    }
  }
}

function isInbound(x: number, y: number, xMax: number, yMax: number) {
  return x >= 0 && y >= 0 && x < xMax && y < yMax;
}

function isNextValid(
  x: number,
  y: number,
  xNext: number,
  yNext: number,
  matrix: string[][]
) {
  if (x + xNext > matrix.length || y + yNext > matrix[0].length) {
    throw new Error("outbound");
  }

  const next = matrix[x + xNext][y + yNext];
  return next !== "#";
}

function changeDirection(x: number, y: number, matrix: string[][]) {
  const directions = ["^", ">", "v", "<"];

  const curr = matrix[x][y];

  const currIndex = directions.findIndex((dir) => dir === curr);

  const nextIndex = (currIndex + directions.length + 1) % directions.length;

  matrix[x][y] = directions[nextIndex];
}

console.log(solution(input));
