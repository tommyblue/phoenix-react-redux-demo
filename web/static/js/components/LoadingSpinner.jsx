import React, { PropTypes } from 'react';

const LoadingSpinner = ({ isLoading }) => (
  <div className="content">
    <strong>Status:</strong> {isLoading ? 'Loading...' : 'Synced'}
  </div>
);

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingSpinner;
