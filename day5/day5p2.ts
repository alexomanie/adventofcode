import { Part2Transformation, Part2TransformationRule, Range, WorkerData, WorkerMessage } from "./interfaces.ts";
import { MultiProgressBar } from "https://deno.land/x/progress@v1.3.9/mod.ts";

function extractTransformations(input: string): Part2Transformation[] {
  const regEx = /(\w+)-to-(\w+) map:\n((?:\d+ \d+ \d+\n?)+)/g;

  const transformations: Part2Transformation[] = [];

  for (const match of input.matchAll(regEx)) {
    const [_, from, to, rulesText] = match;
    const rules = rulesText.trim().split("\n").map(parseTransformationRule);

    transformations.push({
      from,
      to,
      rules,
    });
  }

  return transformations;
}

function parseTransformationRule(ruleText: string): Part2TransformationRule {
  const [destinationStart, sourceStart, size] = ruleText
    .split(" ")
    .map((numberString) => Number.parseInt(numberString));

  return {
    modifer: destinationStart - sourceStart,
    range: {
      start: sourceStart,
      end: sourceStart + size - 1,
    },
  };
}


function parseSeedRanges(seedsLine: string): Range[] {
  const seedsText = seedsLine.split(":").at(1);

  if (seedsText === undefined) {
    throw new Error("Unable to find seed ranges");
  }

  const ranges: Range[] = [];
  const regEx = /\d+ \d+/g;

  for (const match of seedsText.matchAll(regEx)) {
    ranges.push(parseSeedRange(match[0]));
  }

  return ranges;
}

function parseSeedRange(seedRangeText: string): Range {
  const [start, amount] = seedRangeText
    .split(" ")
    .map((value) => Number.parseInt(value));

  return {
    start,
    end: start + amount - 1,
  };
}



function getMinimumLocationForSeedRange(
  seedRange: Range,
  transformations: Part2Transformation[],
  bars: MultiProgressBar
): Promise<number> {
  return new Promise((resolve) => {
    const worker = new Worker(new URL("./worker.ts", import.meta.url).href, { type: "module" });

    worker.postMessage({
      seedRange,
      transformations,
    } satisfies WorkerData);

    worker.addEventListener("message", (message: WorkerMessage) => {
      if (message.data.type === "progress") {
        //console.log(message.data.currentSeed)
      }

      if (message.data.type === "success") {
        worker.terminate();
        resolve(message.data.result);
      }
    });
  });
}

async function partTwo() {
  const input = Deno.readTextFileSync("input.txt");
  const transformations =extractTransformations(input);
  const seedsLine = input.split("\n").at(0) ?? "";
  const seedRanges = parseSeedRanges(seedsLine);

  const bars = new MultiProgressBar({
    title: "Calculating minimum locations",
    // clear: true,
    display: "[:bar] :text :percent :time :completed/:total",
  });

  const workerPromises = seedRanges.map((seedRange) =>
    getMinimumLocationForSeedRange(
      seedRange,
      transformations,
      bars
    )
  );

  const results = await Promise.all(workerPromises);
  
  const output = results.reduce((currentMinimum, minimumForSeedRange) => {
    return Math.min(currentMinimum, minimumForSeedRange);
  }, Infinity);

  console.log(output);
}

await partTwo()