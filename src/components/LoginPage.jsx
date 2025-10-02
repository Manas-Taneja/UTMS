import React, { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if ((username === 'Admin' && password === 'Admin123') || (username === 'User' && password === 'User123')) {
      onLogin(username);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center text-slate-200 mb-6">UTMS Login</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-slate-400 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 text-slate-200 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Admin or User"
          />
        </div>
        <div className="mb-6">
          <label className="block text-slate-400 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-slate-200 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Admin123 or User123"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
