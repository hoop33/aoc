const assert = require("assert");
const fs = require("fs");

const part1 = (lines) => {
  let valid = 0;

  for (const line of lines) {
    const matches = line.match(/^(\d+)\-(\d+) ([a-z]): ([a-z]+)$/);
    if (matches) {
      const min = +matches[1];
      const max = +matches[2];
      const num = matches[4].split(matches[3]).length - 1;
      if (min <= num && num <= max) {
        valid++;
      }
    } else {
      return `no match: ${line}`;
    }
  }

  return valid;
};

const part2 = (lines) => {
  let valid = 0;

  for (const line of lines) {
    const matches = line.match(/^(\d+)\-(\d+) ([a-z]): ([a-z]+)$/);
    if (matches) {
      const c1 = matches[4][+matches[1] - 1];
      const c2 = matches[4][+matches[2] - 1];
      if (
        (c1 === matches[3] && c2 !== matches[3]) ||
        (c1 !== matches[3] && c2 === matches[3])
      ) {
        valid++;
      }
    } else {
      return `no match: ${line}`;
    }
  }

  return valid;
};

const test = (data, expected1, expected2) => {
  assert.equal(part1(parseData(data)), expected1);
  assert.equal(part2(parseData(data)), expected2);
};

const parseData = (data) => data.split(/\r?\n/).filter((el) => el.length > 0);

const main = () => {
  const data = fs.readFileSync("input", "utf-8");

  console.log(part1(parseData(data)));
  console.log(part2(parseData(data)));
};

test(
  `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`,
  2,
  1
);
main();
