import re

class Passport:
    def __init__(self):
        self.fields = {}

    def clear(self):
        self.fields.clear()

    def hasAllFields(self):
        for key in ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]:
            if key not in self.fields:
                return False
        return True

    def isValid(self):
        return self.hasAllFields() \
                and self.birthYearValid() \
                and self.issueYearValid() \
                and self.expirationYearValid() \
                and self.hairColorValid() \
                and self.eyeColorValid() \
                and self.idValid() \
                and self.heightValid()

    def yearIsValid(self, fieldName, start, end):
        year = int(self.fields[fieldName])
        return start <= year and year <= end

    def birthYearValid(self):
        return self.yearIsValid("byr", 1920, 2002)

    def issueYearValid(self):
        return self.yearIsValid("iyr", 2010, 2020)

    def expirationYearValid(self):
        return self.yearIsValid("eyr", 2020, 2030)

    def hairColorValid(self):
        return re.search("^#[0-9a-f]{6}$", self.fields["hcl"])

    def eyeColorValid(self):
        return self.fields["ecl"] in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]

    def idValid(self):
        return re.search("^[0-9]{9}$", self.fields["pid"])

    def heightValid(self):
        match = re.search("^([0-9]+)(in|cm)$", self.fields["hgt"])
        if match:
            val = int(match.group(1))
            if match.group(2) == "in":
                return 59 <= val and val <= 76
            return 150 <= val and val <= 193
        return False

def part1(lines):
    valid = 0

    passport = Passport()
    for line in lines:
        if len(line) == 0:
            if passport.hasAllFields():
                valid += 1
            passport.clear()
        else:
            for token in list(filter(None, line.split())):
                vals = token.split(":")
                passport.fields[vals[0]] = vals[1]

    return valid

def part2(lines):
    valid = 0

    passport = Passport()
    for line in lines:
        if len(line) == 0:
            if passport.isValid():
                valid += 1
            passport.clear()
        else:
            for token in list(filter(None, line.split())):
                vals = token.split(":")
                passport.fields[vals[0]] = vals[1]

    return valid

with open('input') as f:
    lines = [line.rstrip() for line in f]
print(part1(lines))
print(part2(lines))


