import React from 'react';
import loadingSpinner from '../assets/spinner.png';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner-container">
        <img
          src={loadingSpinner}
          alt="Loading spinner"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
