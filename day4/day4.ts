import { readFile } from "../utils.ts";

type Card = {
  matches: number
}

function parseCards(lines: string[]): Card[] {
  return lines.map((line) => {
    const [_, otherPart] = line.split(":");
    const [winningPart, cardNumbersPart] = otherPart.trim().split("|");
    const winningNumbers = [...winningPart.trim().matchAll(/\d+/g)].map((match) => Number(match[0]))
    const cardNumbers = [...cardNumbersPart.trim().matchAll(/\d+/g)].map((match) => Number(match[0]))
    const card = {
      matches: cardNumbers.filter((number) => winningNumbers.includes(number)).length
    }
    return card
  })
}

function countWinningNumbers(cards: Card[]): number {

  const counts = cards.map((card) => {
    if(card.matches === 0) {
      return 0
    }
    return Math.pow(2, card.matches - 1)
  })

  return counts.reduce((a, b) => a + b, 0)
}

function solvePartTwo(cards: Card[]) {
  const counts = cards.map((_) => 1)

  for(let i = 0; i < cards.length; i++) {
    const count = counts[i];
    const card = cards[i];
    for (let j = 0; j < card.matches; j++) {
      if(card.matches === cards[i].matches) {
        counts[i + j + 1] += count
      }
    }
  }
  return counts.reduce((a, b) => a + b, 0)
}

function partOne() {
  const lines = readFile("input.txt");
  const cards = parseCards(lines);
  console.log(countWinningNumbers(cards))
}

function partTwo() {
  const lines = readFile("input.txt");
  const cards = parseCards(lines);
  console.log(solvePartTwo(cards))
}

partOne()
partTwo()