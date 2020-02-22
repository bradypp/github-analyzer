import {
    GET_USER,
    SET_USER_LOADING,
    GET_REPOS,
    SET_SORTED_REPOS,
    SET_REPOS_LOADING,
    SET_STATS,
    SET_STATS_LOADING,
    RESET_STATE,
    SET_ERROR,
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
        case SET_SORTED_REPOS:
            return {
                ...state,
                sortedRepos: payload,
            };
        case SET_STATS: {
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
        case RESET_STATE:
            return {
                ...state,
                state: payload,
            };
        case SET_ERROR:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
};
