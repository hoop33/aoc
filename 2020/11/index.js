const fs = require("fs");

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
  for (
    let cr = Math.max(0, row - 1);
    cr <= Math.min(grid.length - 1, row + 1);
    cr++
  ) {
    for (
      let cc = Math.max(0, column - 1);
      cc <= Math.min(grid[row].length - 1, column + 1);
      cc++
    ) {
      if (!(cr === row && cc === column) && grid[cr][cc] === "#") num++;
    }
  }
  return num;
};

const diff = (a, b) => {
  if (a.length !== b.length) return true;

  for (let row = 0; row < a.length; row++) {
    if (a[row].length !== b[row].length) return true;

    for (let column = 0; column < a[row].length; column++) {
      if (a[row][column] !== b[row][column]) return true;
    }
  }

  return false;
};

const iterate = (grid) => {
  const newGrid = [];
  for (let row = 0; row < grid.length; row++) {
    const newRow = [];
    for (let column = 0; column < grid[row].length; column++) {
      switch (grid[row][column]) {
        case ".":
          newRow.push(".");
          break;
        case "L":
          newRow.push(getAdjacentOccupied(grid, row, column) === 0 ? "#" : "L");
          break;
        case "#":
          newRow.push(getAdjacentOccupied(grid, row, column) >= 4 ? "L" : "#");
          break;
      }
    }
    newGrid.push(newRow);
  }
  return newGrid;
};

const stringify = (grid) => {
  return grid.join("\n").replace(",", "");
};

const part1 = (lines) => {
  let grid = [];
  for (const line of lines) {
    grid.push(line.split(""));
  }

  let different = true;
  while (different) {
    let newGrid = iterate(grid);
    different = diff(newGrid, grid);
    grid = newGrid;
  }
  return getCountOfType(grid, "#");
};

const part2 = (lines) => {};

const main = () => {
  const data = fs.readFileSync("input", "utf-8");
  const lines = data.split(/\r?\n/).filter((el) => el.length > 0);
  //const lines = `L.LL.LL.LL
  //LLLLLLL.LL
  //L.L.L..L..
  //LLLL.LL.LL
  //L.LL.LL.LL
  //L.LLLLL.LL
  //..L.L.....
  //LLLLLLLLLL
  //L.LLLLLL.L
  //L.LLLLL.LL`
  //.split(/\r?\n/)
  //.filter((el) => el.length > 0);

  console.log(part1(lines));
  console.log(part2(lines));
};

main();
