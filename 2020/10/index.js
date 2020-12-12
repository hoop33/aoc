const assert = require("assert");
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

const part2 = (nums) => {
  const paths = {};
  const countPaths = (index) => {
    if (paths[index]) return paths[index];
    if (index === nums.length - 1) return 1;

    const num = nums[index];
    let count = 0,
      i = index + 1;
    while (nums[i] - num <= 3) {
      count += countPaths(i);
      i++;
    }
    paths[index] = count;
    return count;
  };
  return countPaths(0);
};

const test = (data, expected1, expected2) => {
  assert.equal(part1(parseData(data)), expected1);
  assert.equal(part2(parseData(data)), expected2);
};

const parseData = (data) => {
  const nums = data
    .split(/\r?\n/)
    .filter((el) => el.length > 0)
    .map((el) => +el);
  nums.sort((a, b) => a - b);
  nums.unshift(0);
  nums.push(nums[nums.length - 1] + 3); // device
  return nums;
};

const main = () => {
  const data = fs.readFileSync("input", "utf-8");

  console.log(part1(parseData(data)));
  console.log(part2(parseData(data)));
};

test(
  `16
10
15
5
1
11
7
19
6
12
4`,
  35,
  8
);
test(
  `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`,
  220,
  19208
);
main();
