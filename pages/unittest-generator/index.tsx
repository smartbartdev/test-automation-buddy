import {
    Box,
    Button,
    Center, Checkbox,
    Container,
    Heading,
    Input, Link,
    Select,
    Spacer,
    Text,
    Textarea
} from "@chakra-ui/react";
import React, {useState} from "react";
import {OpenAIModel} from "@/types/types";
import {CopyBlock, dracula} from "react-code-blocks";
import NextLink from "next/link";
import {ArrowBackIcon} from "@chakra-ui/icons";
import {PageTitle} from "@/components/PageTitle";
import {OpenAIKeyModelComponent} from "@/components/OpenAIKeyModelComponent";
import {programmingLanguages} from "@/utils/programmingLanguages";
import {ProgrammingLanguageSelect} from "@/components/ProgrammingLanguageSelect";
import {InputTextArea} from "@/components/InputTextArea";
import {GenerateButton} from "@/components/GenerateButton";

export default function UnittestGenerator() {
    const [openaikey, setOpenAiAPIKey] = useState('')
    const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');

    const [input, setInput] = useState('')
    const [frameworks, setFrameworks] = useState('')
    const [specificTools, setSpecificTools] = useState('')
    const [outputProgrammingLanguage, setOPL] = useState('Java')
    const [unhappyFlowTests, setUnhappyFlowTests] = useState<boolean>(false)
    const [output, setOutput] = useState('')

    const [loading, setLoading] = useState<boolean>(false);

    const handleGeneration = async () => {
        // const maxCodeLength = model === 'gpt-3.5-turbo' ? 6000 : 12000;

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

        const body: { input: string; outputProgrammingLanguage: string; frameworks: string; specificTools: string; unhappyFlowTests: boolean; model: "gpt-3.5-turbo" | "gpt-4"; openaikey: string } = {
            input,
            outputProgrammingLanguage,
            frameworks,
            specificTools,
            unhappyFlowTests,
            model,
            openaikey,
        };

        const response = await fetch('/api/code-to-unittest', {
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

                <PageTitle title={'Unit test generator'}/>

                <OpenAIKeyModelComponent openaikey={openaikey} model={model} setOpenAiAPIKey={setOpenAiAPIKey} setModel={setModel}/>

                <Container paddingLeft={'20px'}>
                    <Box paddingTop={'20px'}>
                        <Center>
                            <Heading as={'h2'}>
                                Input
                            </Heading>
                        </Center>

                        <InputTextArea title={'Class or function'} input={input} setInput={setInput}/>

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
                                   placeholder={'Spock, jUnit 5'}/>
                        </Box>
                        <Box>
                            <Checkbox isChecked={unhappyFlowTests}
                                      onChange={e => setUnhappyFlowTests(e.target.checked)}>
                                Unhappy flow tests</Checkbox>
                        </Box>
                        <GenerateButton loading={loading} handleGeneration={handleGeneration}/>
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
