/* eslint-disable camelcase */
import React, { useEffect, useContext } from 'react';
// import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Octicon from '@primer/octicons-react';
import { GitHubContext } from 'context';
import { Spinner } from 'components';
import './StatsStyles.scss';

const Stats = ({ match }) => {
    const gitHubContext = useContext(GitHubContext);
    const { loading } = gitHubContext;

    // useEffect(() => {
    //     getStats(match.params.login);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [match.params.login]);

    return <div className="stats">{loading ? <Spinner /> : <p>Stats</p>}</div>;
};

export default Stats;
