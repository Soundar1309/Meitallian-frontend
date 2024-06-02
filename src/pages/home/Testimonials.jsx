/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container bg-gray-50">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src="/images/home/testimonials/Chef.png" alt="" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Testimonials</p>
            <h2 className="title">What Our Customers Say About Us?</h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              “I had the pleasure of dining at meitalian italian restaurant last night, and I'm still
              raving about the experience! The attention to detail in
              presentation and service was impeccable.”
            </blockquote>
           
           {/* avater */}

           <div className="flex items-center gap-4 flex-wrap">
           <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12 cursor-pointer">
                  <img src="/images/home/testimonials/testimonial1.png" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12 cursor-pointer">
                  <img src="/images/home/testimonials/testimonial2.png" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12 cursor-pointer">
                  <img src="/images/home/testimonials/testimonial3.png" />
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <h5 className="text-lg font-semibold">Customer Feedback</h5>
              <div className="flex items-center gap-2"><FaStar className="text-yellow-400"/> <span className="font-medium">4.9</span> <span className="text-[#807E7E]">(Direct Review)</span></div>
            </div>
           </div>
           <div>
          <a href="http://">
          <button className=" inline-flex items-center justify-center px-6 py-4 mt-4 ml-20 mb-4 font-semibold text-white transition-all duration-300 bg-darkgreen rounded-md hover:bg-blue-700 focus:bg-blue-700">Give your Feedback</button>
          </a>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
