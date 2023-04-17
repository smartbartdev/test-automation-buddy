import {Box, Button} from "@chakra-ui/react";
import React from "react";

interface GenerateButtonProps {
    handleGeneration: () => void;
    loading: boolean;
}

export function GenerateButton({ handleGeneration, loading }: GenerateButtonProps) {
    return (
        <Box
            paddingTop={'5px'}
        >
            <Button
                isDisabled={loading}
                id={'generateButton'}
                bg={'blue.500'}
                color={'white'}
                _hover={{bg: "blue.400"}}
                variant={'solid'}
                onClick={handleGeneration}>
                {loading ? 'Generating...' : 'Generate'}
            </Button>
        </Box>
    )
}