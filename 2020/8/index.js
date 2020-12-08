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

const resetCounts = (program) => {
  for (const inst of program) {
    inst.ec = 0;
  }
};

const part1 = (program) => {
  return run(program).acc;
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

const main = () => {
  const data = fs.readFileSync("input", "utf-8");
  const lines = data.split(/\r?\n/).filter((el) => el.length > 0);

  const program = parse(lines);

  console.log(part1(program));
  resetCounts(program);
  console.log(part2(program));
};

main();
