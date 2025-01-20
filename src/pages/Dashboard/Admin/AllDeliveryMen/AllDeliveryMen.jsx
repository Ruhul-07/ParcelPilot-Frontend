import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxiosPublic from "../../../../hooks/useAxioxPublic";

const AllDeliveryMen = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const axiosPublic = useAxiosPublic();
    const fetchDeliveryMen = async () => {
      try {
        const response = await axiosPublic.get("/delivery-men");
        setDeliveryMen(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching delivery men:", error);
        setLoading(false);
      }
    };

    fetchDeliveryMen();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg my-5">
      <h2 className="text-2xl font-bold text-center mb-6">All Delivery Men</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Parcels Delivered</th>
            <th className="py-2 px-4 border-b">Average Review</th>
          </tr>
        </thead>
        <tbody>
          {deliveryMen.map((man, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{man.name}</td>
              <td className="py-2 px-4 border-b">{man.phoneNumber}</td>
              <td className="py-2 px-4 border-b">{man.parcelsDelivered}</td>
              <td className="py-2 px-4 border-b">{man.averageReview}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDeliveryMen;
