import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../../components/Sidebar';
import { RootState } from '../reducers';
import { closeSidebar } from '../actions/Sidebar';

export const SidebarContainer = () => {
    const dispatch = useDispatch();
    const sidebarCollapsed = useSelector((state: RootState) => state.Sidebar.sidebarCollapsed);

    const onCloseSidebar = () => {
        dispatch(closeSidebar());
    };

    return <Sidebar closeSidebar={onCloseSidebar} sidebarCollapsed={sidebarCollapsed} />;
};
