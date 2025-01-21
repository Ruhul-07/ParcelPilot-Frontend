import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-96 bg-cover bg-center" style={{
        backgroundImage: "url('https://i.ibb.co.com/rHrrHqW/grab-w-M50-YUQ3-Dyc-unsplash.jpg')",
      }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl font-bold mb-4">
          Seamless Parcel Booking for All Your Delivery Needs
        </h1>
        <p className="text-lg mb-6">
          Effortlessly book and track your parcels for delivery anywhere, anytime.
        </p>
        <div className="w-2/3 sm:w-1/2 md:w-1/3 p-2 bg-white rounded-full">
          <input
            type="text"
            placeholder="Search for parcels, destinations, or services"
            className="w-full p-3 rounded-full border focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;





// import React from "react";

// const Banner = () => {
//   return (
//     <div
//       className="relative w-full h-96 bg-cover bg-center"
//       style={{
//         backgroundImage: "url('https://i.ibb.co.com/rHrrHqW/grab-w-M50-YUQ3-Dyc-unsplash.jpg')",
//       }}
//     >
//       <div className="absolute inset-0 bg-black opacity-50"></div>
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
//         <h1 className="text-4xl font-bold mb-4">
//           Seamless Parcel Booking for All Your Delivery Needs
//         </h1>
//         <p className="text-lg mb-6">
//           Effortlessly book and track your parcels for delivery anywhere, anytime.
//         </p>
//         <div className="w-2/3 sm:w-1/2 md:w-1/3 p-2 bg-white rounded-full">
//           <input
//             type="text"
//             placeholder="Search for parcels, destinations, or services"
//             className="w-full p-3 rounded-full border focus:outline-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;









// // import React from 'react';

// // const Banner = () => {
// //   return (
// //     <div
// //       className="relative w-full h-[500px] bg-cover bg-center"
// //       style={{
// //         backgroundImage:
// //           'url("https://example.com/your-image.jpg")', // Replace with your image URL
// //       }}
// //     >
// //       {/* Overlay */}
// //       <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
// //         {/* Banner Content */}
// //         <div className="text-center text-white px-6 md:px-12">
// //           <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-shadow-lg">
// //             Find Your Next Career Path
// //           </h1>
// //           <p className="text-lg md:text-2xl mb-6 opacity-80">
// //             Discover opportunities tailored just for you. Let us help you take the next step in your journey.
// //           </p>
          
// //           {/* Search Bar */}
// //           <div className="max-w-md mx-auto">
// //             <input
// //               type="text"
// //               placeholder="Search careers..."
// //               className="w-full px-6 py-3 text-lg rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Banner;
