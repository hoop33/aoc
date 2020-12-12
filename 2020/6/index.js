const assert = require("assert");
const fs = require("fs");

const part1 = (lines) => {
  let sum = 0;
  let group = new Set();
  for (const line of lines) {
    if (line.trim().length === 0) {
      sum += group.size;
      group = new Set();
    } else {
      for (const c of line) {
        group.add(c);
      }
    }
  }
  return sum;
};

const part2 = (lines) => {
  let sum = 0;
  let group = "";
  let num = 0;
  for (const line of lines) {
    if (line.trim().length === 0) {
      const m = new Map();
      for (const c of group) {
        m.set(c, m.has(c) ? m.get(c) + 1 : 1);
      }

      m.forEach((val, _) => {
        sum += val === num ? 1 : 0;
      });
      group = "";
      num = 0;
    } else {
      num++;
      group += line;
    }
  }
  return sum;
};

const test = (data, expected1, expected2) => {
  assert.equal(part1(parseData(data)), expected1);
  assert.equal(part2(parseData(data)), expected2);
};

const parseData = (data) => data.split(/\r?\n/);

const main = () => {
  const data = fs.readFileSync("input", "utf-8");

  console.log(part1(parseData(data)));
  console.log(part2(parseData(data)));
};

test(
  `abc

a
b
c

ab
ac

a
a
a
a

b
`,
  11,
  6
);
main();
