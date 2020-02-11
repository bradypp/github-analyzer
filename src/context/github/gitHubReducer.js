import {
    GET_USER,
    SET_USER_LOADING,
    GET_REPOS,
    SET_REPOS_LOADING,
    GET_STATS,
    SET_STATS_LOADING,
} from '../actionTypes';

export default (state, { type, payload }) => {
    switch (type) {
        case GET_USER:
            return {
                ...state,
                user: payload,
                userLoading: false,
            };
        case SET_USER_LOADING:
            return {
                ...state,
                userLoading: true,
            };
        case GET_REPOS: {
            return {
                ...state,
                repos: payload,
                reposLoading: false,
            };
        }
        case SET_REPOS_LOADING:
            return {
                ...state,
                reposLoading: true,
            };
        case GET_STATS: {
            return {
                ...state,
                stats: payload,
                statsLoading: false,
            };
        }
        case SET_STATS_LOADING:
            return {
                ...state,
                statsLoading: true,
            };
        default:
            return state;
    }
};
