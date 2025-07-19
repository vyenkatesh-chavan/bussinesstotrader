import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DollarSign, Shield, TrendingUp, Users, Phone, Mail } from 'lucide-react';

const Nav = () => {
  const navigate = useNavigate();
  const authUser = localStorage.getItem("user");
  const authShopkeeper = localStorage.getItem("shop-keeper");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
            WELCOME TO ShopNetPro
          </h1>

          <div className="flex flex-wrap gap-4 text-blue-600 font-medium">
            {/* ✅ Only company user can see Add Product */}
            {authUser && (
              <Link to="/add-product" className="hover:text-blue-800 transition-colors duration-200">
                Add Product
              </Link>
            )}

            <Link to="/productList" className="hover:text-blue-800 transition-colors duration-200">
              Product
            </Link>

            {!authUser && !authShopkeeper ? (
              <>
                <Link to="/signup" className="hover:text-blue-800 transition-colors duration-200">
                 Bussiness Sign Up
                </Link>
                <Link to="/login" className="hover:text-blue-800 transition-colors duration-200">
                Bussiness Login
                </Link>
                <Link to="/shopkeeper/register" className="hover:text-blue-800 transition-colors duration-200">
                  Sign Up as Trader
                </Link>
                <Link to="/shopkeeper/login" className="hover:text-blue-800 transition-colors duration-200">
                  Login as Trader
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="hover:text-blue-800 transition-colors duration-200">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-6">
                <DollarSign className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-yellow-300">ShopNetPro</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your trusted platform for secure financial product trading with RBI compliance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {authUser && (
                <Link
                  to="/add-product"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Add Product
                </Link>
              )}
              <Link
                to="/productList"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose FinanceFlow?</h2>
            <p className="text-xl text-gray-600">Secure, compliant, and user-friendly financial trading platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={<Shield />} title="RBI Compliant" description="All transactions follow Reserve Bank of India guidelines ensuring complete regulatory compliance and security." />
            <FeatureCard icon={<TrendingUp />} title="Smart Trading" description="Advanced algorithms and real-time market analysis to help you make informed trading decisions." />
            <FeatureCard icon={<Users />} title="Trusted Community" description="Join thousands of verified traders in a secure and transparent trading environment." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Add Product?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of traders who trust FinanceFlow for secure and compliant financial product trading
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {authUser ? (
              <Link
                to="/add-product"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Add Product
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Create Account
                </Link>
                <Link
                  to="/login"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FooterColumn title="Product" links={['Features', 'Security', 'Mobile App', 'API']} />
            <FooterColumn title="Company" links={['About Us', 'Careers', 'Blog', 'Contact']} />
            <FooterColumn title="Support" links={['Help Center', 'Documentation', 'Community']} />
            <ContactInfo />
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-400">
            © 2025 FinanceFlow. All rights reserved. | RBI Compliant Platform
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
      <div className="text-white">{icon}</div>
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="text-white font-semibold mb-6">{title}</h3>
    <ul className="space-y-3">
      {links.map(link => (
        <li key={link}>
          <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">{link}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ContactInfo = () => (
  <div>
    <h3 className="text-white font-semibold mb-6">Contact</h3>
    <div className="flex items-center text-gray-300 mb-2">
      <Phone className="w-4 h-4 mr-2" />
      <span>1800-123-4567</span>
    </div>
    <div className="flex items-center text-gray-300">
      <Mail className="w-4 h-4 mr-2" />
      <span>support@financeflow.com</span>
    </div>
  </div>
);

export default Nav;
