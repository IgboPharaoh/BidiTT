import React, { useCallback, useState } from 'react';

import { Box, Stack, Text } from '@chakra-ui/react';
import Header from '../components/Header';
import Stepper from '../components/Stepper';
import ItemInfo from '../components/ItemInfo';
import api from '../api/api';
import PaymentDrawer from 'src/components/PaymentDrawer';
import { BindInfoObject } from 'src/interfaces';

const CreateBid = (): JSX.Element => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [bidInfo, setBidInfo] = useState<BindInfoObject>({
        name: '',
        amount: 0,
        description: '',
        isSending: false,
        error: '',
        paymentRequest: '',
        pendingBid: { id: 0, name: '', hasPaid: false, amount: 0, time: 0, description: '' },
    });

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            e.preventDefault();

            setBidInfo((bidInfo) => ({ ...bidInfo, [e.target.name]: e.target.value }));
        },
        [bidInfo]
    );

    const createBid = () => {
        const { name, amount, description } = bidInfo;
        if (!name || !description) {
            setBidInfo({ ...bidInfo, error: 'Name or description of bid cannot be empty' });
            return;
        }
        if (!amount) {
            setBidInfo({ ...bidInfo, error: 'No Amount! you need to place a value on your bid' });
            return;
        }

        setBidInfo({ ...bidInfo, isSending: true, error: '' });
        console.log('details:', name, amount, description);

        api.submitNewBid(name, description, amount)
            .then((bid) => {
                setBidInfo({ ...bidInfo, pendingBid: bid.bid, paymentRequest: bid.paymentRequest, isSending: false });
                console.log('bid:', bid);
            })
            .catch((error) => {
                console.log(error);
                setBidInfo({ ...bidInfo, error: error.message, isSending: false });
            });

        setBidInfo({ ...bidInfo, name: '', amount: 0, description: '' });
        setShowDrawer(true);
    };

    const _generateNewLightningAddr = async () => {
        const address = await api.getAddress().then((address) => {
            setNewAddress(address);
        });

        return address;
    };

    return (
        <Box pt='16px'>
            <Header />
            <Box m='12px 80px 0px 80px'>
                <Text fontSize='36px' fontWeight='500'>
                    Create a Bid
                </Text>
                <Text fontWeight='300' fontSize='15px'>
                    Fill in the necessary information to join the marketplace with your product
                </Text>
            </Box>
            <Box gap='300px' alignItems='flex-start' display='flex' justifyContent='space-between' width='fit-content' m='24px 80px 0px 80px'>
                <Stack spacing='32px'>
                    <Stepper title='Create a bid' />
                    <Stepper title='Choose payment method' />
                    <Stepper completed={false} stepBgColor='#0000b3' title='Complete payment method' />
                    <Stepper completed={false} stepBgColor='#0000b3' title='View transaction status' showStep={false} />
                </Stack>
                <Box boxShadow='rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' p='32px' borderRadius='4px'>
                    {/* step one in creating a bid */}
                    <ItemInfo handleInputChange={handleInputChange} {...bidInfo} createBidCallback={createBid} />

                    <PaymentDrawer
                        {...bidInfo}
                        openDrawer={showDrawer}
                        onCloseDrawerCallback={() => setShowDrawer(false)}
                        hasPaid={bidInfo.pendingBid.hasPaid}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default CreateBid;
