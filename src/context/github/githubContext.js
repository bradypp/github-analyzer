import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import GithubReducer from './githubReducer';
import { SET_LOADING, GET_USER, GET_REPOS } from '../actionTypes';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    // TODO: Add the variables to the server on deployment
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

export const GithubContext = createContext();

export const GithubState = ({ children }) => {
    const initialState = {
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Get User
    const getUser = async username => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );
        console.log(res);
        dispatch({
            type: GET_USER,
            payload: res.data,
        });
    };

    // Get Repos
    const getUserRepos = async username => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );

        dispatch({
            type: GET_REPOS,
            payload: res.data,
        });
    };

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <GithubContext.Provider
            value={{
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                getUser,
                getUserRepos,
            }}>
            {children}
        </GithubContext.Provider>
    );
};
