import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaChartBar, FaUserAlt, FaCog } from "react-icons/fa";
import { BsFillBoxFill, BsFillPersonFill } from "react-icons/bs";
import { MdDeliveryDining, MdRateReview } from "react-icons/md";

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultMenu = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Analytics", path: "/dashboard/analytics", icon: <FaChartBar /> },
    { name: "Profile", path: "/dashboard/profile", icon: <FaUserAlt /> },
    { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
  ];

  const roleBasedMenu = {
    user: [
      {
        name: "Book a Parcel",
        path: "/dashboard/book-parcel",
        icon: <BsFillBoxFill />,
      },
      {
        name: "My Parcels",
        path: "/dashboard/my-parcels",
        icon: <BsFillBoxFill />,
      },
      {
        name: "My Profile",
        path: "/dashboard/my-profile",
        icon: <FaUserAlt />,
      },
    ],
    deliveryMan: [
      {
        name: "My Delivery List",
        path: "/dashboard/my-delivery-list",
        icon: <MdDeliveryDining />,
      },
      {
        name: "My Reviews",
        path: "/dashboard/my-reviews",
        icon: <MdRateReview />,
      },
    ],
    admin: [
      {
        name: "All Parcels",
        path: "/dashboard/all-parcels",
        icon: <BsFillBoxFill />,
      },
      { name: "All Users",
        path: "/dashboard/all-users", 
        icon: <FaUserAlt /> },
      {
        name: "All Delivery Men",
        path: "/dashboard/all-delivery-men",
        icon: <MdDeliveryDining />,
      },
      {
        name: "Statistics",
        path: "/dashboard/statistics",
        icon: <FaChartBar />,
      },
    ],
  };

  const combinedMenu = [...(roleBasedMenu[role] || [])];

  // Function to toggle the sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon for Mobile */}
      <button
        className="lg:hidden p-4 text-white bg-gray-800 fixed z-50 top-4 left-4"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Overlay (Visible when sidebar is open) */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-gray-800 opacity-50 z-40"
          onClick={toggleSidebar} // Clicking on the overlay closes the sidebar
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-800 text-white h-full fixed top-0 left-0 transform transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:block z-50`}
      >
        <div className="p-4 text-lg font-bold pl-10">Dashboard</div>

        <div className="divider divider-info"></div>

        <ul className="space-y-4 pl-10">
          {combinedMenu.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className="hover:bg-gray-700 p-2 block rounded"
                activeClassName="bg-gray-700"
                onClick={() => setIsOpen(false)} // Close sidebar on mobile when a link is clicked
              >
                <div className="flex gap-3 items-center">
                  {item.icon} {/* Display the icon */}
                  <span>{item.name}</span> {/* Display the text */}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="divider divider-warning"></div>

        <ul className="space-y-4 pl-10">
          {defaultMenu.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className="hover:bg-gray-700 p-2 block rounded"
                activeClassName="bg-gray-700"
                onClick={() => setIsOpen(false)} // Close sidebar on mobile when a link is clicked
              >
                <div className="flex gap-3 items-center">
                  {item.icon} {/* Display the icon */}
                  <span>{item.name}</span> {/* Display the text */}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
