import {GenerationBody} from '@/types/types';
import {OpenAIStream_OA2T} from '@/utils/openapi-to-test';

export const config = {
    runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
    try {
        const {input, outputProgrammingLanguage, frameworks, specificTools, unhappyFlowTests, seperateClassesPerEndpoint, model, openaikey} =
            (await req.json()) as GenerationBody;

        const stream = await OpenAIStream_OA2T(
            input,
            outputProgrammingLanguage,
            frameworks,
            specificTools,
            unhappyFlowTests,
            seperateClassesPerEndpoint,
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
