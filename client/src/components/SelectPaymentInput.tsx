import React from 'react';
import { Flex, Stack, Box, Text, Radio, Image } from '@chakra-ui/react';

import { SelectPaymentInputProps } from '../interfaces';
import Arrow from '../assets/arrow.svg';

const SelectPaymentInput = ({
    checked,
    cardName,
    paymentImage,
    name,
    onClickFlex,
    radioValue,
    onChange,
    selected = false,
}: SelectPaymentInputProps): JSX.Element => {
    return (
        <>
            <Flex
                boxShadow='rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;'
                w='100%'
                borderRadius='4px'
                h='250px'
                justifyContent='center'
                alignItems='center'
                cursor='pointer'
                border={selected ? '1px solid #0000b3' : ''}
                bgColor={selected ? '#e5ecff' : ''}
                pos='relative'
                onClick={onClickFlex}
            >
                <Box top='16px' right='16px' position='absolute'>
                    <Radio onChange={onChange} value={radioValue} size='lg' bgColor='white' checked={checked} name={name} />
                </Box>
                <Stack spacing='16px' alignItems='center'>
                    <Box borderRadius='4px' p='20px 32px'>
                        <Image src={paymentImage} alt='' height='80px' width='80px' />
                    </Box>
                    <Text fontSize='14px' fontWeight='600'>
                        {cardName}
                    </Text>
                    {selected ? <Image src={Arrow} alt='' height='24' width='24' /> : null}
                </Stack>
            </Flex>
        </>
    );
};

export default SelectPaymentInput;
