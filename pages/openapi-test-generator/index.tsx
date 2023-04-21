import {
    Box,
    Center, Checkbox,
    Container,
    Heading,
    Input,
    Text,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {OpenAIModel} from "@/types/types";
import {CopyBlock, dracula} from "react-code-blocks";
import {FileInput} from "@/components/FileInput";
import {PageTitle} from "@/components/PageTitle";
import {OpenAIKeyModelComponent} from "@/components/OpenAIKeyModelComponent";
import {ProgrammingLanguageSelect} from "@/components/ProgrammingLanguageSelect";
import {InputTextArea} from "@/components/InputTextArea";
import {GenerateButton} from "@/components/GenerateButton";

export default function OpenapiTestGenerator() {
    const [openaikey, setOpenAiAPIKey] = useState('')
    const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');

    const [input, setInput] = useState('')
    const handleContentChange = (newContent: string) => {
        setInput(newContent);
    };
    const [frameworks, setFrameworks] = useState('')
    const [specificTools, setSpecificTools] = useState('')
    const [outputProgrammingLanguage, setOPL] = useState('Java')
    const [unhappyFlowTests, setUnhappyFlowTests] = useState<boolean>(false)
    const [seperateClassesPerEndpoint, setSeperateClassesPerEndpoint] = useState<boolean>(false)
    const [output, setOutput] = useState('')

    const [loading, setLoading] = useState<boolean>(false);

    const handleGeneration = async () => {

        if (!openaikey) {
            alert('Please enter an API key.');
            return;
        }

        if (!input) {
            alert('Please enter some code.');
            return;
        }

        setLoading(true);
        setOutput('');

        const controller = new AbortController();

        const body: { input: string; outputProgrammingLanguage: string; frameworks: string; specificTools: string; unhappyFlowTests: boolean; seperateClassesPerEndpoint: boolean; model: "gpt-3.5-turbo" | "gpt-4"; openaikey: string } = {
            input,
            outputProgrammingLanguage,
            frameworks,
            specificTools,
            unhappyFlowTests,
            seperateClassesPerEndpoint,
            model,
            openaikey,
        };

        const response = await fetch('/api/openapi-to-test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            setLoading(false);
            alert('Something went wrong.');
            return;
        }

        const data = response.body;

        if (!data) {
            setLoading(false);
            alert('Something went wrong.');
            return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let code = '';

        while (!done) {
            const {value, done: doneReading} = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);

            code += chunkValue;

            setOutput((prevCode) => prevCode + chunkValue);
        }

        setLoading(false);
    };

    return (
        <>
            <Box
                minHeight={'100vh'}
                width={'100%'}>

                <PageTitle title={'OpenAPI to tests'}/>

                <OpenAIKeyModelComponent openaikey={openaikey} model={model} setOpenAiAPIKey={setOpenAiAPIKey} setModel={setModel}/>

                <Container paddingLeft={'20px'}>
                    <Box paddingTop={'20px'}>
                        <Center>
                            <Heading as={'h2'}>
                                Input
                            </Heading>
                        </Center>

                        <InputTextArea title={'OpenAPI YAML'} input={input} setInput={setInput}/>

                        <Box paddingTop={'10px'}>
                            <FileInput onContentChange={handleContentChange} />
                        </Box>
                        <ProgrammingLanguageSelect outputProgrammingLanguage={outputProgrammingLanguage} setOPL={setOPL}/>

                        <Box>
                            <Text align={'center'}>Frameworks</Text>
                            <Input id="frameworks" value={frameworks}
                                   onChange={e => setFrameworks(e.target.value)}
                                   placeholder={'Spring Boot'}/>
                        </Box>
                        <Box>
                            <Text align={'center'}>Specific tools</Text>
                            <Input id="tools" value={specificTools}
                                   onChange={e => setSpecificTools(e.target.value)}
                                   placeholder={'RestAssured, jUnit 5'}/>
                        </Box>
                        <Box>
                            <Checkbox isChecked={unhappyFlowTests}
                                      onChange={e => setUnhappyFlowTests(e.target.checked)}>
                                Unhappy flow tests</Checkbox>
                        </Box>
                        <Box>
                            <Checkbox isChecked={seperateClassesPerEndpoint}
                                      onChange={e => setSeperateClassesPerEndpoint(e.target.checked)}>
                                Seperate classes per endpoint</Checkbox>
                        </Box>
                        <GenerateButton handleGeneration={handleGeneration} loading={loading}/>
                    </Box>
                </Container>
            </Box>
            <Box>
                <Box>
                    <Box>
                        <Center>
                            <Heading as={'h2'}>
                                Output
                            </Heading>
                        </Center>
                    </Box>

                    <Box>
                        <CopyBlock
                            text={output}
                            language={outputProgrammingLanguage}
                            showLineNumbers={true}
                            startingLineNumber={1}
                            theme={dracula}
                            codeBlock
                        />
                    </Box>
                </Box>


            </Box>
        </>
    )
}
