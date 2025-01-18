import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import signupAnimation from "../../../../public/animation/signup.json";
import { useForm } from "react-hook-form";
import { RxExit } from "react-icons/rx";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxioxPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {createUser, googleSignIn, updateUserProfile} = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data)
    createUser(data.email, data.password)
    .then(result => {
      const logedUser = result.user;
      console.log(logedUser)
      updateUserProfile(data.name, data.photoURL)
      .then(() => {
        //create user entry in the database
        const userInfo = {
          name: data.name,
          email: data.email,
          photoUrl: data.photoURL,
          role: data.role
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user added to the database");
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
      })
      .catch(error => {
        console.log(error)
      });
    });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(result => {
        console.log(result.user)
        const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName,
            photoUrl: result.user?.photoURL,
            role: "user"
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
            console.log(res.data);
            navigate('/');
        })
    })
}
    
  return (
    <>
      <div className="flex items-center gap-2 bg-base-200 pl-16 py-2">
        <RxExit className="text-2xl text-blue-400" />
        <Link to="/">
          <p className="text-3xl text-primary font-bold">Home</p>
        </Link>
      </div>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="w-full md:w-1/2 text-center lg:text-left">
            <Lottie animationData={signupAnimation}></Lottie>
          </div>
          <div className="card bg-base-100 w-full max-w-lg md:w-1/2 shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-3xl text-center mb-5 font-bold">Sign Up</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name here"
                  className="input input-bordered"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="photo url"
                  className="input input-bordered"
                  {...register("photoURL", {
                    required: "Photo URL is required",
                  })}
                />
                {errors.photoURL && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.photoURL.message}
                  </p>
                )}
              </div>
              <label className="label">
                <span className="label-text">Which account you like?</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("role", { required: "Please select a role" })}
              >
                <option disabled value="">
                  Select Your Position
                </option>
                <option value="User">User</option>
                <option value="Delivery Man">Delivery Man</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}

              <div className="form-control mt-6">
                <button className="btn bg-primary text-background">
                  Sign Up
                </button>
              </div>
            </form>
            <div className="divider w-[326px] mx-auto">OR</div>
            <div className="form-control mt-6">
              <button onClick={handleGoogleSignIn} className="btn bg-primary text-background w-[326px] mx-auto">
                Login With Google
              </button>
            </div>
            <p className="flex justify-center p-4">
              Already Have an account?<Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
