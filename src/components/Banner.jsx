/* eslint-disable react/no-unescaped-entities */
import React from "react";
import bannerImg from "/images/home/banner.png";
import { useTheme } from "../hooks/ThemeContext";
import { Navigate } from "react-router-dom";

const Banner = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%`}>
      <div className={`py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8 `}>

        {/* img */}
        <div className="md:w-1/2">
          <img src={bannerImg} alt="" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            <div className="bg-white px-2 py-2 rounded-2xl flex items-center gap-3 shadow-sm w-64">
              <img src="/images/home/b-food1.jpg" alt=""  className="rounded-2xl object-cover w-[6.5rem] h-[6.4rem]"/>
              <div className="space-y-1">
                <a href="/menu"><h5>Pizza Rustica</h5></a>
                <div className="rating rating-sm">
              
                <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                    checked
                    disabled
                  />
                <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                    checked
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                    disabled
                    checked
                  />
                
                </div>
                <p className="text-red">Rs.295.00</p>
              </div>
            </div>
            <div className="bg-white px-3 py-2 rounded-2xl md:flex items-center gap-3 shadow-sm w-64 hidden">
              <img src="/images/home/b-food2.jpg" alt=""  className="rounded-2xl object-cover w-[6.5rem] h-[6.4rem]"/>
              <div className="space-y-1">
                <a href="/menu"><h5>Spicy Arrabiata  </h5></a>
                <div className="rating rating-sm disabled">
                <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                    disabled
                  />
                <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                    disabled
                  />
                
                </div>
                <p className="text-red">Rs.195.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-7">
        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Dive into Delights Of Delectable <span className="text-green">Food</span>
          </h2>
          <p className="text-[#4A4A4A] text-xl">
          Indulge in the savory delights of Italian cuisine, where each dish is a celebration of tradition and taste. From handmade pasta to tantalizing sauces, experience the artistry of Italy's culinary heritage. Buon appetito!
          </p>
          <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
            <a href="/menu">Order Now</a>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Banner;
