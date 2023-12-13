import { readFileAsLineArray } from "../utils.ts";

function part2(lines: string[]): number {
  const [raceDuration, record] = lines.map((line) => {
    return parseInt([...line.split(":")[1].trim().matchAll(/\d+/g)].map((match) => match[0]).join(""))
  })
  console.log(raceDuration, record)
  let possibilities = 0
  for (let i = 0; i <= raceDuration; i++) {
    if (i * (raceDuration - i) > record) {
      possibilities++
    }
  }
  return possibilities
}

function part1(lines: string[]): number {

  const [raceDurations, records] = lines.map((line) => {
    return [...line.split(":")[1].trim().matchAll(/\d+/g)].map((match) => Number(match[0]))
  })

  console.log(raceDurations, records)
  const possibleCombinations =raceDurations.map((duration, index) => {
    const possibilities = []
    for(let i = 0; i <= duration; i++) {
      if(i * (duration - i) > records[index]) {
        possibilities.push(index)
      }
    }
    return possibilities.length
  })
  console.log(possibleCombinations)

  return possibleCombinations.reduce((a,b) => a*b, 1)
}


function main() {
  const lines = readFileAsLineArray("input.txt");
  //console.log(part1(lines));
  console.log(part2(lines));
}

main();