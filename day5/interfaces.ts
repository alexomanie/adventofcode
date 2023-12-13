export interface Part1Transformation {
  from: string;
  to: string;
  rules: Part1TransformationRule[];
}

export interface Part1TransformationRule {
  start: number;
  end: number;
  modifer: number;
}

export interface Part2Transformation {
  from: string
  to: string
  rules: Part2TransformationRule[]
}

export interface Range {
  start: number
  end: number
}

export interface Part2TransformationRule {
  range: Range
  modifer: number
}

export interface WorkerProgressMessage {
  type: "progress";
  currentSeed: number;
}

export interface WorkerSuccessMessage {
  type: "success";
  result: number;
}

export interface WorkerData {
  seedRange: Range;
  transformations: Part2Transformation[];
}

export type WorkerMessage = MessageEvent<
  WorkerProgressMessage | WorkerSuccessMessage
>;