import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import GitHubReducer from './gitHubReducer';
import { SET_LOADING, GET_USER_INFO, GET_REPOS } from '../actionTypes';

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
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

    const getUser = async username => {
        setLoading();
        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );

        dispatch({
            type: GET_USER_INFO,
            payload: res.data,
        });
    };

    const getRepos = async username => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );
        dispatch({
            type: GET_REPOS,
            payload: res.data,
        });
    };

    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <GitHubContext.Provider
            value={{
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                getUser,
                getRepos,
            }}>
            {children}
        </GitHubContext.Provider>
    );
};
