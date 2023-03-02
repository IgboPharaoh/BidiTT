import React from 'react';
import CustomButton from './CustomButton';
import { Stack, Text, Flex } from '@chakra-ui/react';
import SelectPaymentInput from './SelectPaymentInput';

import { PaymentChoiceProps } from '../interfaces';
import Bitcoin from '../assets/bitcoin.svg';
import Lightning from '../assets/lightning.svg';

const PaymentChoice = ({ onNextCallback, selected, onPreviousCallback }: PaymentChoiceProps): JSX.Element => {
    return (
        <Stack w='xl' spacing='16px'>
            <Text fontWeight='600' fontSize='24px'>
                Choose Payment Method
            </Text>
            <Text>You've successfully started the process, choose a payment method to be able to process your bid.</Text>
            <Flex pt='40px' pb='40px' gap='48px' justifyContent='space-between'>
                <SelectPaymentInput
                    onClickFlex={() => {}}
                    radioValue='bitcoin'
                    selected={selected}
                    onChange={() => {}}
                    paymentImage={Bitcoin}
                    name='bitcoin'
                    cardName='BITCOIN'
                />
                <SelectPaymentInput
                    radioValue='lightning'
                    onChange={() => {}}
                    onClickFlex={() => {}}
                    selected={selected}
                    paymentImage={Lightning}
                    name='lightning'
                    cardName='LIGHTNING'
                />
            </Flex>
            <Flex alignItems='center' justifyContent='space-between'>
                <Text onClick={onPreviousCallback} opacity='0.70' _hover={{ textDecor: 'underline' }} cursor='pointer' fontWeight='500'>
                    Previous
                </Text>
                <CustomButton onClick={onNextCallback} backgroundColor='#0000b3' width={{ base: '150px' }} height='48px' borderRadius='4px'>
                    Next
                </CustomButton>
            </Flex>
        </Stack>
    );
};

export default PaymentChoice;
