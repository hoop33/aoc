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

const rotateWaypoint = (ship, value) => {
  const rad = (Math.PI / 180) * value;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const x = Math.round(cos * ship.waypoint.x - sin * ship.waypoint.y);
  const y = Math.round(cos * ship.waypoint.y + sin * ship.waypoint.x);
  ship.waypoint = { x, y };
};

const move = (ship, inst) => {
  let x = 0,
    y = 0;
  switch (inst.action) {
    case "N":
      y = -inst.value;
      break;
    case "S":
      y = inst.value;
      break;
    case "E":
      x = inst.value;
      break;
    case "W":
      x = -inst.value;
      break;
    case "L":
      ship.waypoint
        ? rotateWaypoint(ship, -inst.value)
        : rotate(ship, -inst.value);
      break;
    case "R":
      ship.waypoint
        ? rotateWaypoint(ship, inst.value)
        : rotate(ship, inst.value);
      break;
    case "F":
      if (ship.waypoint) {
        ship.x += ship.waypoint.x * inst.value;
        ship.y += ship.waypoint.y * inst.value;
      } else {
        move(ship, { action: ship.facing, value: inst.value });
      }
      break;
    default:
      throw `no action in ${inst}`;
  }
  if (ship.waypoint) {
    ship.waypoint.x += x;
    ship.waypoint.y += y;
  } else {
    ship.x += x;
    ship.y += y;
  }
};

const follow = (lines, ship) => {
  for (const line of lines) {
    const inst = parseInstruction(line);
    move(ship, inst);
  }
  return manhattanDistance(ship);
};

const part1 = (lines) => {
  return follow(lines, { facing: "E", x: 0, y: 0 });
};

const part2 = (lines) => {
  return follow(lines, {
    x: 0,
    y: 0,
    waypoint: { x: 10, y: -1 },
  });
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
  286
);
main();
