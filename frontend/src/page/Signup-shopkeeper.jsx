import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupShopkeeper = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isShopkeeper, setIsShopkeeper] = useState(true); // default checked
    const navigate = useNavigate();

    // ✅ Check if shopkeeper is already logged in
    useEffect(() => {
        
        const auth = localStorage.getItem("shop-keeper");
        
        if (auth) {
            navigate("/");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userAuth = localStorage.getItem("user");
        if(userAuth){
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
        try {
            const response = await fetch('http://localhost:3000/shopkeeper/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, phone, address, isShopkeeper }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("shop-keeper", JSON.stringify(data));
                localStorage.setItem("token", data.token); // ensure your backend sends this
                alert(data.message || "Registration successful");
                navigate('/');
            } else {
                alert(data.error || "Registration failed");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-center text-gray-800">Shopkeeper Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input 
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* ✅ Checkbox for Shopkeeper */}
                <div className="flex items-center mt-3">
                    <input
                        type="checkbox"
                        checked={isShopkeeper}
                        onChange={(e) => setIsShopkeeper(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        id="shopkeeper"
                    />
                    <label htmlFor="shopkeeper" className="ml-2 text-sm text-gray-700">
                        Register as Shopkeeper
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Sign Up
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account? <a href="/shopkeeper/login" className="text-blue-600 hover:underline">Login</a>
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">
                <a href="/" className="text-blue-600 hover:underline">Home</a>
            </p>
        </div>
    );
};

export default SignupShopkeeper;
