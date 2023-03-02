import { Box, Center, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from 'src/components/Header';
import { Bid, HistoryProps } from 'src/interfaces';

const History = ({
    paymentRequest,
    name,
    description = 'here is a description that will fit all narratives that Qala devs are stacking sats and building projects to change the world put Africa ont he worlds landscape',
    amount,
    openDrawer,
    onCloseDrawerCallback,
    hasPaid,
}: HistoryProps) => {
    const [allBids, setallBids] = useState<Array<Bid>>([]);

    const trimDescription = (args: string) => {
        return `${args.substring(0, 110)}.....`;
    };

    return (
        <Box pt='16px'>
            <Header />
            <Box m='12px 80px 0px 80px'>
                <Text fontSize='36px' fontWeight='500'>
                    History
                </Text>
                <Text fontWeight='300' fontSize='15px'>
                    History of all created bids, from every party
                </Text>
            </Box>
            <Box m='24px 80px 0px 80px'>
                <Stack>
                    <Box
                        boxShadow='rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
                        p='32px'
                        borderRadius='4px'
                        w='300px'
                        maxH='400px'
                        padding='16px'
                    >
                        <Center mb='16px' w='100%' height='160px' bgColor='black'>
                            <Text fontSize='32px' fontWeight='600' color='white'>
                                QALA
                            </Text>
                        </Center>
                        <Stack>
                            <HStack justifyContent='space-between'>
                                <Text fontSize='16px' fontWeight='300'>
                                    Amount
                                </Text>
                                <Text fontWeight='600'>{amount}7878 sats</Text>
                            </HStack>
                            <HStack justifyContent='space-between'>
                                <Text fontSize='16px' fontWeight='300'>
                                    Name
                                </Text>
                                <Text fontWeight='600'>{name}Qala devs</Text>
                            </HStack>
                            <Flex flexDir='column' justifyContent='space-between'>
                                <Box>
                                    <Text textDecor='underline' fontSize='16px' fontWeight='300'>
                                        Description
                                    </Text>
                                    <Text fontSize='15px' fontWeight='300'>
                                        {trimDescription(description!)}
                                    </Text>
                                </Box>
                                <Flex w='100%' justifyContent='flex-end' alignItems='flex-end'>
                                    <Text
                                        fontWeight='600'
                                        fontSize='14px'
                                        color='white'
                                        w='fit-content'
                                        bgColor={hasPaid ? '#00b300' : 'orange'}
                                        borderRadius='32px'
                                        p='8px 7px'
                                        mt='4px'
                                        cursor='pointer'
                                    >
                                        {hasPaid ? 'Paid' : 'Pending'}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default History;
