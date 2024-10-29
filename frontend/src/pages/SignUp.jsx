import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerUser } from "../utils/api";

const SignUp = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    const userObj = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    try {
      const response = await registerUser(userObj);
      console.log(response);
      toast.success(response.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };
  const loginWithGoogle = () => {
    localStorage.clear();
    window.open("http://localhost:8000/auth/google/callback", "_self");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full my-2 max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-500">
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center justify-center mt-6">
          <button
            type="button"
            onClick={loginWithGoogle}
            className="flex items-center justify-center w-full px-4 py-2 font-semibold text-blue-500 border border-blue-500 rounded-md hover:bg-blue-100"
          >
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google logo"
              className="mr-2"
            />
            Login with Google
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="font-medium text-blue-500 hover:underline"
          >
            {" "}
            Log In
          </Link>
        </p>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default SignUp;
