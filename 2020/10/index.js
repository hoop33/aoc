const fs = require("fs");

const part1 = (nums) => {
  const diffs = {};

  let prev = nums[0];
  for (const num of nums) {
    const diff = num - prev;
    diffs[diff] = (diffs[diff] || 0) + 1;
    prev = num;
  }

  return diffs[1] * diffs[3];
};

const countPaths = (index, nums, paths) => {
  if (paths[index]) return paths[index];
  if (index === nums.length - 1) return 1;

  const num = nums[index];
  let count = 0,
    i = index + 1;
  while (nums[i] - num <= 3) {
    count += countPaths(i, nums, paths);
    i++;
  }

  paths[index] = count;
  return count;
};

const part2 = (nums) => {
  return countPaths(0, nums, {});
};

const main = () => {
  const data = fs.readFileSync("input", "utf-8");
  const nums = data
    .split(/\r?\n/)
    .filter((el) => el.length > 0)
    .map((el) => +el);

  nums.sort((a, b) => a - b);
  nums.unshift(0);
  nums.push(nums[nums.length - 1] + 3); // device

  console.log(part1(nums));
  console.log(part2(nums));
};

main();
