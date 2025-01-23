import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxioxPublic";

const image_hosting_key = import.meta.env.VITE_IMG_BB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  // console.log(user?.photoURL);
  const [profileImg, setProfileImg] = useState(user?.profileImg || "");
  const [name, setName] = useState(user?.name || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setProfileImg(user?.photoURL);
    setName(user?.displayName);
  }, [user]); 

  const axiosPublic = useAxiosPublic();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axiosPublic.post(image_hosting_api, formData);
        // console.log(response);
        setProfileImg(response.data.data.url);
        Swal.fire("Success!", "Profile image updated!", "success");
      } catch (err) {
        console.error("Image upload failed:", err);
        Swal.fire("Error", "Failed to update profile image.", "error");
      }
    }
  };

  const handleSave = async () => {
    if (typeof name !== "string" || typeof profileImg !== "string") {
      console.error("Invalid data type for name or profileImg");
      Swal.fire("Error", "Invalid data for profile update.", "error");
      return;
    }
    try {
      console.log("Updating profile with:", {
        displayName: name,
        photoURL: profileImg,
      });

      await updateUserProfile(name, profileImg);
      Swal.fire("Success!", "Profile updated successfully!", "success");
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
      Swal.fire("Error", "Failed to update profile.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-5">
      <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>

      <div className="flex justify-center items-center">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg mb-4"
        />
      </div>

      <div className="flex justify-center items-center mb-4">
        {!isEditing ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-full"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-full"
            onClick={handleSave}
          >
            Save Changes
          </button>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Name:</label>
        <input
          type="text"
          value={name}
          disabled={!isEditing}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mt-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">
          Change Profile Picture:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={!isEditing}
          className="w-full p-2 mt-2 border rounded-md"
        />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">My Information</h3>
          <p className="text-gray-600">Name: {user?.displayName || "N/A"}</p>
          <p className="text-gray-600">Email: {user?.email || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
