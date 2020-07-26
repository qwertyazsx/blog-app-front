import * as types from '../actions/types';
import { ActionTypes } from '../actions/index';

export type HeaderState = {
    isScrollUnderHeader: boolean;
};

const initalState: HeaderState = {
    isScrollUnderHeader: false,
};

const headerReducer = (state: HeaderState = initalState, action: ActionTypes): HeaderState => {
    switch (action.type) {
        case types.SCROLL_ABOVE_HEADER:
            return {
                ...state,
                isScrollUnderHeader: false,
            };
        case types.SCROLL_UNDER_HEADER:
            return {
                ...state,
                isScrollUnderHeader: true,
            };
        default:
            return state;
    }
};

export default headerReducer;
