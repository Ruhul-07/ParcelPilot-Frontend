import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import useAxiosPublic from '../../../../hooks/useAxioxPublic';

const Statistics = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // Fetch data from your backend for the statistics
  const fetchStatisticsData = async () => {
    try {
      const bookingsResponse = await axiosPublic.get('/bookings-by-date');
      const comparisonResponse = await axiosPublic.get('/comparison-booked-delivered');

      // Check if data is valid and not empty
      if (bookingsResponse.data && comparisonResponse.data) {
        setBookingsData(bookingsResponse.data);
        setComparisonData(comparisonResponse.data);
      } else {
        console.error("Received empty data from API");
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching statistics data', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatisticsData();
  }, []);

  // Bar chart options
  const barChartOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: bookingsData.length > 0 ? bookingsData.map((data) => data.date) : [],
    },
    title: {
      text: 'Bookings by Date',
    },
  };

  // Line chart options
  const lineChartOptions = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: comparisonData.length > 0 ? comparisonData.map((data) => data.date) : [],
    },
    title: {
      text: 'Comparison of Booked vs Delivered Parcels',
    },
    yaxis: {
      title: {
        text: 'Number of Parcels',
      },
    },
  };

  // Bar chart data series
  const barChartSeries = [
    {
      name: 'Bookings',
      data: bookingsData.length > 0 ? bookingsData.map((data) => data.bookings) : [],
    },
  ];

  // Line chart data series
  const lineChartSeries = [
    {
      name: 'Booked Parcels',
      data: comparisonData.length > 0 ? comparisonData.map((data) => data.booked) : [],
    },
    {
      name: 'Delivered Parcels',
      data: comparisonData.length > 0 ? comparisonData.map((data) => data.delivered) : [],
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Bar Chart for Bookings by Date */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <ApexCharts
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height={350}
          />
        </div>

        {/* Line Chart for Booked vs Delivered Parcels */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <ApexCharts
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;













// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ApexCharts from 'react-apexcharts';
// import useAxiosPublic from '../../../../hooks/useAxioxPublic';

// const Statistics = () => {
//   const [bookingsData, setBookingsData] = useState([]);
//   const [comparisonData, setComparisonData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const axiosPublic = useAxiosPublic();

//   // Fetch data from your backend for the statistics
//   const fetchStatisticsData = async () => {
//     try {
//       const bookingsResponse = await axiosPublic.get('/bookings-by-date'); // Update with your endpoint for booking data by date
//       const comparisonResponse = await axiosPublic.get('/comparison-booked-delivered'); // Update with your endpoint for comparison data

//       setBookingsData(bookingsResponse.data);
//       setComparisonData(comparisonResponse.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching statistics data', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStatisticsData();
//   }, []);

//   const barChartOptions = {
//     chart: {
//       type: 'bar',
//     },
//     xaxis: {
//       categories: bookingsData.map((data) => data.date),
//     },
//     title: {
//       text: 'Bookings by Date',
//     },
//   };

//   const lineChartOptions = {
//     chart: {
//       type: 'line',
//     },
//     xaxis: {
//       categories: comparisonData.map((data) => data.date),
//     },
//     title: {
//       text: 'Comparison of Booked vs Delivered Parcels',
//     },
//     yaxis: {
//       title: {
//         text: 'Number of Parcels',
//       },
//     },
//   };

//   const barChartSeries = [
//     {
//       name: 'Bookings',
//       data: bookingsData.map((data) => data.bookings),
//     },
//   ];

//   const lineChartSeries = [
//     {
//       name: 'Booked Parcels',
//       data: comparisonData.map((data) => data.booked),
//     },
//     {
//       name: 'Delivered Parcels',
//       data: comparisonData.map((data) => data.delivered),
//     },
//   ];

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Statistics</h2>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//         {/* Bar Chart for Bookings by Date */}
//         <div className="p-4 bg-white shadow-md rounded-lg">
//           <ApexCharts
//             options={barChartOptions}
//             series={barChartSeries}
//             type="bar"
//             height={350}
//           />
//         </div>

//         {/* Line Chart for Booked vs Delivered Parcels */}
//         <div className="p-4 bg-white shadow-md rounded-lg">
//           <ApexCharts
//             options={lineChartOptions}
//             series={lineChartSeries}
//             type="line"
//             height={350}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Statistics;
