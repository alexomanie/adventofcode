function readFileLineByLine(path: string): Array<string> {
  const file = Deno.readTextFileSync(path);
  return file.split("\n");
}

function part1(lines: Array<string>) {
  let index = 0;
  let sum = 0;
  for (const line of lines) {
    index++;
    const draws = line.split(":")[1].trim().replaceAll(";", ",").split(",");
    let possible = true;
    draws.forEach((draw) => {
      const splittedDraw: string[] = draw.trim().split(" ");
      if (Number(splittedDraw.at(0)) > 12 && splittedDraw.at(1) === "red") {
        possible = false;
      }
      if (Number(splittedDraw.at(0)) > 13 && splittedDraw.at(1) === "green") {
        possible = false;
      }
      if (Number(splittedDraw.at(0)) > 14 && splittedDraw.at(1) === "blue") {
        possible = false;
      }
    });
    sum += possible ? index : 0;
  }
  return sum;
}

function part2(lines: Array<string>) {
  let index = 0;
  let power = 0;
  for (const line of lines) {
    index++;
    const minimalCubeNumberMap = new Map<string, number>([["red", 0], [
      "green",
      0,
    ], ["blue", 0]]);
    const draws = line.split(":")[1].trim().replaceAll(";", ",").split(",");
    draws.forEach((draw) => {
      const splittedDraw: string[] = draw.trim().split(" ");
      const cubeValue = Number(splittedDraw.at(0));
      const color = splittedDraw.at(1);
      if (color === "red") {
        if (minimalCubeNumberMap.get("red")! < Number(cubeValue)) {
          minimalCubeNumberMap.set("red", Number(cubeValue));
        } 
      }
      if (color === "green") {
        if (minimalCubeNumberMap.get("green")! < Number(cubeValue)) {
          minimalCubeNumberMap.set("green", Number(cubeValue));
        } 
      }
      if (color === "blue") {
        if (minimalCubeNumberMap.get("blue")! < Number(cubeValue)) {
          minimalCubeNumberMap.set("blue", Number(cubeValue));
        } 
      }
    });
    const product = minimalCubeNumberMap.get("red")! * minimalCubeNumberMap.get("green")! * minimalCubeNumberMap.get("blue")!;
    power += product;
  }
  return power;
}


function main() {
  const lines = readFileLineByLine("sample.txt");
  console.log(part1(lines));
  console.log(part2(lines));
}

main();
