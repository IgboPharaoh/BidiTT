import React from 'react';
import { Box, Center, Flex, HStack,  Stack, Text, Image } from '@chakra-ui/react';
import CheckMark from '../assets/check.svg';
import Scale from '../assets/scale.svg';
import { StepperProps } from 'src/interfaces';



const Stepper = ({ title, showStep = true, stepBgColor = '#00b300', completed = true }: StepperProps) => {
    return (
        <Box>
            <Stack>
                <Flex>
                    <HStack alignItems='flex-start' gap='24px'>
                        <Flex gap='16px' alignItems='center' flexDir='column'>
                            <Center borderRadius='48px' p='4px' border={completed ? '' : '1px solid red'}>
                                <Center height='fit-content' width='fit-content' borderRadius='48px' h='40px' w='40px' bgColor={stepBgColor}>
                                    {completed ? (
                                        <Image src={CheckMark} alt='check mark' height='20px' width='20px' />
                                    ) : (
                                        <Image src={Scale} alt='check mark' height='14px' width='14px' />
                                    )}
                                </Center>
                            </Center>
                            {showStep && <Box bgColor={stepBgColor} w='4px' h='80px'></Box>}
                        </Flex>
                        <Text pt='8px' fontWeight='600'>
                            {title}
                        </Text>
                    </HStack>
                </Flex>
            </Stack>
        </Box>
    );
};

export default Stepper;
