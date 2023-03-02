import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Input,
    Stack,
    Text,
} from '@chakra-ui/react';
import React from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import { PaymentDrawerProps } from 'src/interfaces';
import CustomButton from './CustomButton';

const PaymentDrawer = ({ paymentRequest, name, description, amount, openDrawer, onCloseDrawerCallback, hasPaid }: PaymentDrawerProps) => {
    const btnRef = React.useRef(null);
    const navigate = useNavigate();

    const handleCopyClick = () => {
        navigator.clipboard.writeText(paymentRequest).then(
            (value) => {
                console.log(value);
            },
            () => {
                console.error('failed to copy');
            }
        );
    };

    return (
        <Box ref={btnRef}>
            <Drawer isOpen={openDrawer} placement='right' onClose={onCloseDrawerCallback} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Pay Invoice</DrawerHeader>
                    <DrawerBody>
                        <Box>
                            <>
                                {
                                    <Box width='250px' height='100%'>
                                        <QRCode height='100%' width='100%' value={paymentRequest} />
                                    </Box>
                                }
                                <Stack mt='24px' spacing='24px'>
                                    <HStack>
                                        <Input bgColor='#b3c6ff' color='black' placeholder={paymentRequest} disabled defaultValue={paymentRequest} />
                                        <CustomButton backgroundColor='#0000b3' onClick={handleCopyClick}>
                                            Copy
                                        </CustomButton>
                                    </HStack>
                                    <HStack justifyContent='space-between'>
                                        <Text>Status</Text>
                                        <Text fontWeight='600' color={hasPaid ? 'green' : 'orange'}>
                                            {hasPaid ? 'Paid' : 'Pending'}
                                        </Text>
                                    </HStack>
                                    <Stack justifyContent='space-between'>
                                        <Text>Amount</Text>
                                        <Text fontWeight='600'>{amount} sats</Text>
                                    </Stack>
                                    <Stack justifyContent='space-between'>
                                        <Text>Name</Text>
                                        <Text fontWeight='300'>{name}</Text>
                                    </Stack>
                                    <Stack justifyContent='space-between'>
                                        <Text>Description</Text>
                                        <Text fontWeight='300'>{description}</Text>
                                    </Stack>
                                </Stack>
                            </>
                        </Box>
                    </DrawerBody>

                    <DrawerFooter>
                        <HStack>
                            <CustomButton backgroundColor='transparent' border='1px solid #0000b3' color='black' onClick={onCloseDrawerCallback}>
                                Cancel
                            </CustomButton>
                            <CustomButton backgroundColor='#0000b3' onClick={() => navigate('/history')}>
                                Go to History
                            </CustomButton>
                        </HStack>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default PaymentDrawer;
