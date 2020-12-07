const fs = require("fs");

const part1 = (lines) => {
  let valid = 0;

  for (const line of lines) {
    const matches = line.match(/^(\d+)\-(\d+) ([a-z]): ([a-z]+)$/);
    if (matches) {
      const min = +matches[1];
      const max = +matches[2];
      const num = matches[4].split(matches[3]).length - 1;
      if (min <= num && num <= max) {
        valid++;
      }
    } else {
      return `no match: ${line}`;
    }
  }

  return valid;
};

const part2 = (lines) => {
  let valid = 0;

  for (const line of lines) {
    const matches = line.match(/^(\d+)\-(\d+) ([a-z]): ([a-z]+)$/);
    if (matches) {
      const c1 = matches[4][+matches[1] - 1];
      const c2 = matches[4][+matches[2] - 1];
      if (
        (c1 === matches[3] && c2 !== matches[3]) ||
        (c1 !== matches[3] && c2 === matches[3])
      ) {
        valid++;
      }
    } else {
      return `no match: ${line}`;
    }
  }

  return valid;
};

const main = () => {
  const data = fs.readFileSync("input", "utf-8");
  const lines = data.split(/\r?\n/).filter((el) => el.length > 0);

  console.log(part1(lines));
  console.log(part2(lines));
};

main();
