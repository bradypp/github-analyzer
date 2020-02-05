import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import ReposReducer from './reposReducer';
import { SET_LOADING, GET_REPOS } from '../actionTypes';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

export const ReposContext = createContext();

export const ReposState = ({ children }) => {
    const initialState = {
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(ReposReducer, initialState);

    const getRepos = async username => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );
        dispatch({
            type: GET_REPOS,
            payload: res.data,
        });
    };

    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <ReposContext.Provider
            value={{
                repos: state.repos,
                loading: state.loading,
                getRepos,
            }}>
            {children}
        </ReposContext.Provider>
    );
};
