import * as types from '../actions/types';
import { ActionTypes } from '../actions/index';

export type SidebarState = {
    sidebarCollapsed: boolean;
};

const initalState: SidebarState = {
    sidebarCollapsed: true,
};

const sidebarReducer = (state: SidebarState = initalState, action: ActionTypes): SidebarState => {
    switch (action.type) {
        case types.OPEN_SIDEBAR:
            return {
                ...state,
                sidebarCollapsed: false,
            };
        case types.CLOSE_SIDEBAR:
            return {
                ...state,
                sidebarCollapsed: true,
            };
        default:
            return state;
    }
};

export default sidebarReducer;
