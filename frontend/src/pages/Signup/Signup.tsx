import { useState } from "react";
import NavBar from "../../components/NavBar";
import sideimage from "../../assets/image.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

interface FormValues {
  name: string;
  dob: string;
  email: string;
  otp: string;
}
const BASEURL = import.meta.env.VITE_BACKEND_URL;
const Signup = () => {
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onGetOtp = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await axios.post(`${BASEURL}/api/auth/request-otp`, {
        name: data.name,
        dob: data.dob,
        email: data.email,
      });
      setOtpSent(true);
      alert("OTP sent to your email.");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const onSignup = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASEURL}/api/auth/signup`, data, {
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Signup successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Spinner Overlay with blur effect */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <Spinner />
        </div>
      )}

      {/* Left Panel (Form + Navbar) */}
      <div className="w-full md:w-1/2 bg-white">
        <NavBar />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)] p-6">
          <form
            className="w-full max-w-sm"
            onSubmit={handleSubmit(otpSent ? onSignup : onGetOtp)}
          >
            <h2 className="text-5xl font-semibold mb-6">Sign up</h2>
            <p className="text-gray-500 mb-4">
              Sign up to see the future of HD.
            </p>

            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Full name is required" })}
              className="w-full h-[50px] px-4 py-2 mb-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
            )}

            <input
              type="date"
              {...register("dob", {
                required: "Date of birth is required",
              })}
              className="w-full h-[50px] px-4 py-2 mb-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mb-2">{errors.dob.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              className="w-full h-[50px] px-4 py-2 mb-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-2">
                {errors.email.message}
              </p>
            )}

            {otpSent && (
              <>
                <input
                  type="text"
                  placeholder="OTP"
                  {...register("otp", { required: "OTP is required" })}
                  className="w-full h-[40px] px-4 py-2 mb-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mb-2">
                    {errors.otp.message}
                  </p>
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-2"
            >
              {otpSent ? "Sign up" : "Get OTP"}
            </button>

            <p className="text-sm mt-4 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 underline">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Panel (Image) */}
      <div className="w-full p-5 md:w-1/2 hidden md:block border-0 rounded-4xl">
        <img
          src={sideimage}
          alt="Signup Visual"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default Signup;
