import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../../providers/AuthProvider";

const MyReviews = () => {
  const { user } = useContext(AuthContext);

  // Fetch reviews for the logged-in delivery man
  const { data = [], error, isLoading } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/${user?.email}`);
      const deliveryManId = res.data._id;
      const reviewsRes = await axios.get(`/reviews/delivery-man/${deliveryManId}`);
      const reviews = reviewsRes.data || []; // Ensure it's an array
      return reviews; // Make sure to return the array
    },
    enabled: !!user?.email, // Only run the query if the user is authenticated
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reviews: {error.message}</div>;

  // Handle the case where reviews might be empty or not an array
  if (!Array.isArray(data)) {
    return <div>No reviews found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((review) => (
          <div key={review._id} className="card bg-white p-4 shadow-md rounded-lg">
            <div className="flex items-center mb-4">
              <img
                src={review.reviewerImage || "/default-avatar.jpg"}
                alt={review.reviewerName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-bold">{review.reviewerName}</h3>
                <p className="text-gray-500">{new Date(review.reviewDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                <span className="ml-2">({review.rating}/5)</span>
              </div>
              <p className="text-gray-700">{review.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
