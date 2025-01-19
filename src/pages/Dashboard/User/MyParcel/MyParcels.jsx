import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxioxPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Fetch parcels for the logged-in user
  const {
    data: parcels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/myParcels/${user?.email}`);
      console.log("API Response:", response.data); // Debugging
      return response.data;
    },
  });

  const [filter, setFilter] = useState("");

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredParcels = filter
    ? parcels.filter((parcel) => parcel.status === filter)
    : parcels;

  const handleCancel = async (parcelId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.patch(`/parcels/${parcelId}`, {
            status: "canceled",
          });

          if (response.status === 200) {
            Swal.fire(
              "Canceled!",
              "Your parcel has been canceled successfully.",
              "success"
            );
            // Refetch parcels or update state
          } else {
            Swal.fire("Error!", "Failed to cancel the parcel.", "error");
          }
        } catch (error) {
          console.error("Error canceling parcel:", error);
          Swal.fire(
            "Error!",
            "Something went wrong. Please try again.",
            "error"
          );
        }
      }
    });
  };

  const handleUpdate = (parcelId) => {
    Swal.fire({
      title: "Update Parcel",
      text: "Are you sure you want to update this booking?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to the update page
        navigate(`updateParcel/${parcelId}`);
      }
    });
  };

  if (isLoading) return <div>Loading parcels...</div>;
  if (isError) return <div>Error fetching parcels!</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold my-5 text-center">My Parcels</h2>

      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4">
        <label htmlFor="filter" className="mr-2 font-medium">Filter by Status:</label>
        <select
          id="filter"
          className="border rounded px-2 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="on the way">On the Way</option>
          <option value="delivered">Delivered</option>
          <option value="returned">Returned</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Parcel Type</th>
            <th className="border border-gray-300 px-4 py-2">Requested Date</th>
            <th className="border border-gray-300 px-4 py-2">Booking Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredParcels.length > 0 ? (
            filteredParcels.map((parcel) => (
              <tr key={parcel._id}>
                {/* Parcel Type */}
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.parcelType}
                </td>

                {/* Requested Delivery Date */}
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.requestedDate
                    ? new Date(parcel.requestedDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "Not Available"}
                </td>

                {/* Approximate Delivery Date */}
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.approximateDeliveryDate
                    ? new Date(
                        parcel.approximateDeliveryDate
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not Available"}
                </td>

                {/* Booking Date */}
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.bookingDate
                    ? new Date(parcel.bookingDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "Not Available"}
                </td>

                {/* Delivery Men ID */}
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.deliveryMenId || "Not Assigned"}
                </td>

                {/* Status */}
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.status}
                </td>

                {/* Actions */}
                <td className="border border-gray-300 px-4 py-2 space-y-2">
                  {/* Update Button */}
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded w-full"
                    disabled={parcel.status !== "pending"}
                    onClick={() => handleUpdate(parcel._id)}
                  >
                    Update
                  </button>

                  {/* Cancel Button */}
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded w-full"
                    disabled={parcel.status !== "pending"}
                    onClick={() => handleCancel(parcel._id)}
                  >
                    Cancel
                  </button>

                  {/* Review Button */}
                  {parcel.status === "delivered" && (
                    <button className="bg-green-500 text-white px-4 py-1 rounded w-full">
                      Review
                    </button>
                  )}

                  {/* Pay Button */}
                  <button className="bg-purple-500 text-white px-4 py-1 rounded w-full">
                    Pay
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No parcels found
              </td>
            </tr>
          )}
        </tbody>

        {/* <tbody>
          {parcels.length > 0 ? (
            parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.parcelType}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.requestedDate
                    ? new Date(parcel.requestedDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "Booking Date Not Available"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.bookingDate
                    ? new Date(parcel.bookingDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true, // For AM/PM format
                      })
                    : "Date & Time Not Available"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded"
                    disabled={parcel.status !== "pending"}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No parcels found
              </td>
            </tr>
          )}
        </tbody> */}
      </table>
    </div>
  );
};

export default MyParcels;
