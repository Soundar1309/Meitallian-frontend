import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import styled from "styled-components";

const StyledCarousel = styled(Carousel)`
  .carousel .slide img {
    display: block;
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  .carousel .control-arrow {
    display: none; /* Hide the next and prev buttons */
  }
  .carousel .control-dots {
    bottom: 1px; /* Position the dots 15px from the bottom */
    z-index: 1;
  }
  .carousel .control-dots .dot {
    background: #2a634e; 
    width: 5px;
    height: 5px;
    border-radius: 50%;
    display: inline-block;
    margin: 0 5px;
    transition: opacity 0.25s ease-in;
  }
  .carousel .control-dots .dot.selected {
    background: #2a634e;
    opacity: 1;
  }
`;

const Adplacement = () => {
  return (
    <div className="justify-center pt-10">
      <h2 className="title text-center">Special Offers</h2>
      <div className="pt-10">
        <StyledCarousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          interval={5000}
        >
          <div>
            <img
              src="https://via.placeholder.com/800x150?text=Ad+1"
              alt="Ad 1"
              className="w-full"
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/800x150?text=Ad+2"
              alt="Ad 2"
              className="w-full"
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/800x150?text=Ad+3"
              alt="Ad 3"
              className="w-full"
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/800x150?text=Ad+4"
              alt="Ad 4"
              className="w-full"
            />
          </div>
        </StyledCarousel>
      </div>
    </div>
  );
};

export default Adplacement;
