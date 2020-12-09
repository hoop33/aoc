const fs = require("fs");

const canSum = (preamble, num) => {
  const len = preamble.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (preamble[i] + preamble[j] === num) return true;
    }
  }
  return false;
};

const part1 = (nums, pLen) => {
  for (let i = 0, n = nums.length - pLen; i < n; i++) {
    const preamble = nums.slice(i, i + pLen);
    const next = nums[i + pLen];
    if (!canSum(preamble, next)) return next;
  }
};

const part2 = (nums, pLen) => {};

const main = () => {
  const data = fs.readFileSync("input", "utf-8");
  const nums = data
    .split(/\r?\n/)
    .filter((el) => el.length > 0)
    .map((el) => +el);

  console.log(part1(nums, 25));
  console.log(part2(nums, 25));
};

main();
