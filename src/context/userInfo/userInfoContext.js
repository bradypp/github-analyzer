import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import UserInfoReducer from './userInfoReducer';
import { SET_LOADING, GET_USER_INFO } from '../actionTypes';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

export const UserInfoContext = createContext();

export const UserInfoState = ({ children }) => {
    const initialState = {
        user: {},
        loading: false,
    };

    const [state, dispatch] = useReducer(UserInfoReducer, initialState);

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

    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <UserInfoContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                getUser,
            }}>
            {children}
        </UserInfoContext.Provider>
    );
};
