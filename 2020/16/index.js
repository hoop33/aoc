const assert = require("assert");
const fs = require("fs");

const parseRules = (lines) => {
  const rules = {};
  for (const line of lines) {
    const match = line.match(/^([a-z ]+): (\d+)\-(\d+) or (\d+)\-(\d+)$/);
    if (!match) return rules;

    rules[match[1]] = {
      ranges: [
        { min: +match[2], max: +match[3] },
        { min: +match[4], max: +match[5] },
      ],
    };
  }
};

const parseTickets = (start, lines) => {
  const tickets = [];

  for (let i = start; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length === 0) break;
    if (line.endsWith(":")) continue;
    tickets.push(line.split(",").map((el) => +el));
  }

  return tickets;
};

const validateTickets = (tickets, rules) => {
  const valid = [];
  let invalid = [];

  for (const ticket of tickets) {
    const values = invalidValues(ticket, rules);
    if (values.length) {
      invalid = invalid.concat(values);
    } else {
      valid.push(ticket);
    }
  }

  return [valid, invalid];
};

const invalidValues = (ticket, rules) => {
  const invalid = [];
  for (const num of ticket) {
    let valid = false;
    for (const rule in rules) {
      for (const range of rules[rule].ranges) {
        if (range.min <= num && num <= range.max) {
          valid = true;
          break;
        }
      }
    }
    if (!valid) invalid.push(num);
  }
  return invalid;
};

const isValid = (rule, values) => {
  for (const value of values) {
    let valid = false;
    for (const range of rule.ranges) {
      if (range.min <= value && value <= range.max) {
        valid = true;
        break;
      }
    }
    if (!valid) {
      return false;
    }
  }
  return true;
};

// I can't help but think CS grads know some algorithm.
// This is the best I can muster.
const determineFields = (tickets, rules) => {
  // Go through the columns and get all the values from all the
  // tickets for the column
  const columns = [];
  for (let i = 0; i < tickets[0].length; i++) {
    const values = [];
    for (const ticket of tickets) {
      values.push(ticket[i]);
    }
    columns.push(values);
  }

  // For each column, determine the rules that the values fit
  for (let i = 0; i < columns.length; i++) {
    for (const rule in rules) {
      rules[rule].fields = rules[rule].fields || [];
      if (isValid(rules[rule], columns[i])) {
        rules[rule].fields.push(i);
      }
    }
  }

  // Sort the keys by the number of possible rules
  const keys = Object.keys(rules);
  keys.sort((a, b) => rules[a].fields.length - rules[b].fields.length);

  // Iterate through the rules by key and remove the ones already used
  const used = [];
  for (const key of keys) {
    rules[key].fields = rules[key].fields.filter(
      (val, _, _1) => !used.includes(val)
    );
    used.push(rules[key].fields[0]);
  }
};

const parseData = (data) => data.split(/\r?\n/);

const run = (lines) => {
  const rules = parseRules(lines);
  const numRules = Object.keys(rules).length;

  const my = parseTickets(numRules + 1, lines)[0];
  const nearby = parseTickets(numRules + 4, lines);

  const [valid, invalid] = validateTickets(nearby, rules);

  determineFields(valid, rules);

  value = 1;
  for (const rule in rules) {
    if (rule.startsWith("departure")) value *= my[rules[rule].fields[0]];
  }

  return [invalid.reduce((acc, x) => acc + x), value];
};

const main = () => {
  const data = fs.readFileSync("input", "utf-8");
  const [part1, part2] = run(parseData(data));
  console.log(part1);
  console.log(part2);
};

const test = (data, expected) => {
  assert.equal(run(parseData(data))[0], expected);
};

test(
  `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`,
  71
);
main();
