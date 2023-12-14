
function partOne(input: string): number {
  return solve(input, extrapolateRight)
}

function partTwo(input: string): number {
  return solve(input, extrapolateLeft)
}

function solve(input: string, extrapolate: (input: number[]) => number): number {
  const histories = input.split("\n").map(line => line.split(" ").map(item => Number(item)))
  const extrapolated = histories.map(history => extrapolate(history))
  return extrapolated.reduce((a, b) => a + b, 0)
}

function extrapolateLeft(numbers: number[]): number {
  return extrapolateRight(numbers.reverse())
}

function extrapolateRight(numbers: number[]): number {
  if(numbers.length === 0) {
    return 0
  } else {
    return extrapolateRight(diff(numbers)) + numbers[numbers.length - 1]
  }
}

function diff(numbers: number[]): number[] {
  return numbers.slice(1).map((num, index) => num - numbers[index]);
}
const file = Deno.readTextFileSync("input.txt")
console.log(partOne(file))
console.log(partTwo(file))