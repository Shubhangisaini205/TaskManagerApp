import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, isAuth, logout } = useContext(AuthContext);
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Tasks List 📑
        </Link>
        <ul className="flex space-x-4">
          {isAuth ? (
            <>
              <li className="text-white  px-4 py-2 rounded-md">
                Hi, {user.first_name}
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-white hover:bg-white  hover:text-blue-500 px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:bg-white hover:text-blue-500  px-4 py-2 rounded-md"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-white hover:bg-white  hover:text-blue-500  px-4 py-2 rounded-md"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
