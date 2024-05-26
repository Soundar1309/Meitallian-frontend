import React, { useState, useEffect } from 'react';

const PopupAd = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the popup ad when the component mounts
    setIsVisible(true);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full mx-4">
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-800"
            onClick={closePopup}
          >
            &times;
          </button>
          <img
            src="../images/1.jpg" 
            alt="Ad Image"
            className="w-full h-auto rounded-md mb-4"
          />
          <h2 className="text-2xl font-semibold mb-4">Special Offer!</h2>
          <p className="text-gray-700 mb-4">
            Get 20% off on your first order! Use code: FIRST20
          </p>
        </div>
      </div>
    )
  );
};

export default PopupAd;
