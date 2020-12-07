const fs = require("fs");

const traverse = (lines, right, down) => {
  let trees = 0,
    x = 0;
  for (let i = 0; i < lines.length; i += down) {
    const line = lines[i];
    if (line.charAt(x) === "#") trees++;
    x += right;
    if (x >= line.length) x -= line.length;
  }
  return trees;
};

const part1 = (lines) => {
  let trees = 0,
    x = 0;

  for (const line of lines) {
    if (line.charAt(x) === "#") trees++;

    x += 3;
    if (x >= line.length) x -= line.length;
  }
  return trees;
};

const part2 = (lines) => {
  const routes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  let total = 1;
  for (const route of routes) {
    const trees = traverse(lines, route.right, route.down);
    total *= trees;
  }
  return total;
};

const main = () => {
  const data = fs.readFileSync("input", "utf-8");
  const lines = data.split(/\r?\n/).filter((el) => el.length > 0);

  console.log(part1(lines));
  console.log(part2(lines));
};

main();
