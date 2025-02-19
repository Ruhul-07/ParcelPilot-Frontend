import CountUp from "react-countup";
import { FaTruck, FaShieldAlt, FaUsers } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxioxPublic";
import { useQuery } from "@tanstack/react-query";

const OurFeatures = () => {
  const axiosPublic = useAxiosPublic();

  const { isLoading, error, data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
        const res = await axiosPublic.get('/app-stats');
        return res.data;
    }
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">
          Why Choose Our Delivery System?
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <FaShieldAlt className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Parcel Safety</h3>
            <p className="text-gray-600">
              We ensure that your parcels are delivered safely and securely to
              their destination.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <FaTruck className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Super Fast Delivery</h3>
            <p className="text-gray-600">
              Our delivery system guarantees fast delivery, so you can send and
              receive parcels in no time.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <FaUsers className="text-4xl text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trusted by Thousands</h3>
            <p className="text-gray-600">
              Join thousands of satisfied users who trust us for their parcel
              delivery needs.
            </p>
          </div>
        </div>

        {/* App Stats */}
        <h2 className="text-3xl font-bold mb-6">Our App Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Total Parcels Booked</h3>
            <p className="text-gray-600">
              <CountUp
                start={0}
                end={stats.totalParcelsBooked}
                duration={2.5}
                separator=","
              />
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Total Parcels Delivered
            </h3>
            <p className="text-gray-600">
              <CountUp
                start={0}
                end={stats.totalParcelsDelivered}
                duration={2.5}
                separator=","
              />
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-gray-600">
              <CountUp
                start={0}
                end={stats.totalUsers}
                duration={2.5}
                separator=","
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
