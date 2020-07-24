import React from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { openSidebar } from '../actions/Header';

export const HeaderContainer = () => {
    const dispatch = useDispatch();

    const onOpenSidebar = () => {
        dispatch(openSidebar());
    };

    return <Header openSidebar={onOpenSidebar} />;
};
