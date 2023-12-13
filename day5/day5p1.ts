import { Part1Transformation, Part1TransformationRule } from "./interfaces.ts";


function extractTransformations(input: string): Part1Transformation[] {
  const regEx = /(\w+)-to-(\w+) map:\n((?:\d+ \d+ \d+\n?)+)/g;
  const transformations = []
  for(const match of input.matchAll(regEx)) {
    const [_, from, to, rulesText] = match;
    const rules = rulesText.trim().split("\n").map(parseTransformationRule);
    
    transformations.push({
      from,
      to,
      rules,
    });
  }

  return transformations
}

function parseTransformationRule(ruleText: string): Part1TransformationRule {
  const [destinationStart, sourceStart, size] = ruleText
    .split(" ")
    .map((numberString) => Number.parseInt(numberString));

  return {
    modifer: destinationStart - sourceStart,
    start: sourceStart,
    end: sourceStart + size - 1,
  };
}

function applyTransformation(input: number, transformation: Part1Transformation): number {
  const ruleToApply = transformation.rules.find(
    (rule) => input >= rule.start && input <= rule.end
  );
  return ruleToApply ? input + ruleToApply.modifer : input;
}

function mapOriginalSeedsToALocation(seeds: number[], transformations: Part1Transformation[]): number[] {

  return seeds.map(seed => {
    return transformations.reduce(applyTransformation, seed)
  })
}

function partOne() {
  const lines = Deno.readTextFileSync("sample.txt"); 
  const transformations = extractTransformations(lines);
  const seedsString = lines.split("\n")[0].split(":")[1].trim();
  const seedNumbers = [...seedsString.matchAll(/\d+/g)].map((match) => Number(match[0]))
  const locations = mapOriginalSeedsToALocation(seedNumbers, transformations)
  console.log(Math.min(...locations))
}


partOne()
