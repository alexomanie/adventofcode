import { readFile } from "../utils.ts";

type Card = {
  winningNumbers: number[],
  cardNumbers: number[],
}

function parseCards(lines: string[]): Card[] {
  return lines.map((line) => {
    const [_, otherPart] = line.split(":");
    const [winningPart, cardNumbersPart] = otherPart.trim().split("|");
    const card = {
      winningNumbers: winningPart.trim().split(" ").map((x) => Number(x)).filter((x) => x !== 0),
      cardNumbers: cardNumbersPart.trim().split(" ").map((x) => Number(x)).filter((x) => x !== 0),
    }
    return card
  })
}

function countWinningNumbers(cards: Card[]): number {

  const counts = cards.map((card) => {
    const winningCount = card.cardNumbers.filter((number) => card.winningNumbers.includes(number)).length
    console.log(winningCount, winningCount === 0 ? 0 : 1 * Math.pow(2, winningCount - 1))
    if(winningCount === 0) {
      return 0
    }
    return 1 * Math.pow(2, winningCount - 1)
  })

  return counts.reduce((a, b) => a + b, 0)
}

function partOne() {
  const lines = readFile("input.txt");
  const cards = parseCards(lines);
  console.log(countWinningNumbers(cards))
}

partOne()