import React from 'react';
import loadingSpinner from '../assets/spinner.png';

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-white bg-opacity-75">
      <div className="relative flex justify-center items-center">
        <img
          src={loadingSpinner}
          alt="Loading spinner"
          className="h-24 w-24 animate-spin"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
