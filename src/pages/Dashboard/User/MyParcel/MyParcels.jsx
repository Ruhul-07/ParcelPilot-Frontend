import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosPublic from '../../../../hooks/useAxioxPublic';

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic =useAxiosPublic();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');

  // Fetch parcels for the logged-in user
  const { data: parcels = [], refetch, isLoading, isError } = useQuery({
    queryKey: ['myParcels', user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/myParcels/${user?.email}`);
      return response.data;
    },
  });

  // filtering system
const filteredParcels = parcels.filter((parcel) => {
  // If no filter is selected, return all parcels
  if (!filter || filter === "All") {
    return true;
  }

  // Filter parcels based on status, case-insensitive
  return parcel.status.toLowerCase() === filter.toLowerCase();
});

  // Handle Cancel
  const handleCancel = async (parcelId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.patch(`http://localhost:5000/parcels/${parcelId}`, { status: 'canceled' });
          if (response.status === 200) {
            Swal.fire('Canceled!', 'Your parcel has been canceled successfully.', 'success');
            refetch();
          }
        } catch (error) {
          Swal.fire('Error!', 'Failed to cancel the parcel.', 'error');
        }
      }
    });
  };

  // Handle Update
  const handleUpdate = (parcelId) => {
    navigate(`/dashboard/updateParcel/${parcelId}`);
  };

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

      {/* Parcels Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Parcel Type</th>
            <th className="border px-4 py-2">Requested Date</th>
            <th className="border px-4 py-2">Booking Date</th>
            <th className="border px-4 py-2">Delivery Men ID</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParcels.map((parcel) => (
            <tr key={parcel._id}>
              <td className="border px-4 py-2">{parcel.parcelType}</td>
              <td className="border px-4 py-2">{new Date(parcel.requestedDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{new Date(parcel.bookingDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{parcel.deliveryMenId || 'Not Assigned'}</td>
              <td className="border px-4 py-2">{parcel.status}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  disabled={parcel.status !== 'pending'}
                  onClick={() => handleUpdate(parcel._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded ml-2"
                  disabled={parcel.status !== 'pending'}
                  onClick={() => handleCancel(parcel._id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
