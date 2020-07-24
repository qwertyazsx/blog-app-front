import { combineReducers } from 'redux';
import Sidebar, { SidebarState } from './Sidebar';

export type RootState = {
    Sidebar: SidebarState;
};

const rootReducer = combineReducers({
    Sidebar,
});

export default rootReducer;
