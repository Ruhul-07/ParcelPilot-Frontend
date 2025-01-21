import React, { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxioxPublic";


const ReviewModal = ({ isOpen, onClose, parcel, refetch }) => {
  const { user } = useContext(AuthContext); // Get logged-in user's info
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !feedback) {
      Swal.fire("Error", "Please fill out all fields!", "error");
      return;
    }

    const reviewData = {
      userName: user?.displayName || "Anonymous",
      userImage: user?.photoURL || "",
      deliveryManId: parcel.deliveryManId,
      rating,
      feedback,
      parcelId: parcel._id,
      reviewDate: new Date(),
    };

    try {
      const response = await axiosPublic.post("/reviews", reviewData);

      if (response.status === 201) {
        Swal.fire("Success", "Review submitted successfully!", "success");
        onClose(); // Close the modal
        refetch(); // Refresh the parcel list
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire("Error", "Failed to submit review.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Submit a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">User’s Name</label>
            <input
              type="text"
              value={user?.displayName || "Anonymous"}
              disabled
              className="border rounded w-full px-2 py-1 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">User’s Image</label>
            <input
              type="text"
              value={user?.photoURL || "N/A"}
              disabled
              className="border rounded w-full px-2 py-1 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Delivery Men’s ID</label>
            <input
              type="text"
              value={parcel.deliveryManId || "Not Assigned"}
              disabled
              className="border rounded w-full px-2 py-1 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Rating (out of 5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border rounded w-full px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="border rounded w-full px-2 py-1"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
