import React from "react";
import ceoImg from "../assets/ceo.png";

const Aboutceo = () => {
  return (
    <div className=" bg-white py-14 px-5 sm:px-12 md:px-16 lg:px-24 xl:px-44 2xl:px-52 grid md:grid-cols-5 items-center gap-5 sm:gap-10 lg:gap-24">
      <div className=" md:col-span-2 flex items-center justify-center md:justify-start">
        <img
          src={ceoImg}
          alt="PRINCE PANDIAN"
          className=" w-80 h-[400px] object-cover rounded-lg"
        />
      </div>
      <div className=" md:col-span-3 flex flex-col items-center justify-center">
        <div>
          <h4 className="text-stone-400 mb-3 font-KaushanScript">“Italian cuisine is more than just food; it’s a celebration of life.”</h4>
          <p className="text-base text-justify text-stone-600">
            ME ITALIAN is a tribute to my enduring passion for rich Italian culinary heritage and the art of pizza making, where every dish is a masterpiece crafted with passion, love, and tradition. Our commitment to the excellence of authentic Italian cuisine shines through from the very first bite to the very last. I welcome you to enjoy the authentic richness of Italian flavours.
          </p>
          <h1 className="text-xl mt-4 text-stone-800 font-bold text-right">
            PRINCE PANDIAN
          </h1>
          <p className=" text-stone-500 text-right text-sm">FOUNDER, ME ITALLIAN</p>
        </div>
      </div>
    </div>
  );
};

export default Aboutceo;
