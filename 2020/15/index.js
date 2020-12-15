const assert = require("assert");
const fs = require("fs");

const next = (nums) => {
  const lastNumSpoken = nums[nums.length - 1];

  const times = nums.reduce((acc, el, index) => {
    if (el === lastNumSpoken) acc.push(index);
    return acc;
  }, []);

  if (times.length === 1) return 0;
  else return times[times.length - 1] - times[times.length - 2];
};

const part1 = (nums) => {
  for (let i = nums.length; i < 2020; i++) {
    nums.push(next(nums));
  }
  return nums[nums.length - 1];
};

const part2 = (lines) => {
  return 0;
};

const test = (data, expected1, expected2) => {
  assert.equal(part1(parseData(data)), expected1);
  assert.equal(part2(parseData(data)), expected2);
};

const parseData = (data) => data.split(/,/).map((el) => +el);

const main = () => {
  const data = "14,1,17,0,3,20";
  console.log(part1(parseData(data)));
  console.log(part2(parseData(data)));
};

test("0,3,6", 436, 0);
main();
