import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar } from '../../components/Sidebar';
import { RootState } from '../reducers';
import { closeSidebar } from '../actions/Sidebar';

export const SidebarContainer = () => {
    const sidebarCollapsed = useSelector((state: RootState) => state.Sidebar.sidebarCollapsed);
    const dispatch = useDispatch();

    const onCloseSidebar = () => {
        dispatch(closeSidebar());
    };

    return <Sidebar closeSidebar={onCloseSidebar} sidebarCollapsed={sidebarCollapsed} />;
};
