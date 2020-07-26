import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { RootState } from '../reducers';
import { openSidebar } from '../actions/Header';

export const HeaderContainer = () => {
    const dispatch = useDispatch();
    const isScrollUnderHeader = useSelector((state: RootState) => state.Header.isScrollUnderHeader);

    const onOpenSidebar = () => {
        dispatch(openSidebar());
    };

    return <Header isScrollUnderHeader={isScrollUnderHeader} openSidebar={onOpenSidebar} />;
};
