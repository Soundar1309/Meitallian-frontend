import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import styled from "styled-components";
import Ad1 from '../assets/Ad/1.png'
import Ad2 from '../assets/Ad/2.png'
import Ad3 from '../assets/Ad/3.png'
import Ad4 from '../assets/Ad/4.png'

const StyledCarousel = styled(Carousel)`
  .carousel .slide img {
    display: block;
    width: 100%;
    height: 250px;
    object-fit: contain;
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
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
    margin: 0 5px;
    transition: opacity 0.25s ease-in;
  }
  .carousel .control-dots .dot.selected {
    background: #ffff;
    opacity: 1;
  }
`;

const Adplacement = () => {
  return (
    <div className="justify-center pt-10 mb-8">
      <h2 className="title text-center">Special Offer</h2>
      <div className="pt-5">
        <StyledCarousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          interval={4000}
        >
          <div>
            <img
              src={Ad1}
              alt="Ad 1"
              className="w-full"
            />
          </div>
          <div>
            <img
              src={Ad2}
              alt="Ad 2"
              className="w-full"
            />
          </div>
          <div>
            <img
              src={Ad3}
              alt="Ad 3"
              className="w-full"
            />
          </div>
          <div>
            <img
              src={Ad4}
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
