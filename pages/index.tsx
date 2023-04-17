import {
    Box,
    Button,
    ButtonGroup, Center,
    Container, Text, Heading, Image, Link,
} from "@chakra-ui/react";
import React from "react";
import NextLink from 'next/link'

export default function Home() {
    return (
        <>
            <Box
                minHeight={'100vh'}
                width={'100%'}
                bgColor={'white'}>

                <Box paddingTop={'20px'}>
                    <Center>
                        <ButtonGroup gap='4'>
                            <Link as={NextLink} href={'/openapi-test-generator'} color={'white'}>
                                <Button bg={'blue.500'}
                                        color={'white'}
                                        _hover={{bg: "blue.400"}}
                                        variant={'solid'}
                                >OpenAPI to tests</Button>
                            </Link>
                            <Link as={NextLink} href={'/unittest-generator'} color={'white'}>
                                <Button bg={'blue.500'}
                                        color={'white'}
                                        _hover={{bg: "blue.400"}}
                                        variant={'solid'}
                                >Code to unittests</Button>
                            </Link>
                        </ButtonGroup>
                    </Center>
                </Box>

                <Container paddingTop={'100px'}>
                    <Image bgColor={'white'} border={'solid'} borderColor={'black'} borderRadius={'2xl'} src={'/programmer.svg'} width={'100%'}/>
                    <Heading textColor={'black'} as={'h1'} textAlign={'center'}>TEST AUTOMATION BUDDY</Heading>
                    <Text textColor={'black'} textAlign={'center'}>A tool that helps you write automated tests based on your input!</Text>
                </Container>

            </Box>
        </>
    )
}