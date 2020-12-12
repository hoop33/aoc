const assert = require("assert");
const fs = require("fs");

const isValid = (passport) => {
  return (
    passport.byr &&
    passport.iyr &&
    passport.eyr &&
    passport.hgt &&
    passport.hcl &&
    passport.ecl &&
    passport.pid
  );
};

const isValid2 = (passport) => {
  return (
    hasAllFields(passport) &&
    birthYearValid(+passport.byr) &&
    issueYearValid(+passport.iyr) &&
    expirationYearValid(+passport.eyr) &&
    hairColorValid(passport.hcl) &&
    eyeColorValid(passport.ecl) &&
    idValid(passport.pid) &&
    heightValid(passport.hgt)
  );
};

const hasAllFields = (passport) => {
  return (
    passport.byr &&
    passport.iyr &&
    passport.eyr &&
    passport.hgt &&
    passport.hcl &&
    passport.ecl &&
    passport.pid
  );
};

const birthYearValid = (year) => {
  return 1920 <= year && year <= 2002;
};

const issueYearValid = (year) => {
  return 2010 <= year && year <= 2020;
};

const expirationYearValid = (year) => {
  return 2020 <= year && year <= 2030;
};

const hairColorValid = (color) => {
  return /^#[0-9a-f]{6}$/.test(color);
};

const eyeColorValid = (color) => {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(color);
};

const idValid = (id) => {
  return /^[0-9]{9}$/.test(id);
};

const heightValid = (height) => {
  const matches = height.match(/^([0-9]+)(in|cm)$/);
  if (matches) {
    const val = +matches[1];
    switch (matches[2]) {
      case "in":
        return 59 <= val && val <= 76;
      case "cm":
        return 150 <= val && val <= 193;
    }
  }
  return false;
};

const part1 = (lines) => {
  let valid = 0;

  let passport = {};
  for (const line of lines) {
    if (line.trim().length === 0) {
      if (isValid(passport)) valid++;
      passport = {};
    } else {
      const tokens = line.split(" ").filter((el) => el.length > 0);
      for (const token of tokens) {
        const vals = token.split(":");
        passport[vals[0]] = vals[1];
      }
    }
  }
  return valid;
};

const part2 = (lines) => {
  let valid = 0;

  let passport = {};
  for (const line of lines) {
    if (line.trim().length === 0) {
      if (isValid2(passport)) valid++;
      passport = {};
    } else {
      const tokens = line.split(" ").filter((el) => el.length > 0);
      for (const token of tokens) {
        const vals = token.split(":");
        passport[vals[0]] = vals[1];
      }
    }
  }
  return valid;
};

const test = (data, expected1, expected2) => {
  assert.equal(part1(parseData(data)), expected1);
  assert.equal(part2(parseData(data)), expected2);
};

const parseData = (data) => data.split(/\r?\n/);

const main = () => {
  const data = fs.readFileSync("input", "utf-8");

  console.log(part1(parseData(data)));
  console.log(part2(parseData(data)));
};

test(
  `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`,
  2,
  2
);
main();
