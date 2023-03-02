import { useState } from 'react';

import { Box, Flex, Text, Stack, HStack, VStack, Progress } from '@chakra-ui/react';
import Header from './components/Header';
import { TimeState } from './interfaces/index';
import CustomButton from './components/CustomButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
    const [timer, setTimer] = useState<TimeState>({ hours: new Date().getHours(), min: new Date().getMinutes(), sec: new Date().getSeconds() });
    const navigate = useNavigate();
    return (
        <div className='App'>
            <main>
                <Box mt='16px' width='100%' position='absolute'>
                    <Header historyColor='white' />
                </Box>
                <Flex>
                    <Box bgColor='#f5f8ff' width='100%' height='100vh'>
                        <Flex pl='80px' height='100%' flexDir='column' justifyContent='center' alignItems='flex-start'>
                            <Stack spacing='0px'>
                                <Text fontWeight='700' fontSize='64px'>
                                    Buy Bids
                                </Text>
                                <Text fontWeight='700' fontSize='64px'>
                                    Create Bids
                                </Text>
                                <Text color='#0000b3' fontWeight='700' fontSize='64px'>
                                    BidiT!
                                </Text>
                                <Text width='lg' pt='24px' fontWeight='500' fontSize='20px'>
                                    BidiT offers you the opportunity to seamlessly use your sats to buy and sell different items at the best price.
                                </Text>
                            </Stack>
                            <HStack width='100%' spacing='16px' pt='24px'>
                                <CustomButton
                                    onClick={() => {
                                        navigate('/create-bid');
                                    }}
                                    backgroundColor='#0000b3'
                                    width={{ base: '150px' }}
                                    height='48px'
                                >
                                    Buy Bid
                                </CustomButton>
                                <CustomButton
                                    onClick={() => {
                                        navigate('/create-bid');
                                    }}
                                    backgroundColor='transparent'
                                    border='2px solid #0000b3 '
                                    width={{ base: '150px' }}
                                    height='48px'
                                    color='black'
                                >
                                    Create Bid
                                </CustomButton>
                            </HStack>
                        </Flex>
                    </Box>
                    <Box bgColor='#000066' width='100%' height='100vh'>
                        <Flex flexDir='column' height='100%' justifyContent='center' alignItems='center'>
                            <Box borderRadius='16px' mb='16px' w='300px' h='300px' bgColor='white'></Box>
                            <CustomButton
                                onClick={() => {
                                    console.log('');
                                }}
                                backgroundColor='black'
                                width={{ base: '300px' }}
                                height='48px'
                            >
                                Join Live Auction
                            </CustomButton>

                            <Box
                                borderRadius='16px'
                                justifyContent='flex-start'
                                alignItems='center'
                                flexDir='column'
                                display='flex'
                                mt='24px'
                                h='250px'
                                w='500px'
                                bgColor='white'
                            >
                                <HStack mt='32px' spacing='8px' justifyContent='center' alignItems='flex-start'>
                                    <VStack width='64px'>
                                        <Text fontSize='36px' fontWeight='600'>
                                            {timer.hours}
                                        </Text>
                                        <Text opacity='0.87' color='#2D2D2D' fontSize='12px' fontWeight='600'>
                                            HOURS
                                        </Text>
                                    </VStack>
                                    <Text fontSize='36px' fontWeight='600'>
                                        :
                                    </Text>
                                    <VStack width='64px'>
                                        <Text fontSize='36px' fontWeight='600'>
                                            {timer.min}
                                        </Text>
                                        <Text opacity='0.87' color='#2D2D2D' fontSize='12px' fontWeight='600'>
                                            MINS
                                        </Text>
                                    </VStack>
                                    <Text fontSize='36px' fontWeight='600'>
                                        :
                                    </Text>
                                    <VStack width='64px'>
                                        <Text fontSize='36px' fontWeight='600'>
                                            {timer.sec}
                                        </Text>
                                        <Text opacity='0.87' color='#2D2D2D' fontSize='12px' fontWeight='600'>
                                            SECS
                                        </Text>
                                    </VStack>
                                </HStack>
                                <Progress
                                    ringColor='#0000b3'
                                    isIndeterminate
                                    mt='16px'
                                    borderRadius='16px'
                                    width='60%'
                                    height='10px'
                                    colorScheme='messenger'
                                    value={65}
                                />
                                <HStack alignItems='center' mt='28px'>
                                    <Text fontWeight='600'>Top Bid :</Text>
                                    <Text color='#002db3' fontWeight='600' fontSize='40px'>
                                        858,000 <span style={{ fontSize: '14px', opacity: 0.8 }}>sats</span>
                                    </Text>
                                </HStack>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </main>
        </div>
    );
}

export default App;
