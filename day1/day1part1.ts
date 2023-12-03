import { readLines } from "https://deno.land/std/io/mod.ts";


async function readFileLineByLine(path: string): Promise<string[]> {

  const file = Deno.openSync(path);
  const lines = []
  for await (const line of readLines(file)) {
    lines.push(line);
  }

  return lines;
}

function combineFirstAndLastDigitFromString(input: string): number {
  const digitsInString = [...input.matchAll(/\d/g)].map((x) => x[0]);
  return parseInt(digitsInString[0] + digitsInString[digitsInString.length - 1]);
}

async function run(): Promise<number> {
  const lines = await readFileLineByLine("input.txt");
  let sum = 0;
  for await (const line of lines) {
    sum +=combineFirstAndLastDigitFromString(line);
  }
  console.log(sum)
  
  return 0;
}

await run();