import endent from 'endent';
import {OpenAIStream} from "@/utils/OpenAIStream";

function addUnhappyFlowTests(unhappyFlowTests: boolean): string {
  if (unhappyFlowTests) {
    return "Also I would like you to add some unhappy flow tests."
  }
  return ""
}

function createSeperateClassesPerEndpoint(separateClassesPerEndpoint: boolean): string {
  if (separateClassesPerEndpoint) {
    return "Also create separate classes per endpoint."
  }
  return ""
}

const createPrompt = (
  input: string,
  outputProgrammingLanguage: string,
  frameworks: string,
  specificTools: string,
  unhappyFlowTests: boolean,
  separateClassesPerEndpoint: boolean
) => {

  //TODO: add example
    return endent`
      You are an expert test automation engineer in all programming languages. Translate the "${input}" OpenAPI specs to test automation code in "${outputProgrammingLanguage}". Do not include \`\`\`.

      Use the following frameworks: "${frameworks}" and the following tools: "${specificTools}".
      
      ${addUnhappyFlowTests(unhappyFlowTests)} ${createSeperateClassesPerEndpoint(separateClassesPerEndpoint)}
      
      Do not repeat the openapi documentation.
      
      ${outputProgrammingLanguage} code (no \`\`\`):
     `;
};

export const OpenAIStream_OA2T = async (
  input: string,
  outputProgrammingLanguage: string,
  frameworks: string,
  specificTools: string,
  unhappyFlowTests: boolean,
  separateClassesPerEndpoint: boolean,
  model: string,
  key: string,
) => {
  const prompt = createPrompt(input, outputProgrammingLanguage, frameworks, specificTools, unhappyFlowTests, separateClassesPerEndpoint);

  return OpenAIStream(prompt, model, key);
};
