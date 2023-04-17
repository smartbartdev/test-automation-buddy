import {Box, Text, Textarea} from "@chakra-ui/react";
import React from "react";

interface InputTextAreaProps {
    title: string;
    input: string;
    setInput: (value: string) => void;
}

export function InputTextArea({title, input, setInput}: InputTextAreaProps) {
    return (
        <Box>
            <Text align={'center'}>{title}</Text>
            <Textarea rows={16} value={input} onChange={e => setInput(e.target.value)}/>
        </Box>
    )
}