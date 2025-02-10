"use client";

import React, { useState } from "react";



const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 sm:bg-white rounded-lg sm:shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Log In Your Account
        </h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 w-full bg-[#F2F2F2] px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Email address"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 w-full bg-[#F2F2F2] px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? <span>👁️</span> : <span>👁️‍🗨️</span>}
              </button>
            </div>
          </div>
          <div className="mb-6 text-right">
            <a href="#" className="text-sm text-purple-500 hover:underline">
              Forget password
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:ring-2 trs focus:ring-purple-500 focus:ring-offset-1 focus:outline-none"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
