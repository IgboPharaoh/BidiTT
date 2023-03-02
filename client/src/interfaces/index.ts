import { ResponsiveObject, ResponsiveValue } from '@chakra-ui/react';
import React from 'react';
export interface TimeState {
    hours: number;
    min: number;
    sec: number;
}

export type InputProps = {
    labelName: string;
    placeholder: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    type: React.HTMLInputTypeAttribute;
};

export interface SelectPaymentInputProps {
    paymentImage: string;
    selected?: boolean;
    radioValue?: 'bitcoin' | 'lightning';
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickFlex: () => void;
    name: string;
    checked?: boolean;
    cardName: string;
}

export interface PaymentChoiceProps {
    selected: boolean;
    onNextCallback: () => void;
    onPreviousCallback: () => void;
}

export interface ItemInfoProps {
    createBidCallback: () => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    name: string;
    amount: number;
    description: string;
    error: string;
    isSending: boolean;
    paymentRequest: string;
}

export interface BindInfoObject {
    name: string;
    amount: number;
    description: string;
}

export interface CustomButtonProps {
    onClick: () => void;
    size?: string;
    disabled?: boolean;
    isLoading?: boolean;
    height?: string | number;
    borderRadius?: string | number;
    backgroundColor?: ResponsiveValue<string>;
    children?: React.ReactNode;
    rightIcon?: React.ReactSVGElement;
    leftIcon?: React.ReactSVGElement;
    p?: ResponsiveObject<string>;
    width?: ResponsiveObject<string>;
    fontSize?: ResponsiveObject<string>;
    border?: ResponsiveValue<string>;
    color?: ResponsiveValue<string>;
    
}

export interface Headerprops {
    historyColor?: string;
}

export interface PaymentDrawerProps {
    paymentRequest: string;
    name: string;
    description: string;
    amount: number;
    openDrawer: boolean;
    onCloseDrawerCallback: () => void;
    hasPaid: boolean;
}

export interface StepperProps {
    title: string;
    showStep?: boolean;
    stepBgColor?: ResponsiveValue<string>;
    completed?: boolean;
}

export interface Bid {
    id: number;
    time: number;
    name: string;
    hasPaid: boolean;
    amount: number;
    description: string;
}

export interface BindInfoObject {
    name: string;
    amount: number;
    description: string;
    isSending: boolean;
    error: string;
    paymentRequest: string;
    pendingBid: Bid;
}

export interface HistoryProps {
    paymentRequest?: string;
    name?: string;
    description?: string;
    amount?: number;
    openDrawer?: boolean;
    onCloseDrawerCallback?: () => void;
    hasPaid?: boolean;
}