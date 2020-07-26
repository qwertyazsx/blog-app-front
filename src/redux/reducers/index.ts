import { combineReducers } from 'redux';
import Sidebar, { SidebarState } from './Sidebar';
import Header, { HeaderState } from './Header';

export type RootState = {
    Sidebar: SidebarState;
    Header: HeaderState;
};

const rootReducer = combineReducers({
    Sidebar,
    Header,
});

export default rootReducer;
