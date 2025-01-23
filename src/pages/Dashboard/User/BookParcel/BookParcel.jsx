import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxioxPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Modal } from "react-responsive-modal"; // For modal
import "react-responsive-modal/styles.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // For map

const BookParcel = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const [lat, setLat] = useState(null); // Store latitude for the map
  const [lng, setLng] = useState(null); // Store longitude for the map

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    const bookingData = {
      ...data,
      booksUsersName: user?.displayName,
      booksUserEmail: user?.email,
      price: calculatePrice(),
      status: "pending",
    };
    console.log(bookingData);

    try {
      const response = await axiosPublic.post("/bookingParcels", bookingData);
      console.log("Response:", response);
      if (response.status >= 200 && response.status < 300) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Parcel booked successfully!",
        });
        navigate("/dashboard/my-parcels");
      }
    } catch (error) {
      console.error("Error booking parcel:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error booking the parcel.",
      });
    }
  };

  // Show map in the modal when the user clicks the button
  const handleModalOpen = () => {
    const latInput = parseFloat(watch("latitude")) || 23.8103; 
    const lngInput = parseFloat(watch("longitude")) || 90.4125; 
    setLat(latInput);
    setLng(lngInput);
    setOpenModal(true);
  };

  const handleModalClose = () => setOpenModal(false);

  useEffect(() => {
    if (openModal) {
      setTimeout(() => {
        const map = document.querySelector(".leaflet-container");
        if (map) {
          map.invalidateSize();
        }
      }, 100);
    }
  }, [openModal]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Book a Parcel</h2>
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
            placeholder="Enter Latitude"
            defaultValue="23.8103" 
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
            placeholder="Enter Longitude" 
            defaultValue="90.4125" 
          />
          {errors.longitude && (
            <p className="text-red-500 text-sm">{errors.longitude.message}</p>
          )}
        </div>

        {/* Button to open the map modal */}
        <div className="md:col-span-2">
          <button
            type="button"
            onClick={handleModalOpen}
            className="btn bg-orange-400 w-full mt-4"
          >
            Show Delivery Location on Map
          </button>
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
          ></textarea>
          {errors.deliveryAddress && (
            <p className="text-red-500 text-sm">
              {errors.deliveryAddress.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">
            Book Parcel
          </button>
        </div>
      </form>
      {/* Modal for Map */}
      <Modal open={openModal} onClose={handleModalClose} center>
        <h3 className="text-xl font-bold mb-4">Delivery Location</h3>
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          style={{
            width: "100%",
            height: "400px",
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[lat, lng]}>
            <Popup>Parcel Delivery Location</Popup>
          </Marker>
        </MapContainer>
      </Modal>
    </div>
  );
};

export default BookParcel;
