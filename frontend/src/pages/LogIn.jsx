import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  const loginWithGoogle = () => {
    localStorage.clear();
    window.open("http://localhost:8000/auth/google/callback", "_self");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-500">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {isLoading ? "Logging in..." : "Login"}
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
          Don’t have an account?
          <Link
            to="/signup"
            className="font-medium text-blue-500 hover:underline"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Login;
