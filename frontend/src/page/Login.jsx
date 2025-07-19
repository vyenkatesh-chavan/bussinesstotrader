import { useNavigate } from "react-router-dom";
import React, { useState,useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    useEffect(() => {
        const auth=localStorage.getItem("user");
        if(auth){
            navigate("/");
        }
      });
    
    const HandleLogin = async () => {
        if(email && password){
            let result = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization:JSON.stringify(localStorage.getItem("token"))
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            result = await result.json();
            localStorage.setItem("user", JSON.stringify(result));
            localStorage.setItem("token", result.token);
            
            navigate("/");
            //result = await result.json();
            // Check if login was successful
            if (result.message === 'Login successful') {
                // Store user data in local storage
                alert("Login successful");
            } else {
                alert(result.error || "Login failed");
            }
        }

    }
    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
                <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <button 
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    onClick={HandleLogin}
                >
                    Login
                </button>
            </div>
        </>
    );
};

export default Login;
