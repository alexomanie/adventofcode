import { readLines } from "https://deno.land/std/io/mod.ts";


const digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

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
  if(digitsInString.length < 1) {
    return 0
  }
  console.log(digitsInString)
  const combined = digitsInString[0] + digitsInString[digitsInString.length - 1];

  return parseInt(combined);
}

function findWrittenDigitsInString(input: string): number {
  const  regExp = new RegExp(`(${digits.join("|")})|(\\d)`, "gi");
  const finds = []
  let match
  while( (match = regExp.exec(input)) != null) {
    regExp.lastIndex -= match[0].length - 1
    finds.push(match[0])
  }
  const firstMatch = finds[0];
  const lastMatch = finds[finds.length - 1];
  const firstNumber = digits.includes(firstMatch) ? digits.indexOf(firstMatch)+1 : +firstMatch
  const secondNumber = digits.includes(lastMatch) ? digits.indexOf(lastMatch)+1 : +lastMatch
  return firstNumber * 10 + secondNumber;
}

async function run(): Promise<number> {
  const lines = await readFileLineByLine("input.txt");
  //let sum = 0;
  let sum2 = 0;
  for await (const line of lines) {
    //sum += combineFirstAndLastDigitFromString(line);
    sum2 += findWrittenDigitsInString(line);
  }
  //console.log(sum)
  console.log(sum2)
  return 0;
}

await run();