const assert = require("assert");
const fs = require("fs");

const part1 = ([earliest, ids]) => {
  for (let ts = earliest; ; ts++) {
    for (id of ids.filter((el) => typeof el === "number")) {
      if (ts % id === 0) return (ts - earliest) * id;
    }
  }
};

const merge = (ids) => {
  const buses = [];
  for (let i = 0; i < ids.length; i++) {
    if (typeof ids[i] === "number") {
      buses.push({
        id: ids[i],
        ts: i,
      });
    }
  }
  return buses;
};

const part2 = ([_, ids]) => {
  let i = 0,
    mult = 1;

  for (const bus of merge(ids)) {
    while ((i + bus.ts) % bus.id !== 0) i += mult;
    mult *= bus.id;
  }
  return i;
};

const test = (data, expected1, expected2) => {
  assert.equal(part1(parseData(data)), expected1);
  assert.equal(part2(parseData(data)), expected2);
};

const parseData = (data) => {
  const lines = data.split(/\r?\n/).filter((el) => el.length > 0);
  return [+lines[0], lines[1].split(/,/).map((el) => +el || el)];
};

const main = () => {
  const data = fs.readFileSync("input", "utf-8");

  console.log(part1(parseData(data)));
  console.log(part2(parseData(data)));
};

test(
  `939
7,13,x,x,59,x,31,19`,
  295,
  1068781
);
main();
