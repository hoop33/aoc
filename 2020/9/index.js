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

const findRange = (arr) => {
  if (arr.length) {
    let smallest = arr[0],
      largest = arr[0];
    for (const item of arr) {
      if (item < smallest) smallest = item;
      if (item > largest) largest = item;
    }
    return { smallest, largest };
  }
};

const part1 = (nums, pLen) => {
  for (let i = 0, n = nums.length - pLen; i < n; i++) {
    const preamble = nums.slice(i, i + pLen);
    const next = nums[i + pLen];
    if (!canSum(preamble, next)) return next;
  }
};

const part2 = (nums, bad) => {
  const len = nums.length;
  for (let i = 0; i < len - 1; i++) {
    let accum = 0;
    for (let j = i + 1; j < len; j++) {
      accum += nums[j];
      if (nums[i] + accum === bad) {
        const { smallest, largest } = findRange(nums.slice(i, j + 1));
        return smallest + largest;
      }
      if (nums[i] + accum > bad) break;
    }
  }
};

const main = () => {
  const data = fs.readFileSync("input", "utf-8");
  const nums = data
    .split(/\r?\n/)
    .filter((el) => el.length > 0)
    .map((el) => +el);

  const bad = part1(nums, 25);
  console.log(bad);
  console.log(part2(nums, bad));
};

main();
