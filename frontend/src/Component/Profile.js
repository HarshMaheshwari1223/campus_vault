import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Profile.css"; // Optional: create this for custom styling

const Profile = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const rollNumber = localStorage.getItem("rollNumber");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md text-center space-y-6">
        <h2 className="text-3xl font-bold">User Profile</h2>
        <div className="text-left space-y-3">
          <p><span className="font-semibold">Name:</span> {name || "Not available"}</p>
          <p><span className="font-semibold">Roll Number:</span> {rollNumber || "Not available"}</p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Back to Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
