const assert = require("assert");
const fs = require("fs");

const parse = (lines) => {
  const program = [];

  for (const line of lines) {
    const matches = line.match(/^([a-z]+) ([\+\-])(\d+)$/);
    if (matches) {
      program.push({
        op: matches[1],
        arg: +matches[3] * (matches[2] === "+" ? 1 : -1),
        ec: 0,
      });
    }
  }

  return program;
};

const run = (program) => {
  let ip = 0,
    acc = 0;

  for (;;) {
    if (ip >= program.length) return { acc, complete: true };

    const inst = program[ip];
    if (inst.ec > 0) return { acc, complete: false };

    inst.ec++;

    switch (inst.op) {
      case "acc": {
        acc += inst.arg;
        ip++;
        break;
      }
      case "nop": {
        ip++;
        break;
      }
      case "jmp": {
        ip += inst.arg;
        break;
      }
      default:
        throw "syntax error";
    }
  }
};

const part1 = (program) => {
  return run(program).acc;
};

const resetCounts = (program) => {
  for (const inst of program) {
    inst.ec = 0;
  }
};

const part2 = (program) => {
  for (const inst of program) {
    let old = inst.op;
    let res;

    switch (inst.op) {
      case "acc":
        break;
      case "jmp":
        inst.op = "nop";
        res = run(program);
        break;
      case "nop":
        inst.op = "jmp";
        res = run(program);
        break;
    }

    inst.op = old;
    if (res) {
      resetCounts(program);
      if (res.complete) {
        return res.acc;
      }
    }
  }
};

const test = (data, expected1, expected2) => {
  assert.equal(part1(parseData(data)), expected1);
  assert.equal(part2(parseData(data)), expected2);
};

const parseData = (data) =>
  parse(data.split(/\r?\n/).filter((el) => el.length > 0));

const main = () => {
  const data = fs.readFileSync("input", "utf-8");

  console.log(part1(parseData(data)));
  console.log(part2(parseData(data)));
};

test(
  ` nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`,
  5,
  8
);
main();
