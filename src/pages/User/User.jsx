import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { GitHubContext } from 'context';
import { UserInfo, Repos, Stats, Header, Footer } from 'components';
import './UserStyles.scss';

const User = () => {
    const { user } = useContext(GitHubContext);
    return (
        <>
            <Helmet>
                <title>{`GitHub Analyzer${user.login ? ` | ${user.login}` : ''}`}</title>
            </Helmet>
            <Header />
            <div className="user user__section-1">
                <UserInfo />
                <Stats />
            </div>

            <div className="user user__section-2">
                <Repos />
            </div>
            <div className="user__footer">
                <Footer />
            </div>
        </>
    );
};

export default User;
