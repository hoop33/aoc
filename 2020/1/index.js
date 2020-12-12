const assert = require("assert");
const fs = require("fs");

const part1 = (lines) => {
  const len = lines.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      const a = +lines[i];
      const b = +lines[j];
      if (a + b === 2020) {
        return a * b;
      }
    }
  }
};

const part2 = (lines) => {
  const len = lines.length;

  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len - 1; j++) {
      for (let k = j + 1; k < len; k++) {
        const a = +lines[i];
        const b = +lines[j];
        const c = +lines[k];
        if (a + b + c === 2020) {
          return a * b * c;
        }
      }
    }
  }
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
  `1721
979
366
299
675
1456`,
  514579,
  241861950
);
main();
