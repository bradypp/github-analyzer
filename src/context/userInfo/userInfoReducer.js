import { SET_LOADING, GET_USER_INFO } from '../actionTypes';

export default (state, { type, payload }) => {
    switch (type) {
        case GET_USER_INFO:
            return {
                ...state,
                user: payload,
                loading: false,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
