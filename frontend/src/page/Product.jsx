import { Delete } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const authUser = localStorage.getItem("user");
  const authShopkeeper = localStorage.getItem("shop-keeper");

  let email = null;
  if (authUser) {
    try {
      email = JSON.parse(authUser).user.email;
    } catch (error) {
      console.error("Invalid user data",error);
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/productList");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const DeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/delete-product/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Product deleted successfully");
        setProducts(products.filter((product) => product._id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim();

    if (searchTerm) {
      fetch(`http://localhost:3000/search/${searchTerm}`)
        .then((res) => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then((data) => {
          if (data.length === 0) {
            alert("No products found");
            fetchProducts();
          } else {
            setProducts(data);
          }
        })
        .catch((error) => {
          alert("Search error",error.message);
          console.error("Not Found ", error);
          fetchProducts();
        });
    } else {
      fetchProducts();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold text-white animate-pulse">Loading Products...</h1>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-4">No Products Found</h1>
          <p className="text-purple-200">Try adjusting your search or check back later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Product Collection
          </h1>
          <p className="text-purple-200 text-lg">Discover amazing products from our marketplace</p>
        </div>

        {/* Search Section */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              type="search"
              placeholder="Search for products..."
              onChange={handleSearch}
              className="w-full p-6 pl-12 text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              {/* Product Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {product.name}
                </h2>
                <p className="text-purple-200 text-sm leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Product Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-green-400">₹{product.price}</span>
                  <span className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-300 font-medium">{product.company}</span>
                  <span className="text-orange-300 font-medium">
                    Stock: {product.stockQuantity}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Shopkeeper Chat Button */}
                {authShopkeeper && (
                  <button
                    onClick={() => alert("Open chat with seller")}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                  >
                    💬 Chat with Seller
                  </button>
                )}

                {/* Owner Actions */}
                {authUser && email === product.email && !authShopkeeper && (
                  <div className="space-y-3">
                    <button
                      onClick={() => DeleteProduct(product._id)}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-red-500/25 flex items-center justify-center"
                    >
                      <Delete className="w-5 h-5 mr-2" />
                      Delete Product
                    </button>
                    <Link
                      to={`/update-product/${product._id}`}
                      className="block text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                    >
                      ✏️ Update Product
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;