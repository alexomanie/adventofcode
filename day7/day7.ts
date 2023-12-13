function partOne(input: string): number {
  return solve(input, part1Points);
}

function partTwo(input: string): number {
  return solve(input, part2Points);
}

function patternValue(hand: string): number {
  return pack(Array.from(hand).map(card => Array.from(hand).filter(x => x === card).length).sort((a, b) => b - a));
}

function part1Points(hand: string): [number, number] {
  return [patternValue(hand), cardValue(hand, "123456789TJQKA")];
}

function part2Points(hand: string): [number, number] {
  const cards = "J123456789TQKA";
  const pValue = Math.max(...Array.from(cards).map(ch => patternValue(hand.replace(/J/g, ch))));
  return [pValue, cardValue(hand, cards)];
}

function cardValue(hand: string, cardOrder: string): number {
  return pack(Array.from(hand).map(card => cardOrder.indexOf(card)));
}



function pack(numbers: number[]): number {
  return numbers.reduce((a, v) => (a * 256) + v, 1);
}

function solve(input: string, getPoints: (hand: string) => [number, number]): number {
  const bidsByRanking = input.split("\n").map(line => {
    const parts = line.split(" ");
    return {
      hand: parts[0],
      bid: parseInt(parts[1], 10)
    };
  }).sort((a, b) => {
    const pointsA = getPoints(a.hand);
    const pointsB = getPoints(b.hand);
    return pointsA[0] - pointsB[0] || pointsA[1] - pointsB[1];
  }).map((item, rank) => (rank + 1) * item.bid);

  return bidsByRanking.reduce((a, b) => a + b, 0);
}

const input = Deno.readTextFileSync("input.txt");

console.log(partOne(input));
console.log(partTwo(input));
