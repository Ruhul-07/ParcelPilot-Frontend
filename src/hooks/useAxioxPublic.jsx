import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://parcel-pilot-backend.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;