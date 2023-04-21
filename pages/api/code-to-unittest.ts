import {GenerationBody} from '@/types/types';
import {OpenAIStream_C2UT} from "@/utils/code-to-unittests/code-to-unittest";

export const config = {
    runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
    try {
        const {input, outputProgrammingLanguage, frameworks, specificTools, unhappyFlowTests, model, openaikey} =
            (await req.json()) as GenerationBody;

        const stream = await OpenAIStream_C2UT(
            input,
            outputProgrammingLanguage,
            frameworks,
            specificTools,
            unhappyFlowTests,
            model,
            openaikey,
        );

        return new Response(stream);
    } catch (error) {
        console.error(error);
        return new Response('Error', {status: 500});
    }
};

export default handler;
