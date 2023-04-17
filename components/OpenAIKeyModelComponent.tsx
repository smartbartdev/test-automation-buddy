import React, { ChangeEvent } from 'react';
import { Box, Center, Container, Input, Select, Spacer, Text } from '@chakra-ui/react';

type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4';

interface OpenAIKeyModelProps {
    openaikey: string;
    model: OpenAIModel;
    setOpenAiAPIKey: (value: string) => void;
    setModel: (value: OpenAIModel) => void;
}

export const OpenAIKeyModelComponent: React.FC<OpenAIKeyModelProps> = ({
                                                                    openaikey,
                                                                    model,
                                                                    setOpenAiAPIKey,
                                                                    setModel,
                                                                }) => {
    return (
        <Container paddingTop={'20px'}>
            <Center>
                <Box>
                    <Text align={'center'}>OpenAI API Key</Text>
                    <Input
                        width={'400px'}
                        id="openaikey"
                        type="password"
                        value={openaikey}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setOpenAiAPIKey(e.target.value)}
                        placeholder={'sk-...'}
                    />
                </Box>
                <Spacer />
                <Box>
                    <Text align={'center'}>Model</Text>
                    <Select
                        id="language"
                        value={model}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setModel(e.target.value as OpenAIModel)}
                    >
                        <option value="gpt-3.5-turbo">GPT-3.5</option>
                        <option value="gpt-4">GPT-4</option>
                    </Select>
                </Box>
            </Center>
        </Container>
    );
};
