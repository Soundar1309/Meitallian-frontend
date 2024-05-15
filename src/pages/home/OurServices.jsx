import React from "react";

const serviceLists = [
    {id:1, title: "Dine-In Experience", des: "Experience authentic Italian cuisine and warm hospitality at our dine-in restaurant. Indulge in a delectable array of classic dishes straight from Italy.", img: "/images/home/services/dine-in.png"},
    {id:2, title: "Takeaway & Delivery", des: "Can't make it to our restaurant? No problem! Enjoy the taste of Italy in the comfort of your own home with our convenient takeaway and delivery options.", img: "/images/home/services/take-away.png"},
    {id:3, title: "Private Events", des: " Let us make your event unforgettable! From birthdays to corporate gatherings, we specialize in creating tailored menus and ambiance for any occasion.", img: "/images/home/services/party.png"},
    {id:4, title: "Catering Services", des: "Hosting a big event? Leave the catering to us! From weddings to corporate luncheons, our skilled team crafts personalized menus to wow your guests and suit your budget.", img: "/images/home/services/catering.png"},
]

const OurServices = () => {
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Culinary Journey And Services</h2>
            <p className="my-5 text-secondary leading-[30px]">
                Me Italian is not just a restaurant; it's the culmination of an enduring passion for bringing authentic Italian flavors to every corner of Chennai.Born out of a love 
            </p>
            <p className="-mt-4 mb-5 text-sm text-[#0000FF] cursor-pointer">Read more...</p>

            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              <a href="/#/about">Explore</a>
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className="h-62 shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200">
                            <img src={service.img} alt="" className="w-16 mx-auto"/>
                            <h5 className="pt-3 font-bold text-lg text-darkgreen"> {service.title}</h5>
                            <p className="text-black text-justify text-[14px]">{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
