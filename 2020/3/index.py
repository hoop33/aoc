def traverse(lines, route):
    trees = 0
    x = 0

    for i in range(0, len(lines) - 1, route[1]):
        line = lines[i]
        if line[x] == "#":
            trees += 1
        x += route[0]
        if x >= len(line):
            x -= len(line)

    return trees

def part1(lines):
    trees = 0
    x = 0

    for line in lines:
        if line[x] == "#":
            trees += 1
        x += 3
        if x >= len(line):
            x -= len(line)

    return trees

def part2(lines):
    routes = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]

    total = 1
    for route in routes:
        total *= traverse(lines, route)

    return total

with open('input') as f:
    lines = list(filter(None, [line.rstrip() for line in f]))
print(part1(lines))
print(part2(lines))


