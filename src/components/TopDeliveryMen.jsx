import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxioxPublic";

const TopDeliveryMen = () => {
  const defaultProfileImg = "./../../public/default_img.jpg";
  const [topDeliveryMen, setTopDeliveryMen] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchTopDeliveryMen = async () => {
      try {
        const response = await axiosPublic.get("/top-delivery-men");
        setTopDeliveryMen(response.data); // Store the top delivery men data
      } catch (error) {
        console.error("Error fetching top delivery men:", error);
      }
    };
    fetchTopDeliveryMen();
  }, []);

  return (
    <section className="mt-12 mb-10">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Top Delivery Men
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topDeliveryMen.map((deliveryMan, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 max-w-xs"
          >
            <img
              src={deliveryMan.profileImg || defaultProfileImg}
              alt={deliveryMan.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center">
              {deliveryMan.name}
            </h3>
            <p className="text-center mt-2">
              <span className="font-semibold">Parcels Delivered:</span>{" "}
              {deliveryMan.parcelsDelivered}
            </p>
            <p className="text-center mt-2">
              <span className="font-semibold">Average Rating:</span>{" "}
              {deliveryMan.averageReview} / 5
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDeliveryMen;
