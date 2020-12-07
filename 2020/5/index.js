const fs = require("fs");

const findSeat = (data) => {
  const row = decode(data.substr(0, 7));
  const column = decode(data.substr(7, 10));
  return {
    row,
    column,
    id: row * 8 + column,
  };
};

const decode = (data) => {
  const val = [0, Math.pow(2, data.length) - 1];

  for (const c of data) {
    const d = (val[1] - val[0] + 1) / 2;
    switch (c) {
      case "F":
      case "L":
        val[1] -= d;
        break;
      case "B":
      case "R":
        val[0] += d;
        break;
      default:
        throw `bad char: ${c}`;
    }
    if (val[0] === val[1]) return val[0];
  }

  throw `no val in ${data}`;
};

const part1 = (lines) => {
  let high = 0;
  for (const line of lines) {
    const seat = findSeat(line);
    if (seat.id > high) {
      high = seat.id;
    }
  }

  return high;
};

const part2 = (lines) => {
  const ids = [];
  for (const line of lines) {
    const seat = findSeat(line);
    ids.push(seat.id);
  }

  ids.sort((a, b) => a - b);

  let prev = -1;
  for (id of ids) {
    if (prev != -1 && id - prev > 1) {
      return prev + 1;
    }
    prev = id;
  }
};

const main = () => {
  const data = fs.readFileSync("input", "utf-8");
  const lines = data.split(/\r?\n/).filter((el) => el.length > 0);

  console.log(part1(lines));
  console.log(part2(lines));
};

main();
