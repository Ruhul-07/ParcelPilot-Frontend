import { Link, useNavigate} from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../../../../public/animation/login.json";
import { useForm } from "react-hook-form";
import { RxExit } from "react-icons/rx";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {signIn} = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data)
    signIn(data.email, data.password)
    .then(result => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "User Login Successful.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate("/")
    })
  };

  return (
     <>
        <div className="flex items-center gap-2 bg-base-200 pl-16 pt-2">
        <RxExit className="text-2xl text-blue-400" />
        <Link to="/"><p className="text-3xl text-primary font-bold">Home</p></Link>
        </div>
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="w-full md:w-1/2 text-center lg:text-left">
          <Lottie className="p-10" animationData={loginAnimation}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-lg md:w-1/2 shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="text-3xl text-center text-orange-400 font-bold">Welcome Back</h1>
            <h2 className="text-2xl text-center my-2 font-bold">Login Here</h2>
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
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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

            <div className="form-control mt-6">
              <button className="btn bg-primary text-background">
                Sign In
              </button>
            </div>
          </form>
          <div className="w-5/6 mx-auto">
            <div className="divider">
              OR
            </div>
            <button className="btn bg-primary text-background w-full">Sign In With Google</button>
          </div>
          <p className="flex justify-center p-4">
            Already Have an account?<Link to="/signUp">SignUp</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
