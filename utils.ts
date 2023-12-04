export function readFile(path: string): string[] {
  const file = Deno.readTextFileSync(path);
  return file.split("\n");
}