import React from 'react';
import PropTypes from 'prop-types';
import './ErrorStyles.scss';

const Error = ({ active, type, message }) => (
    <div className={`error-message ${active ? 'error-message--active' : ''}`}>
        {type === 403 ? (
            <p>
                Oh no, you've hit the GitHub api{' '}
                <a
                    href="https://developer.github.com/v3/rate_limit/"
                    target="_blank"
                    rel="noopener noreferrer">
                    rate limit
                </a>
                ! Please try again later.
            </p>
        ) : (
            <p>{message}</p>
        )}
    </div>
);

Error.defaultProps = {
    active: false,
    type: null,
    message: '',
};

Error.propTypes = {
    active: PropTypes.bool,
    type: PropTypes.string,
    message: PropTypes.string,
};

export default Error;
