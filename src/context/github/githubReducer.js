import { SET_LOADING, GET_USER, GET_REPOS } from '../actionTypes';

export default (state, { type, payload }) => {
    switch (type) {
        case GET_USER:
            return {
                ...state,
                user: payload,
                loading: false,
            };
        case GET_REPOS: {
            return {
                ...state,
                repos: payload,
                loading: false,
            };
        }
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
