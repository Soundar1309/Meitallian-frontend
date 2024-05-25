import React from 'react'
import aboutusImg from "../assets/Story.jpeg";

const serviceLists = [
    {id:1, title: "Dine-In Experience", des: "Experience authentic Italian cuisine and warm hospitality at our dine-in restaurant. Indulge in a delectable array of classic dishes straight from Italy.", img: "/images/home/services/dine-in.png"},
    {id:2, title: "Takeaway & Delivery", des: "Can't make it to our restaurant? No problem! Enjoy the taste of Italy in the comfort of your own home with our convenient takeaway and delivery options.", img: "/images/home/services/take-away.png"},
    {id:3, title: "Private Events", des: " Let us make your event unforgettable! From birthdays to corporate gatherings, we specialize in creating tailored menus and ambiance for any occasion.", img: "/images/home/services/party.png"},
    {id:4, title: "Catering Services", des: "Hosting a big event? Leave the catering to us! From weddings to corporate luncheons, our skilled team crafts personalized menus to wow your guests and suit your budget.", img: "/images/home/services/catering.png"},
]

const Ourservices = () => {
    return (
        <div className="p-3 pt-20 sm:px-10 md:px-4 lg:px-6 xl:px-20 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x lg:space-x-6 2xl:space-x-24">
        <div className="w-full">
          <h2 className="font-bold text-center text-3xl mb-10 -mt-36">Our Services</h2>
          <div className="flex flex-wrap gap-8 justify-center items-center">
            {serviceLists.map((service) => (
              <div
                key={service.id}
                className="w-full sm:w-[45%] lg:w-[30%] xl:w-[22%] h-auto shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200"
              >
                <img src={service.img} alt="" className="w-16 mx-auto" />
                <h5 className="pt-3 font-bold text-lg text-darkgreen">{service.title}</h5>
                <p className="text-black text-justify text-[14px]">{service.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>     
      
    )
}

export default Ourservices