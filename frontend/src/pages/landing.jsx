import React from "react";
import { ArrowRight, CheckCircle, Box, Users, Zap } from "lucide-react";
import supplyimg from '../assets/supply.avif';
import { useNavigate } from 'react-router-dom';
import Login from './login';
const LandingPage = () => {
    const navigate = useNavigate();
  return (
    
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-6 px-8 bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-indigo-600">SupplyLink 🛒</h1>
        <ul className="hidden md:flex space-x-8">
          <li><span
              onClick={() => navigate("/")}
              className="text-[#5A67BA] cursor-pointer hover:underline"
            >
              Home
            </span></li>
          <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a></li>
          <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Community</a></li>
          <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Blog</a></li>
          <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a></li>
        </ul>
        <button className="hidden md:block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Sign Up
        </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-70"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium inline-block mb-6">
            Transform Your Supply Chain Today
          </span>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Seamless <span className="text-indigo-600">Connections</span>, 
                <br />Smarter <span className="text-indigo-600">Supply Chains</span>
              </h2>
              <p className="text-xl text-gray-600 mt-6">
                Streamline your operations with our AI-powered platform. Connect with suppliers, 
                manage inventory, and optimize your supply chain effortlessly.
              </p>
              <div className="mt-10">
                <button onClick={() => navigate("/Login")}
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-lg">
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">No credit card required</span>
                </div>
              </div>
            </div>
            <div className="order-first md:order-last">
              <img 
                src={supplyimg}        // IMAGE
                alt="Supply Chain Management" 
                className="rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-3xl font-bold text-gray-900 mb-12">
            Everything you need in a single <span className="text-indigo-600">platform 🛒</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-indigo-500 transition-shadow border border-gray-200">
              <Box className="w-12 h-12 text-indigo-600 mb-6" />
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Supplier Management</h4>
              <p className="text-gray-600">
                Automate inventory management and order placements. Get real-time updates and analytics 
                for better decision making.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-indigo-500 transition-shadow border border-gray-200">
              <Zap className="w-12 h-12 text-indigo-600 mb-6" />
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Manufacturing Intelligence</h4>
              <p className="text-gray-600">
                Optimize production with AI-driven insights. Streamline collaboration with suppliers 
                for seamless operations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-indigo-500 transition-shadow border border-gray-200">
              <Users className="w-12 h-12 text-indigo-600 mb-6" />
              <h4 className="text-xl font-semibold text-gray-900 mb-4">MSME Solutions</h4>
              <p className="text-gray-600">
                Purpose-built tools for small businesses. Simplify complex supply chain processes with 
                our intuitive platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-3">
            {/* <div>
              <h1 className="text-xl font-bold text-indigo-600 mb-4">SupplyLink</h1>
              <p className="text-gray-600">Building the future of supply chain management.</p>
            </div> */}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">© 2025 SupplyLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;