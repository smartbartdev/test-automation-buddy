import {Button, Center, Container, Heading, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import {ArrowBackIcon} from "@chakra-ui/icons";
import React from "react";

type PageTitleProps = {
    title: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
    return (
        <Container>
            <Center padding={'20px'}>
                <Link as={NextLink} href={'/'} color={'white'}>
                    <Button bg={'blue.500'}
                            color={'white'}
                            _hover={{bg: "blue.400"}}
                            variant={'solid'}
                    ><ArrowBackIcon/></Button>
                </Link>
                <Heading paddingLeft={'20px'} as={'h1'}>
                    {title}
                </Heading>
            </Center>
        </Container>
    )
}