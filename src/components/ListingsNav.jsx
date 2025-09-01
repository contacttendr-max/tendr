import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const ListingsNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-[#FDFAF0] border-b-2 border-[#CCAB4A] px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Back Button */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* <button
            onClick={() => navigate("/")}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-[#CCAB4A] hover:bg-[#ab8f39] transition-colors duration-200 rounded-full flex items-center justify-center"
          >
            <WestIcon className="text-white text-sm sm:text-base" />
          </button> */}
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
            Vendor Listings
          </h1>
        </div>

        {/* Right Section - User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 sm:space-x-3 bg-white hover:bg-gray-50 transition-colors duration-200 rounded-lg px-3 py-2 sm:px-4 sm:py-2 shadow-sm"
          >
            <AccountCircleIcon className="text-[#CCAB4A] text-lg sm:text-xl" />
            <span className="text-sm sm:text-base font-medium text-gray-700 hidden sm:block">
              {user?.name || "User"}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{user?.name || "User"}</p>
                  <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                </div>
                
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Dashboard
                </button>
                
                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Profile
                </button>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                >
                  <LogoutIcon className="text-sm" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
};

export default ListingsNav;