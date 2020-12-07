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

const main = () => {
  const data = fs.readFileSync("input", "utf-8");
  const lines = data.split(/\r?\n/).filter((el) => el.length > 0);

  const rules = parseRules(lines);
  console.log(part1(rules));
  console.log(part2(rules));
};

main();
