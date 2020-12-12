const assert = require("assert");
const fs = require("fs");

const DIRECTIONS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
];

const getCountOfType = (grid, c) => {
  let count = 0;
  for (const row of grid) {
    for (const column of row) {
      if (column === c) count++;
    }
  }
  return count;
};

const getAdjacentOccupied = (grid, row, column) => {
  let num = 0;
  for (const dir of DIRECTIONS) {
    const x = column + dir[0];
    const y = row + dir[1];
    if (
      0 <= x &&
      x < grid[row].length &&
      0 <= y &&
      y < grid.length &&
      grid[y][x] === "#"
    )
      num++;
  }
  return num;
};

const getLineOfSightOccupied = (grid, row, column) => {
  const maxRow = grid.length;
  const maxCol = grid[row].length;

  let num = 0;
  for (const dir of DIRECTIONS) {
    const [x, y] = dir;
    let cc = column + x;
    let cr = row + y;
    let seat = ".";
    while (0 <= cc && cc < maxCol && 0 <= cr && cr < maxRow && seat === ".") {
      seat = grid[cr][cc];
      if (seat === "#") num++;
      cc += x;
      cr += y;
    }
  }
  return num;
};

const diff = (a, b) => {
  for (let row = 0; row < a.length; row++) {
    for (let column = 0; column < a[row].length; column++) {
      if (a[row][column] !== b[row][column]) return true;
    }
  }
  return false;
};

const iterate = (grid, minOccupied, fn) => {
  const newGrid = [];
  for (let row = 0; row < grid.length; row++) {
    const newRow = [];
    for (let column = 0; column < grid[row].length; column++) {
      switch (grid[row][column]) {
        case ".":
          newRow.push(".");
          break;
        case "L":
          newRow.push(fn(grid, row, column) === 0 ? "#" : "L");
          break;
        case "#":
          newRow.push(fn(grid, row, column) >= minOccupied ? "L" : "#");
          break;
      }
    }
    newGrid.push(newRow);
  }
  return newGrid;
};

const part1 = (lines) => {
  let grid = [];
  for (const line of lines) {
    grid.push(line.split(""));
  }

  let different = true;
  while (different) {
    let newGrid = iterate(grid, 4, getAdjacentOccupied);
    different = diff(newGrid, grid);
    grid = newGrid;
  }
  return getCountOfType(grid, "#");
};

const part2 = (lines) => {
  let grid = [];
  for (const line of lines) {
    grid.push(line.split(""));
  }

  let different = true;
  while (different) {
    let newGrid = iterate(grid, 5, getLineOfSightOccupied);
    different = diff(newGrid, grid);
    grid = newGrid;
  }
  return getCountOfType(grid, "#");
};

const test = (data, expected1, expected2) => {
  assert.equal(part1(parseData(data)), expected1);
  assert.equal(part2(parseData(data)), expected2);
};

const parseData = (data) => data.split(/\r?\n/).filter((el) => el.length > 0);

const main = () => {
  const data = fs.readFileSync("input", "utf-8");

  console.log(part1(parseData(data)));
  console.log(part2(parseData(data)));
};

test(
  `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`,
  37,
  26
);
main();
