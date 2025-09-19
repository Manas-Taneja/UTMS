import React, { useState } from "react";
import Navbar from "./navbar";
import MapView from "./mapview";
import DroneDetails from "./dronedetails";

const drone = {
  lat: 28.6139,
  lng: 77.209,
  heading: 90,
  name: "Drone",
  altitude: 120,
  speed: 15,
  status: "Hovering",
};

function LoginModal({ onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[99999]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border rounded"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          {isSignup ? (
            <span>
              Already have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setIsSignup(false)}
              >
                Login
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{" "}
              <button
                className="text-blue-600 underline"
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

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onLogin={() => setShowLogin(true)} />
      <main className="flex flex-1 pt-16">
        <div className="flex-1">
          <MapView drone={drone} />
        </div>
        <DroneDetails drone={drone} />
      </main>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
