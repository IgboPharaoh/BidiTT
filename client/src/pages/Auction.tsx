import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Header from 'src/components/Header';

const Auction = () => {
    return (
        <Box pt='16px'>
            <Header />
            <Box m='12px 80px 0px 80px'>
                <Text fontSize='36px' fontWeight='500'>
                    Auctions
                </Text>
                <Text fontWeight='300' fontSize='15px'>
                    This page will house ongoing and future auctions
                </Text>
            </Box>
        </Box>
    );
};

export default Auction;
