import {useState} from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import {Box, Button, Input} from "@chakra-ui/react";

type FileInputProps = {
    onContentChange: (content: string) => void;
};

export const FileInput: React.FC<FileInputProps> = ({ onContentChange }) => {
    const [url, setUrl] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleFetch = async () => {
        try {
            const response = await axios.get(url);
            const contentType = response.headers['content-type'];

            let content;
            if (contentType.includes('json')) {
                content = JSON.stringify(response.data, null, 2);
            } else if (contentType.includes('yaml') || contentType.includes('x-yaml')) {
                content = yaml.dump(response.data);
            } else {
                throw new Error('Invalid file format');
            }

            onContentChange(content);
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    };

    return (
        <Box>
            <Input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={handleChange}
            />
            <Box paddingTop={'10px'}>
                <Button
                    id={'getDocButton'}
                    bg={'blue.500'}
                    color={'white'}
                    _hover={{bg: "blue.400"}}
                    variant={'solid'}
                    onClick={handleFetch}>Get OpenAPI docs</Button>
            </Box>
        </Box>
    );
};
