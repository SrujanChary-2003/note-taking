import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavBar from "../../components/NavBar";
import sideimage from "../../assets/image.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

type FormValues = {
  email: string;
  otp: string;
  keepLoggedIn: boolean;
};

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          email: data.email,
          otp: data.otp,
        },
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onResendOtp = async () => {
    const email = getValues("email");

    if (!email) {
      alert("Please enter your email before resending OTP.");
      return;
    }

    setIsLoading(true);
    try {
      const userRes = await axios.get(
        `http://localhost:5000/api/auth/get-user-by-email?email=${email}`
      );
      const { name, dob } = userRes.data.user;

      await axios.post(
        "http://localhost:5000/api/auth/request-otp",
        { email, name, dob },
        { withCredentials: true }
      );

      alert("OTP resent to your email.");
    } catch (error: any) {
      console.error("Resend OTP failed:", error);
      alert(
        error.response?.data?.message || "User not found. Please sign up first."
      );
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

      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 bg-white">
        <NavBar />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)] p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            <h2 className="text-6xl font-semibold mb-6">Sign in</h2>
            <p className="text-gray-500 mb-4 text-1xl">
              Please login to continue to your account.
            </p>

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
              className="w-full px-4 py-4 mb-1 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-2">
                {errors.email.message}
              </p>
            )}

            <input
              type="text"
              placeholder="OTP"
              {...register("otp", { required: "OTP is required" })}
              className="w-full px-4 py-4 mb-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mb-2">{errors.otp.message}</p>
            )}

            <div className="flex justify-between items-center text-1xl mb-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("keepLoggedIn")}
                  className="accent-blue-600 w-4 h-4"
                />
                Keep me logged in
              </label>
              <button
                type="button"
                onClick={onResendOtp}
                className="text-blue-600 hover:underline text-sm"
              >
                Resend OTP
              </button>
            </div>

            <button
              type="submit"
              className="w-full text-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Sign in
            </button>

            <p className="text-1xl mt-4 text-center">
              Need an account?{" "}
              <a href="/signup" className="text-blue-500 underline text-1xl">
                Create one
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-1/2 hidden md:block rounded-4xl">
        <img
          src={sideimage}
          alt="Login Visual"
          className="object-cover h-full w-full p-2 rounded-4xl"
        />
      </div>
    </div>
  );
};

export default Login;
