import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");
  const authShopkeeper = localStorage.getItem("shop-keeper");

  // Safely parse user data
  let user = null;
  if (authShopkeeper) {
    user = JSON.parse(authShopkeeper);
  } else if (auth) {
    user = JSON.parse(auth);
  }

  // Extract name and email safely
  const name = user?.user?.name || user?.name || "User";
  const email = user?.user?.email || user?.email || "Not available";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="text-center text-white mt-20">
        <h2>You are not logged in.</h2>
        <Link to="/login" className="text-blue-400 underline">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blur animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-3">
            My Profile
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-purple-400 rounded"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded"></div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105">
          <div className="text-center mb-8">
            <div className="relative mx-auto mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-full mx-auto flex items-center justify-center shadow-2xl ring-4 ring-white/30 hover:ring-white/50 transition-all duration-300">
                <span className="text-2xl font-bold text-white drop-shadow-lg">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white/90 mb-2">Welcome Back!</h2>
            <p className="text-purple-200/70 text-sm">Here's your profile information</p>

            {/* User Role */}
            <div className="mt-4 text-center">
              <p className="text-sm text-purple-200/80">
                {authShopkeeper
                  ? "🛒 You are registered as a Shopkeeper."
                  : "🏢 You are registered as a Company."}
              </p>
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-4">
            <div className="group bg-gradient-to-r from-white/5 to-white/10 p-5 rounded-2xl border border-white/10 hover:border-purple-300/30 hover:bg-white/15 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-purple-200/60 mb-1 uppercase tracking-wider">Full Name</p>
                  <p className="font-semibold text-white text-lg">{name}</p>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="group bg-gradient-to-r from-white/5 to-white/10 p-5 rounded-2xl border border-white/10 hover:border-purple-300/30 hover:bg-white/15 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-purple-200/60 mb-1 uppercase tracking-wider">Email Address</p>
                  <p className="font-semibold text-white text-lg">{email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* My Product Button */}
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-8 py-4 rounded-2xl hover:from-red-600 hover:via-red-700 hover:to-red-800 focus:ring-4 focus:ring-red-500/50 font-bold text-lg shadow-2xl hover:shadow-red-500/40"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
