import * as types from './types';

export type ScrollAboveHeaderAction = {
    type: typeof types.SCROLL_ABOVE_HEADER;
};

export type ScrollUnderHeaderAction = {
    type: typeof types.SCROLL_UNDER_HEADER;
};

export const scrollAboveHeader = (): ScrollAboveHeaderAction => ({
    type: types.SCROLL_ABOVE_HEADER,
});

export const scrollUnderHeader = (): ScrollUnderHeaderAction => ({
    type: types.SCROLL_UNDER_HEADER,
});

export type AppActionTypes = ScrollAboveHeaderAction | ScrollUnderHeaderAction;
