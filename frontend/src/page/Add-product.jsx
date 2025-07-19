
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [stockQuantity, setStockQuantity] = useState();
     
 
    const handleAddProduct = async (e) => {
        e.preventDefault(); // prevent default form submission

       let email = localStorage.getItem("user");
        email=JSON.parse(email).user.email;
        
        // Validation check
        if ( !email||!name || !description || !price || !category || !company || !stockQuantity) {
            alert("Please fill all the fields.");
            return;
        }

        try {
            let response = await fetch("http://localhost:3000/add-product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    name,
                    description,
                    price,
                    category,
                    company,
                    stockQuantity,
                    
                }),
            });

            let result = await response.json();

            if (response.ok) {
                alert("Product added successfully!");
                navigate("/productList");
            } else {
                alert("Failed to add product: " + result.error);
                console.error("Error details:", email, name, description, price, category, company, stockQuantity);
            }
        } catch (error) {
            alert("Error adding product: " + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
            <form onSubmit={handleAddProduct} className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">
                <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">Add New Product</h2>

                <div className="space-y-5">
                    {/* All Input Fields remain same as before */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Price (₹)</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Category</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Company</label>
                        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Stock Quantity</label>
                        <input type="number" value={stockQuantity} onChange={(e) => setStockQuantity(Number(e.target.value))} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
