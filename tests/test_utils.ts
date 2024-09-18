import { simple_payload1 } from "./workflows/simple1";

export const deepClone = <T>(o: T) =>
  globalThis.structuredClone
    ? globalThis.structuredClone(o)
    : (JSON.parse(JSON.stringify(o)) as T);
export const create_s1_prompt = ({
  seed = Math.round(Math.random() * 100_000),
  steps = 1,
}: { seed?: number; steps?: number } = {}) => {
  const prompt = deepClone(simple_payload1.prompt);
  prompt[3].inputs.steps = steps;
  prompt[3].inputs.seed = seed;
  return prompt;
};
