def numForTurn(num, seed):
    length = len(seed)

    cache = {}
    for i in range(length):
        cache[seed[i]] = i + 1

    last = seed[-1]
    for turn in range(length + 1, num + 1):
        next = 0 if not last in cache else turn - cache[last] - 1
        cache[last] = turn - 1
        last = next

    return last

def part1(nums):
    return numForTurn(2020, nums)

def part2(nums):
    return numForTurn(30000000, nums)

data = list(map(lambda x: int(x), "14,1,17,0,3,20".split(",")))
print(part1(data))
print(part2(data))


