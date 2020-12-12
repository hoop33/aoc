const assert = require("assert");
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

const test = (data, expected1, pLen1, expected2) => {
  const bad = part1(parseData(data), pLen1);
  assert.equal(bad, expected1);
  assert.equal(part2(parseData(data), bad), expected2);
};

const parseData = (data) =>
  data
    .split(/\r?\n/)
    .filter((el) => el.length > 0)
    .map((el) => +el);

const main = () => {
  const data = fs.readFileSync("input", "utf-8");

  const bad = part1(parseData(data), 25);
  console.log(bad);
  console.log(part2(parseData(data), bad));
};

test(
  `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`,
  127,
  5,
  62
);
main();
