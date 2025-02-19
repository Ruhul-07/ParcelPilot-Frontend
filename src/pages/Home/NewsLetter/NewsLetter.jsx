import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Handle the form submission (for example, send to a backend or an email service)
    try {
      // Replace with your actual API or service call
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("Thank you for subscribing!");
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Error: " + error.message);
    }
  };

  return (
    // <div className="max-w-6xl mx-auto bg-gray-100 flex flex-col items-center justify-center py-10">
    //   <div className="bg-white p-8 rounded-lg shadow-lg w-full">
    //     <h2 className="text-2xl font-bold text-center mb-4">Subscribe to Our Newsletter</h2>
    //     <p className="text-center mb-6">
    //       Stay updated with the latest news and offers from ParcelPilot.
    //     </p>
    //     <form onSubmit={handleSubmit} className="space-y-4 flex items-center">
    //       <div className="flex flex-row w-full space-x-4">
    //         <div className="flex-grow">
    //           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    //             Enter your email
    //           </label>
    //           <input
    //             id="email"
    //             type="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             required
    //             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    //           />
    //         </div>
    //         <div className="w-1/5">
    //           <button
    //             type="submit"
    //             className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
    //           >
    //             Subscribe
    //           </button>
    //         </div>
    //       </div>
    //     </form>
    //     {status && (
    //       <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
    //     )}
    //   </div>
    // </div>
    <div className="max-w-6xl mb-6 mx-auto bg-gray-100 flex flex-col items-center justify-center">
    <div className="card bg-white p-8 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Subscribe to Our Newsletter</h2>
      <p className="text-center mb-6">
        Stay updated with the latest news and offers from ParcelPilot.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 flex items-center">
        <div className="flex w-full items-center space-x-4">
          <div className="flex-grow">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Enter your email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="w-1/5">
            <button
              type="submit"
              className="w-full mt-6 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
            >
              Subscribe
            </button>
          </div>
        </div>
      </form>
      {status && (
        <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
      )}
    </div>
  </div>
  );
}
