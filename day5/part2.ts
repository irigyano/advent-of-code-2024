import path from "path";

// const file = Bun.file(path.join(import.meta.dir, "example.txt"));
const file = Bun.file(path.join(import.meta.dir, "input.txt"));

const input = await file.text();

function solution(input: string) {
  let ans = 0;

  const data = input.trim().split("\n");

  const rules = [];
  const updates = [];

  let hasMetBlank = false;
  for (const d of data) {
    if (d === "") {
      hasMetBlank = true;
      continue;
    }

    if (!hasMetBlank) {
      rules.push(d);
    } else {
      updates.push(d);
    }
  }

  const rulesMap = new Map();
  for (const rule of rules) {
    const [target, index] = rule.split("|");

    if (rulesMap.has(index)) {
      rulesMap.get(index).add(target);
    } else rulesMap.set(index, new Set([target]));
  }

  // check each update
  for (const update of updates) {
    const nums = update.split(",");

    let isValid = true;
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];

      if (rulesMap.has(num)) {
        const set = rulesMap.get(num);

        for (let j = i + 1; j < nums.length; j++) {
          if (set.has(nums[j])) {
            isValid = false;
            break;
          }
        }
      }
    }

    if (!isValid) {
      let index = nums.length - 1;

      while (index > 0) {
        const num = nums[index];

        let hasSwap = false;
        if (rulesMap.has(num)) {
          const set = rulesMap.get(num);

          for (let i = index - 1; i >= 0; i--) {
            const local = nums[i];

            if (set.has(local)) {
              // swap
              const tmp = num;
              nums[index] = local;
              nums[i] = tmp;
              hasSwap = true;
              break;
            }
          }
        }
        if (!hasSwap) index--;
      }
      // reversed order lmao
      ans += parseInt(nums[Math.floor(nums.length / 2)]);
    }
  }

  return ans;
}

console.log(solution(input));
