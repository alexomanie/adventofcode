function partOne(input: string): number {
  return solve(input, "AAA", "ZZZ")
}

function partTwo(input: string): number {
  return solve(input, "A", "Z")
}

function solve(input: string, startMarker: string, endMarker: string): number {
  const parts = input.split("\n\n")
  const directions = parts[0]
  const directionMap = parseDirectionMap(parts[1])

  const relevantDirections = Array.from(directionMap.keys())
    .filter(key => key.endsWith(startMarker))
    .map(key => getStepCountToEndNode(key, endMarker, directions, directionMap))
    .reduce((a, b) => LeastCommonMultiple(a, b), 1)

  return relevantDirections
}

function LeastCommonMultiple(a: number, b: number): number {
  return (a * b) / GreatestCommonDemoninator(a, b)
}

function GreatestCommonDemoninator(a: number, b: number): number {
  return b === 0 ? a : GreatestCommonDemoninator(b, a % b)
}

function getStepCountToEndNode(startNode: string, endNode: string, directions: string, directionMap: Map<string, {left: string, right: string}>): number {
  let i = 0
  while(!startNode.endsWith(endNode)) {
    const direction = directions[i % directions.length]
    if(direction === "L") {
      startNode = directionMap.get(startNode)!.left
    } else {
      startNode = directionMap.get(startNode)!.right
    }
    i++
  }
  return i
}

function parseDirectionMap(input: string): Map<string, {left: string, right: string}> {
  const directionMap = new Map<string, {left: string, right: string}>()
  input.split("\n").forEach(line => {
    const matches = [...line.matchAll(/[A-Z]+/g)]
    directionMap.set(matches[0][0], {
      left: matches[1][0],
      right: matches[2][0]
    })
  })
  return directionMap
}

const input = Deno.readTextFileSync("input.txt");
console.log(partOne(input))
console.log(partTwo(input))