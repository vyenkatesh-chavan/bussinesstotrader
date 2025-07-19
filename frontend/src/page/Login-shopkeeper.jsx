import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ShopLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password) {
      try {
        let result = await fetch("http://localhost:3000/shopkeeper/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        result = await result.json();
       
        if (result.token && result.shopkeeper) {
          localStorage.setItem("shop-keeper", JSON.stringify(result.shopkeeper));
          localStorage.setItem("token", result.token);
          alert("Login successful");
          navigate("/");
        } else {
          alert(result.error || "Invalid login details");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Shopkeeper Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 font-semibold"
        >
          Login
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/shopkeeper/register" className="text-indigo-500 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;
