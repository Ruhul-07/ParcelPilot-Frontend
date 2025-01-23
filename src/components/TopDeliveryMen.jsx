import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxioxPublic";
import { useQuery } from "@tanstack/react-query";

const TopDeliveryMen = () => {
  const defaultProfileImg = "./../../public/default_img.jpg";
  const axiosPublic = useAxiosPublic();


  const { isLoading, error, data: topMen = [] } = useQuery({
    queryKey: ["topMen"],
    queryFn: async () => {
        const res = await axiosPublic.get('/top-delivery-men');
        return res.data;
    }
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  return (
    <section className="mt-12 mb-10">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Top Delivery Men
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topMen.map((deliveryMan, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 max-w-xs"
          >
            <img
              src={topMen.profileImg || defaultProfileImg}
              alt={deliveryMan.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center">
              {topMen.name}
            </h3>
            <p className="text-center mt-2">
              <span className="font-semibold">Parcels Delivered:</span>{" "}
              {topMen.parcelsDelivered}
            </p>
            <p className="text-center mt-2">
              <span className="font-semibold">Average Rating:</span>{" "}
              {topMen.averageReview} / 5
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDeliveryMen;
