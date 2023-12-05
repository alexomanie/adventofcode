import { readFile } from "../utils.ts";
import findClosestLocationNumber from "./alternative.ts";

type SubStep = {
  source: number,
  destination: number,
  range: number
}

type Step = {
  subSteps: SubStep[],
  title: string
}

type AllSteps = Array<Step>

function extractAllSteps(lines: string[]): AllSteps {
  lines.shift()
  const steps = Array<Step>()
  let step = {
    subSteps: Array<SubStep>(),
    title: ''
  };
  lines.forEach((line, index) => {
    const numbers =[...line.trim().matchAll(/\d+/g)].map((match) => Number(match[0]))
    if(numbers.length === 0 && line.length > 0) {
      step.title = line
    }
    if (numbers.length === 3) {
      step.subSteps.push({
        source: numbers[1],
        destination: numbers[0],
        range: numbers[2]
      })
    } 
    if(line.length === 0 || index === lines.length - 1) {
      steps.push(step)
      step = {
        subSteps: [],
        title: ''
      }
    }
  })
  return steps
}

function convertValue(value: number, subStep: SubStep): number | null {
  const delta = value - subStep.source
  const isInMappedDestinationdRange = delta >= 0 && delta < subStep.destination + subStep.range
  const isnMappedSoruceRange = value >= subStep.source && value <= subStep.source + subStep.range
  if (isInMappedDestinationdRange && isnMappedSoruceRange) {
    return subStep.destination + delta
  }
  return null
}

function solvePartOne(seeds: number[], allSteps: AllSteps): number {

  const locations = Array<number>()
  seeds.forEach((seed) => {
    let location: number | null = null
    let currentValue: number | null = null
    let previousConverterType: string

    allSteps.forEach( (step) => {

      step.subSteps.forEach((subStep) => {
        if (step.title === previousConverterType) return

        currentValue = convertValue(location ?? seed, subStep)!

        if(currentValue !== null) {
          location = currentValue
          currentValue = null
          previousConverterType = step.title
        }
      }) 
    })
    locations.push(location ?? seed)
  })

  const minLocation = Math.min(...locations)
  return minLocation
}

function partOne() {
  const lines = readFile("input.txt"); 
  findClosestLocationNumber(lines)
  const seeds = lines.shift()!.split(":")[1]
  const seedNumbers = [...seeds.trim().matchAll(/\d+/g)].map((match) => Number(match[0]))
  const allSteps = extractAllSteps(lines)
  console.log(solvePartOne(seedNumbers, allSteps))
}


partOne()
