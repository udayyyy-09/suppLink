import React, { useState } from 'react';
import loginImg from '../assets/login-pic.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/inventory');
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        setError(error.response.data.message || 'Something went wrong. Please try again later.');
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <div className="w-3/4 max-w-md">
          <div className="text-xl font-sans font-semibold mb-6 text-[#5A67BA]">Supply Link</div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="text-sm font-medium flex flex-start text-[#5A67BA]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-xl text-[14px] mt-1"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="companyName" className="text-sm font-medium flex flex-start text-[#5A67BA]">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="w-full p-3 border border-gray-300 rounded-xl text-[14px] mt-1"
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm flex flex-start font-medium text-[#5A67BA]">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-xl text-[14px] mt-1"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm flex flex-start font-medium text-[#5A67BA]">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-3 border border-gray-300 rounded-xl text-[14px] mt-1"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#5A67BA] text-white py-2 rounded-xl hover:bg-[#6e79bb]"
              disabled={loading}
            >
              {loading ? <span className="spinner-border text-white animate-spin">Loading...</span> : 'Sign Up'}
            </button>
          </form>

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          <p className="mt-4 text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-[#5A67BA]">Login</a>
          </p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-8">
        <img src={loginImg} alt="signup" className="object-contain max-h-[90%] max-w-[90%] rounded-lg" />
      </div>
    </div>
  );
};

export default Signup;