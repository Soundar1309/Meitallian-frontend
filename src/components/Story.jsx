/* eslint-disable react/no-unescaped-entities */
import React from "react";
import aboutusImg from "../assets/Story.jpeg";

const Story = () => {
  return (
    <div className="bg-white p-3 pt-16 sm:px-10 md:px-4 lg:px-6 xl:px-20 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x lg:space-x-6 2xl:space-x-24">
  <div className="flex-1 lg:py-4 xl:py-24">
    <h1 className="text-lg mt-5 xl:text-2xl font-semibold text-gray-800 mb-2 md:mb-6 lg:mb-4 xl:mb-6">
      Our Story
    </h1>
    <div className="mx-2 flex flex-col gap-3 text-gray-600 text-sm lg:text-base text-justify">
      <p>
        "Me Italian" is not just a restaurant; it's the culmination of an enduring passion for bringing authentic Italian flavors to every corner of Chennai. Born out of a love for Italian cuisine and a desire to share it with the world, our startup is a testament to the power of dedication and the pursuit of culinary excellence.
      </p>
      <p>
        Our journey began with a dream: to recreate the taste of Italy in the heart of South Chennai. Drawing inspiration from the bustling food scene of the city and the vibrant culinary traditions of Italy, we set out to create a dining experience that would transport diners to the sun-kissed shores of the Mediterranean with every bite.
      </p>
      <p>
        Located in a vibrant food street, "Me Italian" is more than just a restaurant—it's a destination for food lovers seeking an authentic taste of Italy. Here, amidst the hustle and bustle of the city, diners can escape to a world of rustic charm and Italian hospitality, where every dish tells a story and every meal is a celebration of flavor.
      </p>
      <p>
        But our journey doesn't end with our location. It extends to every dish we serve, every ingredient we use, and every customer we serve. We believe that good food has the power to bring people together, to create memories, and to forge connections that last a lifetime. That's why we pour our hearts and souls into every dish we prepare, ensuring that each bite is a true taste of Italy.
      </p>
      <p>
        So whether you're craving a classic Margherita pizza, a hearty bowl of spaghetti Bolognese, or a creamy tiramisu that transports you to the streets of Rome, "Me Italian" is here to satisfy your cravings and indulge your senses. Join us on this culinary adventure as we bring the flavors of Italy to South Chennai, one delicious dish at a time.
      </p>
    </div>
  </div>
  <div className="flex-1 pt-4 md:pt-0">
    <div className="rounded-lg">
      <img className="h-auto w-full md:h-[500px] md:w-[620px] rounded-md" src={aboutusImg} alt="About Us" />
    </div>
  </div>
</div>
  );
};

export default Story;
