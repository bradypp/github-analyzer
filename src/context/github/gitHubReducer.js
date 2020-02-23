import {
    GET_USER,
    SET_USER_LOADING,
    GET_REPOS,
    SET_SORTED_REPOS,
    SET_REPOS_LOADING,
    SET_STATS,
    SET_STATS_LOADING,
    SET_ERROR,
    RESET_USER_STATE,
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
        case SET_ERROR:
            return {
                ...state,
                error: payload,
            };
        case RESET_USER_STATE:
            return {
                ...state,
                user: {},
                repos: [],
                sortedRepos: [],
                stats: {
                    totalStars: 0,
                    topRepos: [],
                    biggestRepos: [],
                    languageData: [],
                },
            };
        default:
            return state;
    }
};
