import {Box, Select, Text} from "@chakra-ui/react";
import {programmingLanguages} from "@/utils/programmingLanguages";
import React from "react";

interface ProgrammingLanguageSelectProps {
    outputProgrammingLanguage: string;
    setOPL: (value: string) => void;
}

export function ProgrammingLanguageSelect({outputProgrammingLanguage, setOPL}: ProgrammingLanguageSelectProps) {
    return (
        <Box>
            <Text align={'center'}>Programming language</Text>
            <Select id="language" value={outputProgrammingLanguage}
                    onChange={e => setOPL(e.target.value)}>
                {programmingLanguages
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map((language) => (
                        <option key={language.value} value={language.value}>
                            {language.label}
                        </option>
                    ))}
            </Select>
        </Box>
    )
}