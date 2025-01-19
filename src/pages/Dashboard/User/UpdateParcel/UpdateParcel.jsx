import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxioxPublic";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import Swal from "sweetalert2";

const UpdateParcel = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate(); // Initialize navigate hook

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [isEditable, setIsEditable] = useState(true);
  const [parcel, setParcel] = useState(null);

  // Watching the parcel weight to calculate price
  const parcelWeight = watch("parcelWeight");

  // Price Calculation based on parcel weight
  const calculatePrice = () => {
    const weight = parseFloat(parcelWeight);
    if (weight === 1) return 50;
    if (weight === 2) return 100;
    if (weight > 2) return 150;
    return 0;
  };

  // Fetch parcel data and check status
  const fetchParcelData = async () => {
    try {
      const response = await axiosPublic.get(`/parcels/${id}`);
      if (response.status === 200) {
        setParcel(response.data);
        // Set form values with existing data
        setValue("parcelWeight", response.data.parcelWeight);
        setValue("parcelType", response.data.parcelType);
        setValue("phoneNumber", response.data.phoneNumber);
        setValue("receiverName", response.data.receiverName);
        setValue("receiverPhone", response.data.receiverPhone);
        setValue("requestedDate", response.data.requestedDate);
        setValue("latitude", response.data.latitude);
        setValue("longitude", response.data.longitude);
        setValue("deliveryAddress", response.data.deliveryAddress);
        // If status is not "pending", disable the form
        if (response.data.status !== "pending") {
          setIsEditable(false);
        }
      }
    } catch (error) {
      console.error("Error fetching parcel data:", error);
    }
  };

  useEffect(() => {
    fetchParcelData();
  }, [id, axiosPublic]);

  // Update parcel on form submission
  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      price: calculatePrice(),
      status: parcel.status, // Keep the original status
    };
    console.log('Parcel status before submit:', parcel.status);


    // Check if parcel status is "pending" before allowing update
    if (parcel.status !== "pending") {
        Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Parcel status is not 'pending' and cannot be modified.",
          });
      return;
    }

    try {
      const response = await axiosPublic.patch(`/parcels/${id}`, updatedData);
      console.log("Sending updated data:", updatedData);
      if (response.status === 200) {
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Parcel updated successfully!",
          });
        // Navigate to "My Parcels" page after successful update
        navigate("/dashboard/my-parcels");
      }
    } catch (error) {
      console.error("Error updating parcel:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error updating the parcel.",
      });
    }
  };

  if (!parcel) {
    return <p>Loading parcel data...</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Update Parcel</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name (Read-only) */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            className="input input-bordered w-full"
            disabled={!isEditable} // Disable if status is not pending
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Parcel Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Parcel Type</label>
          <input
            type="text"
            {...register("parcelType", { required: "Parcel type is required" })}
            className="input input-bordered w-full"
            disabled={!isEditable} // Disable if status is not pending
          />
          {errors.parcelType && (
            <p className="text-red-500 text-sm">{errors.parcelType.message}</p>
          )}
        </div>

        {/* Parcel Weight */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Parcel Weight (kg)
          </label>
          <input
            type="number"
            {...register("parcelWeight", {
              required: "Parcel weight is required",
              min: { value: 1, message: "Weight must be at least 1 kg" },
              validate: (value) =>
                value > 0 || "Weight must be greater than 0 kg",
            })}
            className="input input-bordered w-full"
            disabled={!isEditable} // Disable if status is not pending
          />
          {errors.parcelWeight && (
            <p className="text-red-500 text-sm">
              {errors.parcelWeight.message}
            </p>
          )}
        </div>

        {/* Receiver’s Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Receiver’s Name
          </label>
          <input
            type="text"
            {...register("receiverName", {
              required: "Receiver's name is required",
            })}
            className="input input-bordered w-full"
            disabled={!isEditable} // Disable if status is not pending
          />
          {errors.receiverName && (
            <p className="text-red-500 text-sm">
              {errors.receiverName.message}
            </p>
          )}
        </div>

        {/* Receiver’s Phone Number */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Receiver's Phone Number
          </label>
          <input
            type="tel"
            {...register("receiverPhone", {
              required: "Receiver's phone number is required",
            })}
            className="input input-bordered w-full"
            disabled={!isEditable} // Disable if status is not pending
          />
          {errors.receiverPhone && (
            <p className="text-red-500 text-sm">
              {errors.receiverPhone.message}
            </p>
          )}
        </div>

        {/* Requested Delivery Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Requested Delivery Date
          </label>
          <input
            type="date"
            {...register("requestedDate", {
              required: "Requested delivery date is required",
            })}
            className="input input-bordered w-full"
            disabled={!isEditable} // Disable if status is not pending
          />
          {errors.requestedDate && (
            <p className="text-red-500 text-sm">
              {errors.requestedDate.message}
            </p>
          )}
        </div>

        {/* Latitude */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Delivery Address Latitude
          </label>
          <input
            type="text"
            {...register("latitude", { required: "Latitude is required" })}
            className="input input-bordered w-full"
            disabled={!isEditable} // Disable if status is not pending
          />
          {errors.latitude && (
            <p className="text-red-500 text-sm">{errors.latitude.message}</p>
          )}
        </div>

        {/* Longitude */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Delivery Address Longitude
          </label>
          <input
            type="text"
            {...register("longitude", { required: "Longitude is required" })}
            className="input input-bordered w-full"
            disabled={!isEditable} // Disable if status is not pending
          />
          {errors.longitude && (
            <p className="text-red-500 text-sm">{errors.longitude.message}</p>
          )}
        </div>

        {/* Price (Auto-Calculated) */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="text"
            value={calculatePrice()}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Parcel Delivery Address */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Parcel Delivery Address
          </label>
          <textarea
            {...register("deliveryAddress", {
              required: "Delivery address is required",
            })}
            className="textarea textarea-bordered w-full"
            disabled={!isEditable} // Disable if status is not pending
          ></textarea>
          {errors.deliveryAddress && (
            <p className="text-red-500 text-sm">
              {errors.deliveryAddress.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!isEditable}
          >
            Update Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateParcel;

