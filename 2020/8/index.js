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

const part1 = (program) => {
  let ip = 0,
    acc = 0;

  for (;;) {
    const inst = program[ip];
    if (inst.ec > 0) break;

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

  return acc;
};

const part2 = (program) => {};

const main = () => {
  const data = fs.readFileSync("input", "utf-8");
  const lines = data.split(/\r?\n/).filter((el) => el.length > 0);

  const program = parse(lines);

  console.log(part1(program));
  console.log(part2(program));
};

main();
