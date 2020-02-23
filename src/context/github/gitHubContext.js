/* eslint-disable no-console */
import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import { getTopRepos, getTotalStars, getLanguageData } from 'utils/getData';
import GitHubReducer from './gitHubReducer';
import {
    GET_USER,
    SET_USER_LOADING,
    GET_REPOS,
    SET_SORTED_REPOS,
    SET_REPOS_LOADING,
    SET_STATS,
    SET_STATS_LOADING,
    RESET_USER_STATE,
    SET_ERROR,
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
        sortedRepos: [],
        reposLoading: false,
        stats: {
            totalStars: 0,
            topRepos: [],
            languageData: [],
        },
        statsLoading: false,
        error: {
            active: false,
            type: null,
            message: '',
        },
    };

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

    const getUser = async username => {
        setLoading(SET_USER_LOADING);
        try {
            const res = await axios.get(
                `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`,
                { validateStatus: false }
            );

            if (res.status === 404) {
                setError(404, `User ${username} does not exist!`);
            } else if (res.status === 403) {
                setError(403, 'You"ve hit the GitHub api limit!');
            } else {
                resetError();
                dispatch({
                    type: GET_USER,
                    payload: res.data,
                });
            }
        } catch (error) {
            setError(400);
            console.error('Error:', error);
        }
    };

    const getRandomUser = async () => {
        setLoading(SET_USER_LOADING);
        try {
            const res = await axios.get(
                `https://api.github.com/search/users?q=repos:<=100+followers:>=5000&client_id=${githubClientId}&client_secret=${githubClientSecret}`,
                { validateStatus: false }
            );
            if (res.status === 404) {
                setError(404, `User can't be found!`);
            } else if (res.status === 403) {
                setError(403, 'You"ve hit the GitHub api limit!');
            } else {
                const randomUser = res.data.items[Math.floor(Math.random() * 30)];
                resetError();
                dispatch({
                    type: GET_USER,
                    payload: randomUser,
                });
                return randomUser;
            }
        } catch (error) {
            setError(400);
            console.error('Error:', error);
        }
    };

    const getRepos = async username => {
        setLoading(SET_REPOS_LOADING);

        try {
            const res = await axios.get(
                `https://api.github.com/users/${username}/repos?per_page=100&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
            );

            if (res.status === 404) {
                setError(404, `Repos not found for ${username}`);
            } else if (res.status === 403) {
                setError(403, 'You"ve hit the GitHub api limit!');
            } else {
                resetError();
                dispatch({
                    type: GET_REPOS,
                    payload: res.data,
                });
            }
        } catch (error) {
            setError(400);
            console.error('Error:', error);
        }
    };

    const setSortedRepos = (sortType = 'stars', limit = 21) => {
        const { repos, reposLoading, userLoading } = state;

        if (userLoading || reposLoading) return;

        const sortedRepos = getTopRepos(repos, sortType, limit);

        dispatch({
            type: SET_SORTED_REPOS,
            payload: sortedRepos,
        });
    };

    const setStats = () => {
        setLoading(SET_STATS_LOADING);

        const { repos, reposLoading, userLoading } = state;

        if (userLoading || reposLoading) return;

        const stats = {
            totalStars: getTotalStars(repos),
            topRepos: getTopRepos(repos, 'stars', 8),
            languageData: getLanguageData(repos),
        };
        dispatch({
            type: SET_STATS,
            payload: stats,
        });
    };

    const setLoading = type => dispatch({ type });

    const resetUserState = () => {
        dispatch({ type: RESET_USER_STATE });
    };

    const setError = (type = 400, message = 'Something went wrong. Please try again later!') => {
        dispatch({ type: SET_ERROR, payload: { active: true, type, message } });
    };

    const resetError = () => {
        dispatch({
            type: SET_ERROR,
            payload: {
                active: false,
                type: null,
                message: '',
            },
        });
    };

    return (
        <GitHubContext.Provider
            value={{
                user: state.user,
                userLoading: state.userLoading,
                repos: state.repos,
                sortedRepos: state.sortedRepos,
                reposLoading: state.reposLoading,
                stats: state.stats,
                error: state.error,
                getUser,
                getRandomUser,
                getRepos,
                setSortedRepos,
                setStats,
                setError,
                resetError,
                resetUserState,
            }}>
            {children}
        </GitHubContext.Provider>
    );
};
