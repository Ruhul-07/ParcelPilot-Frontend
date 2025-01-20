import React, { useContext, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxioxPublic";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [newUser, setNewUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosPublic = useAxiosPublic();

  const { isLoading, data, error } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return null;
      }
      const res = await axiosPublic.get(`/users/${user.email}`);
      // console.log("API Response in queryFn:", res.data); 
      setNewUser(res.data.role)
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Received data in onSuccess:", data); 
      if (data && data.role) {
        setNewUser(data.role);
        console.log("Setting newUser:", data.role);
      } else {
        console.log("No role in data", data);
      }
    },
    onError: (error) => {
      console.error("Error in query:", error);
    }
  });
  
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }


  return (
    <div className="flex min-h-screen">
      {/* Ensure newUser is loaded before rendering Sidebar */}
      {newUser && <Sidebar role={newUser} />}
      <div className="mt-12 md:mt-0 flex-1 pl-8 bg-gray-100">
        <Outlet /> {/* Render child routes */}
      </div>
    </div>

  );
};

export default Dashboard;
