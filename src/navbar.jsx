export default function Navbar({ onLogin }) {
  return (
    <nav className="w-full bg-white shadow-md h-16 flex items-center justify-center px-6 fixed top-0 left-0 z-[9999]">
      <div className="flex w-full items-center justify-center relative">
        <div className="absolute right-0 flex items-center h-full">
          <button
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-semibold transition"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
        <div className="text-2xl font-bold text-blue-600 tracking-wide mx-auto">
          FlightRadar24 Clone
        </div>
      </div>
    </nav>
  );
}
