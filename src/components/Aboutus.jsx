/* eslint-disable react/no-unescaped-entities */
import React from "react";
import About1 from "../assets/about-us.jpg"
import About2 from "../assets/about-2.jpeg"

const Aboutus = () => {
  return (
    <section className="bg-white">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-8 mt-16 text-2xl tracking-tight font-extrabold text-gray-900">
            Where Passion Meets Authenticity in Italian Cuisine
          </h2>
          <p className="mb-4 text-justify text-[16px]">
            We live and breathe the art of Italian cooking. Our journey in the food industry has been one of dedication, driven by an unyielding passion for the rich and diverse flavours of Italian       cuisine. We are proud to introduce ME ITALIAN, a start-up <span className="font-bold text-black-70">QSR (Quick Service Restaurant)</span> located in the vibrant district of South Chennai, where our passion for food and commitment to delivering top-class Italian dining experiences come to life. 
            <br /> <br />
            Food is not just sustenance; its an art form. With ME ITALIAN,
            we aim to turn our culinary passion into a reality that enriches 
            the lives of our community. Italy's
            gastronomic traditions have always held a special place in our
            hearts, and we are dedicated to preserving the authenticity of
            Italian recipes while adding our unique twist to offer healthier
            alternatives.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-20">
          <img
            className="w-full rounded-lg"
            src={About1}
            alt="office content 1"
          />
          <img
            className="mt-4 w-full h-[350px] lg:mt-10 rounded-lg"
            src={About2}
            alt="office content 2"
          />
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
