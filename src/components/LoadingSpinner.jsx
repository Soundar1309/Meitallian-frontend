import React, { useState, useEffect } from "react";
import loadingSpinner from "../assets/spinner.png";
const LoadingSpinner = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return null; // Don't render the spinner when loading is complete
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-white bg-opacity-50">
      <div className="relative">
        <div className="animate-ping absolute inline-flex h-24 w-24">
          <img src={loadingSpinner} alt="loading_spinner" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
