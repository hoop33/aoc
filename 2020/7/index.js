const assert = require("assert");
const fs = require("fs");

const parsePredicate = (predicate) => {
  const matches = predicate.match(/^ ?(\d+) ([a-z ]+) bags?\.?$/);
  return matches
    ? {
        count: +matches[1],
        color: matches[2],
      }
    : null;
};

const parseRules = (lines) => {
  const rules = {};

  for (const line of lines) {
    const parts = line.split("contain");
    if (parts.length === 2) {
      const bag = parts[0].replace("bags", "").trim();
      const contains = [];
      for (const predicate of parts[1].split(",")) {
        const p = parsePredicate(predicate);
        if (p) contains.push(p);
      }
      rules[bag] = contains;
    }
  }

  return rules;
};

const canContainAtLeast = (contains, color, count) => {
  for (contain of contains) {
    if (contain.color === color && contain.count >= count) {
      return true;
    }
  }
  return false;
};

const canContain = (bags, rules, color, count) => {
  for (const bag in rules) {
    if (!bags.includes(bag) && canContainAtLeast(rules[bag], color, count)) {
      bags.concat(canContain(bags, rules, bag, count));
      bags.push(bag);
    }
  }
  return bags;
};

const carries = (multiplier, sum, rules, color) => {
  const contains = rules[color];
  for (const contain of contains) {
    const m = multiplier * contain.count;
    sum += m;
    sum = carries(m, sum, rules, contain.color);
  }
  return sum;
};

const part1 = (rules) => {
  const bags = canContain([], rules, "shiny gold", 1);
  return bags.length;
};

const part2 = (rules) => {
  const sum = carries(1, 0, rules, "shiny gold");
  return sum;
};

const parseData = (data) =>
  parseRules(data.split(/\r?\n/).filter((el) => el.length > 0));

const test = (data, expected1, expected2) => {
  assert.equal(part1(parseData(data)), expected1);
  assert.equal(part2(parseData(data)), expected2);
};

const main = () => {
  const data = fs.readFileSync("input", "utf-8");

  console.log(part1(parseData(data)));
  console.log(part2(parseData(data)));
};

test(
  `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`,
  4,
  32
);
main();
