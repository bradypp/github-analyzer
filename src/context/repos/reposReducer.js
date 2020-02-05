import { GET_REPOS, SET_LOADING } from '../actionTypes';

export default (state, { type, payload }) => {
    switch (type) {
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
