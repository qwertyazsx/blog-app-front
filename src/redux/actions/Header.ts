import * as types from './types';

export type OpenSidebarAction = {
    type: typeof types.OPEN_SIDEBAR;
};

export const openSidebar = (): OpenSidebarAction => ({
    type: types.OPEN_SIDEBAR,
});

export type HeaderActionTypes = OpenSidebarAction;
