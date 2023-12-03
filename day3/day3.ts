type Part = {
  value: string;
  row: number;
  col: number;
};

function fromMatchesToParts(matches: IterableIterator<RegExpMatchArray>, index: number): Part[] {
  const parts: Part[] = [];
  for (const match of matches) {
    parts.push({
      value: match[0],
      row: index,
      col: match.index! ,
    });
  }
  return parts;
}

function readFile(path: string): string[] {
  const file = Deno.readTextFileSync(path);
  return file.split("\n");
}

function isAdjacent(part1: Part, part2: Part): boolean {
  const firstCondition = Math.abs(part2.row - part1.row) <= 1;
  const secondCondition = part1.col <= part2.col + part2.value.length;
  const thirdCondition = part2.col <= part1.col + part1.value.length;
  return firstCondition && secondCondition && thirdCondition;
}

function partOne(lines: string[]): number {
  const symbolParts = lines
    .map((line, index) => {
      return fromMatchesToParts(line.matchAll(/[^.0-9]/gi), index);
    })
    .flat();
  const numberParts = lines
    .map((line, index) => fromMatchesToParts(line.matchAll(/\d+/gi), index))
    .flat();
  const relevantNumbers = numberParts
    .filter((num) => symbolParts.some((sym) => isAdjacent(sym, num)))
    .map((part) => part.value);
  return relevantNumbers.reduce((a, b) => Number(a) + Number(b), 0);
}

function partTwo(lines: string[]): number {
  const gearParts = lines
    .map((line, index) => {
      return fromMatchesToParts(line.matchAll(/\*/gi), index);
    })
    .flat();
  const numberParts = lines
    .map((line, index) => fromMatchesToParts(line.matchAll(/\d+/gi), index))
    .flat();

  const gearRatios = gearParts.map((gear) => {
    const neighbours = numberParts
      .filter((number) => isAdjacent(gear, number))
      .map((number) => number.value);
    if (neighbours.length === 2) {
      return Number(neighbours.at(0)) * Number(neighbours.at(1));
    }
    return 0;
  });
  return gearRatios.reduce((a, b) => a + b, 0);
}

const lines = readFile("./input.txt");
console.log(partOne(lines));
console.log(partTwo(lines));
