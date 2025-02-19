import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">About ParcelPilot</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Your trusted partner in seamless and efficient parcel delivery.
          </p>
        </div>
  
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">
              At ParcelPilot, our mission is to provide fast, secure, and reliable parcel delivery services. We strive to simplify logistics so businesses and individuals can focus on what matters most.
            </p>
          </div>
          <div>
            <img
              src="/src/assets/truck.jpg"
              alt="Parcel Delivery"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
  
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-16">
          <div className="order-2 md:order-1">
            <img
              src="/src/assets/team.jpg"
              alt="Our Team"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>Fast & Reliable Delivery</li>
              <li>Real-time Parcel Tracking</li>
              <li>Affordable Pricing</li>
              <li>Secure and Safe Handling</li>
              <li>Excellent Customer Support</li>
            </ul>
          </div>
        </div>
  
        <div className="max-w-4xl mx-auto text-center mt-16">
          <h3 className="text-2xl font-semibold mb-4">Join Us</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Become a part of the ParcelPilot family and experience hassle-free deliveries. Whether you're a sender, recipient, or delivery partner, we've got you covered!
          </p>
          <Link to="/login"><button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300">
            Get Started
          </button></Link>
        </div>
      </div>
    );
  };
  
  export default AboutUs;  