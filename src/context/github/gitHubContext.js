import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import GitHubReducer from './gitHubReducer';
import {
    GET_USER,
    SET_USER_LOADING,
    GET_REPOS,
    SET_REPOS_LOADING,
    GET_STATS,
    SET_STATS_LOADING,
} from '../actionTypes';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

export const GitHubContext = createContext();

export const GitHubState = ({ children }) => {
    const initialState = {
        user: {},
        userLoading: false,
        repos: [],
        reposLoading: false,
        stats: [],
        statsLoading: false,
    };

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

    const getUser = async username => {
        setLoading(SET_USER_LOADING);
        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );

        dispatch({
            type: GET_USER,
            payload: res.data,
        });
    };

    const getRepos = async username => {
        setLoading(SET_REPOS_LOADING);

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );

        dispatch({
            type: GET_REPOS,
            payload: res.data,
        });
    };

    const getStats = () => {
        setLoading(SET_STATS_LOADING);
        // const user = new GhPolyglot(username);
        // user.userStats((err, stats) => {
        //     if (err) {
        //         console.log('Error:', err);
        //     }
        // });
        const stars = Intl.NumberFormat().format(
            state.repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
        );

        dispatch({
            type: GET_STATS,
            payload: { stars },
        });
    };

    const setLoading = type => {
        if (type === SET_USER_LOADING) {
            dispatch({ type });
        } else if (type === SET_REPOS_LOADING) {
            dispatch({ type });
        } else if (type === SET_STATS_LOADING) {
            dispatch({ type });
        }
    };

    return (
        <GitHubContext.Provider
            value={{
                user: state.user,
                userLoading: state.userLoading,
                repos: state.repos,
                reposLoading: state.reposLoading,
                stats: state.stats,
                statsLoading: state.stats,
                getUser,
                getRepos,
                getStats,
            }}>
            {children}
        </GitHubContext.Provider>
    );
};
