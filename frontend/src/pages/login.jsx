import React, { useState } from "react";
import loginImg from "../assets/login-pic.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import register from "./register";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        { email, password }
      );

      // Assuming the backend returns the token directly
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        console.log("Redirecting to /inventory");
        navigate("/inventory");
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        // Handle backend errors
        setError(
          error.response.data.message ||
            "Something went wrong. Please try again later."
        );
      } else {
        // Handle network or other issues
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <div className="w-3/4 max-w-md">
          <div className="text-xl font-sans font-semibold mb-6 text-[#5A67BA]">
            Supply Link
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium flex flex-start text-[#5A67BA]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-xl text-[14px] mt-1"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm flex flex-start font-medium text-[#5A67BA]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-xl text-[14px] mt-1"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <button className="text-[#5A67BA] text-sm">
                Forgot Password
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5A67BA] text-white py-2 rounded-xl hover:bg-[#6e79bb]"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border text-white animate-spin">
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#5A67BA] cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-8">
        <img
          src={loginImg}
          alt="login"
          className="object-contain max-h-[90%] max-w-[90%] rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
