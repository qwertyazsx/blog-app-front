import * as types from './types';

export type CloseSidebarAction = {
    type: typeof types.CLOSE_SIDEBAR;
};

export const closeSidebar = (): CloseSidebarAction => ({
    type: types.CLOSE_SIDEBAR,
});

export type SidebarActionTypes = CloseSidebarAction;
