import React from 'react';
import Orgdata from '../../src/assets/Orgdata.png';

const Team = () => {
    return (
        <div className="p-4 md:p-8">
            <h2 className="font-bold text-4xl text-center mb-6">
                Our Teams
            </h2>
            <div className="flex flex-col md:flex-row gap-8 md:ml-16 text-justify items-center md:items-start">
                <p className="w-full md:w-1/2 mt-4 md:mt-16">
                    Promoters' skills, knowledge, and abilities are always essential to the success of any firm. Working
                    together would help us achieve our shared objective of providing high-quality food and services,
                    which would result in happy consumers. Our team would be in order to reach our joint objective of
                    guest satisfaction. At ME ITALIAN, our culinary philosophy revolves around the core principles of Italian gastronomy:
                    simplicity, quality, and tradition. Our expert chefs bring their passion for Italian cuisine and years of
                    experience to craft a menu that showcases Italy's rich and diverse culinary traditions. From classic
                    pasta dishes made with freshly prepared pasta to wood-fired pizzas with authentic Neapolitan crusts,
                    every dish at ME ITALIAN is a masterpiece that embodies the essence of Italy's culinary heritage.
                </p>
                <img src={Orgdata} alt="Organizational Data" className="w-full md:w-[550px] mt-4 md:mt-0" />
            </div>
        </div>
    );
};

export default Team;
