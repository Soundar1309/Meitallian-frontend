import React, { useState, useEffect } from 'react';
import Ad5 from "../assets/Ad/5.jpg"

const PopupAd = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown less than 3 times
    const popupCount = parseInt(localStorage.getItem('popupCount') || '0', 10);
    if (popupCount < 3) {
      // Show the popup ad after a 3-second delay
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem('popupCount', (popupCount + 1).toString());
      }, 5000);

      // Cleanup the timer if the component unmounts before the delay
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-lg w-full h-[95%] mx-4">
          <button
            className="absolute top-0 right-3 text-[30px] mt-2 mr-2 text-black hover:text-gray-800"
            onClick={closePopup} 
          >
            &times;
          </button>
          <img
            src={Ad5}
            alt="Ad Image"
            className="w-full h-[85%] rounded-md mb-4 object-contain"
          />
          <h2 className="text-xl font-bold mb-2">Special Offer!</h2>
          <p className="text-gray-700 mb-2">
            Get <b>40%</b>off on all type of pizza orders!
          </p>
        </div>
      </div>
    )
  );
};

export default PopupAd;
