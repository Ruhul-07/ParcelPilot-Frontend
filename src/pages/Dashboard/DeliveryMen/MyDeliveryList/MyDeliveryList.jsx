import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxioxPublic";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      // Get the delivery man's ID based on their email
      const res = await axiosPublic.get(`/users/${user?.email}`);
      const deliveryManId = res.data._id;
      // console.log(deliveryManId)
      // Fetch the parcels assigned to the delivery man
      const deliveries = await axiosPublic.get(
        `/parcels/delivery-man/${deliveryManId}`
      );
      // console.log(deliveries.data.deliveryManId);
      return deliveries.data; // We assume this is the array of parcels
    },
    enabled: !!user?.email, // Only run the query if user is authenticated
  });

  const updateParcelStatus = async (id, status) => {

    const { isConfirmed } = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to mark this parcel as ${status}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel',
    });
    if (!isConfirmed) return;


    try {
      await axiosPublic.patch(`/parcels/${id}`, { status });
      Swal.fire('Updated!', 'The parcel status has been updated.', 'success');
    } catch (error) {
      console.error(`Error updating parcel status to ${status}:`, error);
      Swal.fire('Error!', 'There was an issue updating the parcel status.', 'error');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading parcels: {error.message}</div>;

  // Check if the data is an array before rendering
  if (!Array.isArray(data)) {
    return <div>No parcels found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Delivery List</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                Booked User’s Name
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Receiver’s Name
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Booked User’s Phone
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Requested Delivery Date
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Approx. Delivery Date
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Receiver’s Phone
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Receiver’s Address
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.booksUsersName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.receiverName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.phoneNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(parcel.requestedDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(
                    parcel.approximateDeliveryDate
                  ).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.receiverPhone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.deliveryAddress}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => updateParcelStatus(parcel._id, "Cancelled")}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => updateParcelStatus(parcel._id, "Delivered")}
                  >
                    Deliver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveryList;