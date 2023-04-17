export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4';

export interface GenerationBody {
  input: string;
  outputProgrammingLanguage: string;
  frameworks: string;
  specificTools: string;
  unhappyFlowTests: boolean;
  seperateClassesPerEndpoint: boolean;
  model: OpenAIModel;
  apiKey: string;
}