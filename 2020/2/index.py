import re

pattern = re.compile('^(\d+)\-(\d+) ([a-z]): ([a-z]+)$')

def part1(lines):
    valid = 0

    for line in lines:
        matches = pattern.match(line)
        if matches:
            min = int(matches.group(1))
            max = int(matches.group(2))
            num = len(matches.group(4).split(matches.group(3))) - 1
            if min <= num and num <= max:
                valid += 1

    return valid

def part2(lines):
    valid = 0

    for line in lines:
        matches = pattern.match(line)
        if matches:
            c1 = matches.group(4)[int(matches.group(1)) - 1]
            c2 = matches.group(4)[int(matches.group(2)) - 1]
            c3 = matches.group(3)
            if c1 != c2 and (c1 == c3 or c2 == c3):
                valid += 1

    return valid

with open('input') as f:
    lines = [line.rstrip() for line in f]
print(part1(lines))
print(part2(lines))


