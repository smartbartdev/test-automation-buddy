import {OpenAIStream} from "@/utils/OpenAIStream";
import {promptUnhappyFlow, promptHappyFlow} from "@/utils/code-to-unittests/code-to-unittest.prompts";

const createPrompt = (
  input: string,
  outputProgrammingLanguage: string,
  frameworks: string,
  specificTools: string,
  unhappyFlowTests: boolean
) => {
    if (unhappyFlowTests) {
        return promptUnhappyFlow(input, outputProgrammingLanguage, frameworks, specificTools, unhappyFlowTests);
    } else {
        return promptHappyFlow(input, outputProgrammingLanguage, frameworks, specificTools, unhappyFlowTests);
    }
};

export const OpenAIStream_C2UT = async (
  input: string,
  outputProgrammingLanguage: string,
  frameworks: string,
  specificTools: string,
  unhappyFlowTests: boolean,
  model: string,
  openaikey: string,
) => {
  const prompt = createPrompt(input, outputProgrammingLanguage, frameworks, specificTools, unhappyFlowTests);

  return OpenAIStream(prompt, model, openaikey);
};
