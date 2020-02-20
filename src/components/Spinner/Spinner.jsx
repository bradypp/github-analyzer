import React from 'react';
import PropTypes from 'prop-types';
import './SpinnerStyles.scss';

const Spinner = ({ overlayActive, size, color }) => (
    <div className={`${overlayActive && 'spinner-overlay'}`}>
        <div
            className={`spinner ${size === 'small' && 'spinner--medium'} ${color === 'white' &&
                'spinner--white'}`}
        />
    </div>
);

Spinner.defaultProps = {
    overlayActive: true,
    size: 'default',
    color: 'default',
};

Spinner.propTypes = {
    overlayActive: PropTypes.bool,
    size: PropTypes.string,
    color: PropTypes.string,
};

export default Spinner;
