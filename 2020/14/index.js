const assert = require("assert");
const fs = require("fs");

const maskedValue = (val, mask) => {
  let newVal = "";
  const bin = val.toString(2).padStart(mask.length, "0");
  for (let i = 0; i < mask.length; i++) {
    newVal += mask[i] === "X" ? bin[i] : mask[i];
  }
  return parseInt(newVal, 2);
};

const put = (mem, addr, val, mask) => {
  mem[addr] = maskedValue(val, mask);
};

const sum = (mem) => {
  let total = 0;
  for (const addr in mem) {
    total += mem[addr];
  }
  return total;
};

const part1 = (lines) => {
  let mask = "";
  const mem = {};

  for (const line of lines) {
    let matches = line.match(/^mask ?\= ?([0-1X]+)$/);
    if (matches) {
      mask = matches[1];
    } else {
      matches = line.match(/^mem\[([0-9]+)\] ?\= ?([0-9]+)$/);
      if (!matches) return `syntax error ${line}`;
      put(mem, +matches[1], +matches[2], mask);
    }
  }
  return sum(mem);
};

const part2 = (lines) => {
  return 0;
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
  `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`,
  165,
  0
);
main();
