import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxioxPublic";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [approximateDeliveryDate, setApproximateDeliveryDate] = useState(today);
  const [loading, setLoading] = useState(false); // To manage loading state
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  // Fetch parcels
  const fetchParcels = async () => {
    setLoading(true);
    try {
      const { data } = await axiosSecure.get("/parcels");
      setParcels(data);
    } catch (error) {
      console.error("Error fetching parcels:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveryMen = async () => {
    setLoading(true);
    try {
      const { data } = await axiosSecure.get("/users");
      const deliveryMenData = data.users.filter(
        (user) => user.role === "deliveryMan"
      );
      // console.log("Filtered Delivery Men Data:", deliveryMenData);
      setDeliveryMen(deliveryMenData);
    } catch (error) {
      console.error("Error fetching delivery men:", error);
    } finally {
      setLoading(false);
    }
  };

  const assignParcel = async () => {
    if (!selectedDeliveryMan || !approximateDeliveryDate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a delivery man and date.",
      });
      return;
    }

    try {
      await axiosPublic.patch(`/parcels/${selectedParcel._id}`, {
        status: "On The Way",
        deliveryManId: selectedDeliveryMan,
        approximateDeliveryDate,
      });

      Swal.fire({
        icon: "success",
        title: "Parcel Assigned!",
        text: "The parcel has been successfully assigned.",
      });

      fetchParcels();
      setSelectedParcel(null);
    } catch (error) {
      console.error("Error assigning parcel:", error);
    }
  };

  useEffect(() => {
    fetchParcels();
    fetchDeliveryMen();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Parcels</h2>

      {loading && <div className="text-center"><LoadingSpinner></LoadingSpinner></div>}

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">User's Name</th>
              <th className="border border-gray-300 px-4 py-2">User's Phone</th>
              <th className="border border-gray-300 px-4 py-2">Booking Date</th>
              <th className="border border-gray-300 px-4 py-2">
                Requested Delivery Date
              </th>
              <th className="border border-gray-300 px-4 py-2">Cost</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Manage</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.booksUsersName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.phoneNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(parcel.bookingDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(
                    `${parcel.requestedDate}T00:00:00Z`
                  ).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${parcel.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {parcel.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => setSelectedParcel(parcel)}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedParcel && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-bold mb-4">Manage Parcel</h3>
            <p className="mb-2">
              Assign delivery man for parcel:{" "}
              <strong>{selectedParcel._id}</strong>
            </p>
            <div className="mb-4">
              <label className="block mb-2">Select Delivery Man:</label>
              <select
                className="border rounded px-3 py-2 w-full"
                value={selectedDeliveryMan}
                onChange={(e) => setSelectedDeliveryMan(e.target.value)}
              >
                <option value="">-- Select --</option>
                {deliveryMen.map((man) => (
                  <option key={man._id} value={man._id}>
                    {man.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Approx. Delivery Date:</label>
              <input
                type="date"
                className="border rounded px-3 py-2 w-full"
                value={approximateDeliveryDate}
                onChange={(e) => setApproximateDeliveryDate(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={assignParcel}
                disabled={!selectedDeliveryMan || !approximateDeliveryDate}
              >
                Assign
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => setSelectedParcel(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParcels;