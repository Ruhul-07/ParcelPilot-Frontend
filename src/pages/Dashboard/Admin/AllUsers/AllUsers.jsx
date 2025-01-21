import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      const { data } = await axiosSecure.get(`/users?page=${page}&limit=${limit}`);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await axiosSecure.patch(`/users/${userId}`, { role });
      Swal.fire('Success', `User role changed to ${role}`, 'success');
      fetchUsers(currentPage); // Refresh the data
    } catch (err) {
      Swal.fire('Error', 'Failed to update user role', 'error');
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Parcels Booked</th>
            <th className="border px-4 py-2">Total Spent</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.phoneNumber || 'N/A'}</td>
              <td className="border px-4 py-2">{user.parcelsBooked || 0}</td>
              <td className="border px-4 py-2">{user.totalSpentAmount || 0} USD</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => handleRoleChange(user._id, 'Delivery Man')}
                >
                  Make Delivery Man
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={() => handleRoleChange(user._id, 'Admin')}
                >
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-500"
        >
          &lt; Back
        </button>
        
        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            } rounded`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-500"
        >
          Forward &gt;
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
