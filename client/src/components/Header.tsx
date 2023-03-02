import React from 'react';
import { Flex, Text, Link, HStack } from '@chakra-ui/react';
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';
import { Headerprops } from 'src/interfaces';

const Header = ({ historyColor }: Headerprops): JSX.Element => {
    let navigate = useNavigate();
    return (
        <Flex ml='80px' mr='80px' gap='64px' justifyContent='space-between'>
            <HStack width='100%' justifyContent='space-between'>
                <Text
                    onClick={() => {
                        navigate('/');
                    }}
                    fontSize='24px'
                    fontWeight='600'
                    color='#0000b3'
                    cursor='pointer'
                >
                    BidiT
                </Text>
                <Link fontWeight='600' href='/auction'>
                    Auction
                </Link>
            </HStack>
            <HStack width='100%' justifyContent='space-between'>
                <Link color={historyColor} fontWeight='600' href='/history'>
                    History
                </Link>
                <CustomButton
                    onClick={() => {
                        navigate('/create');
                    }}
                    backgroundColor='#0000b3'
                    width={{ base: '150px' }}
                    height='48px'
                >
                    Create Account
                </CustomButton>
            </HStack>
        </Flex>
    );
};

export default Header;
