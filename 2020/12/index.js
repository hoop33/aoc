const assert = require("assert");
const fs = require("fs");

const DIRECTIONS = ["N", "E", "S", "W"];

const parseInstruction = (line) => {
  const action = line.substring(0, 1);
  const value = +line.substring(1);
  return { action, value };
};

const manhattanDistance = (ship) => {
  return Math.abs(ship.x) + Math.abs(ship.y);
};

const rotate = (ship, value) => {
  const current = DIRECTIONS.indexOf(ship.facing);
  if (current === -1) throw `ship is lost! ${ship}`;

  const len = DIRECTIONS.length;
  ship.facing = DIRECTIONS[(((current + value / 90) % len) + len) % len];
};

const move = (ship, inst) => {
  switch (inst.action) {
    case "N":
      ship.y -= inst.value;
      break;
    case "S":
      ship.y += inst.value;
      break;
    case "E":
      ship.x += inst.value;
      break;
    case "W":
      ship.x -= inst.value;
      break;
    case "L":
      rotate(ship, -inst.value);
      break;
    case "R":
      rotate(ship, inst.value);
      break;
    case "F":
      move(ship, { action: ship.facing, value: inst.value });
      break;
    default:
      throw `no action in ${inst}`;
  }
};

const part1 = (lines) => {
  const ship = { facing: "E", x: 0, y: 0 };
  for (const line of lines) {
    const inst = parseInstruction(line);
    move(ship, inst);
  }
  return manhattanDistance(ship);
};

const part2 = (lines) => {
  return 0;
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
  `F10
N3
F7
R90
F11`,
  25,
  0
);
main();
