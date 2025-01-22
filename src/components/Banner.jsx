import React, { useState } from "react";

const Banner = () => {
  const [searchText, setSearchText] = useState("");

  // Update state when input changes
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div
      className="relative w-full h-96 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/rHrrHqW/grab-w-M50-YUQ3-Dyc-unsplash.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl font-bold mb-4">
          Seamless Parcel Booking for All Your Delivery Needs
        </h1>
        <p className="text-lg mb-6">
          Effortlessly book and track your parcels for delivery anywhere,
          anytime.
        </p>
        <div className="w-2/3 sm:w-1/2 md:w-1/3 p-2 bg-white rounded-full">
          {/* <input
            type="text"
            placeholder="Search for parcels, destinations, or services"
            className="w-full p-3 rounded-full border focus:outline-none"
          /> */}
          <input
            type="text"
            placeholder="Search for parcels, destinations, or services"
            className="w-full p-3 rounded-full border text-black outline-none text-center"
            value={searchText} // Bind input to state
            onChange={handleInputChange} // Update state on change
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
