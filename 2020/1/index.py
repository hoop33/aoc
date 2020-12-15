def part1(lines):
    for i in range(len(lines) - 1):
        a = int(lines[i])
        for j in range(i + 1, len(lines)):
            b = int(lines[j])
            if a + b == 2020:
                return a * b

def part2(lines):
    for i in range(len(lines) - 2):
        a = int(lines[i])
        for j in range(i + 1, len(lines) - 1):
            b = int(lines[j])
            for k in range(j + 1, len(lines)):
                c = int(lines[k])
                if a + b + c == 2020:
                    return a * b * c

with open('input') as f:
    lines = [line.rstrip() for line in f]
print(part1(lines))
print(part2(lines))


