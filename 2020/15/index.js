const assert = require("assert");

const numberForTurn = (num, seed) => {
  const len = seed.length;

  const cache = new Map();
  for (let i = 0; i < len; i++) {
    cache.set(seed[i], i + 1);
  }

  let last = seed[len - 1];

  for (let turn = len + 1; turn <= num; turn++) {
    const next = cache.has(last) ? turn - cache.get(last) - 1 : 0;
    cache.set(last, turn - 1);
    last = next;
  }

  return last;
};

const part1 = (nums) => {
  return numberForTurn(2020, nums);
};

const part2 = (nums) => {
  return numberForTurn(30000000, nums);
};

const test = (data, expected) => {
  assert.equal(part1(parseData(data)), expected);
};

const parseData = (data) => data.split(/,/).map((el) => +el);

const main = () => {
  const data = "14,1,17,0,3,20";
  console.log(part1(parseData(data)));
  console.log(part2(parseData(data)));
};

test("0,3,6", 436, 0);
main();
