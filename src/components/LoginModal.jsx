import React, { useState } from "react";

function LoginModal({ onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[99999]">
      <div className="bg-slate-800 rounded-lg shadow-lg p-8 w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-400">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border border-slate-600 rounded bg-slate-700 text-slate-200 placeholder-slate-400"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-slate-600 rounded bg-slate-700 text-slate-200 placeholder-slate-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-slate-600 rounded bg-slate-700 text-slate-200 placeholder-slate-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center text-slate-300">
          {isSignup ? (
            <span>
              Already have an account?{" "}
              <button
                className="text-blue-400 underline"
                onClick={() => setIsSignup(false)}
              >
                Login
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{" "}
              <button
                className="text-blue-400 underline"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginModal;