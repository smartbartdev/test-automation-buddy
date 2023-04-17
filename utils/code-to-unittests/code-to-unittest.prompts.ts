import endent from "endent";

export function promptUnhappyFlow(input: string, outputProgrammingLanguage: string, frameworks: string, specificTools: string, unhappyFlowTests: boolean) {
    return endent`
      Generate automated unit and integration tests in "${outputProgrammingLanguage}" using the "${frameworks}" framework and use the following tools: "${specificTools}" for following class or function" "${input}".
      Create some unhappy flow tests as well.
      Only show the ${outputProgrammingLanguage} test code or test class (no \`\`\`):
     `;
}

export function promptHappyFlow(input: string, outputProgrammingLanguage: string, frameworks: string, specificTools: string, unhappyFlowTests: boolean) {
    return endent`
      Generate automated unit and integration tests in "${outputProgrammingLanguage}" using the "${frameworks}" framework and use the following tools: "${specificTools}" for following class or function" "${input}".
      Only show the ${outputProgrammingLanguage} test code or test class (no \`\`\`):
     `;
}