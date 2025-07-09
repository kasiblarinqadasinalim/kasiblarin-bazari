import React from "react";
import { signOut } from "../firebase";

export default function Header({ onNavigate, user, setUser }) {
  const handleLogout = async () => {
    await signOut();
    setUser(null);
    onNavigate("auth");
  };

  return (
    <header className="bg-red-500 text-white p-4 flex justify-between items-center rounded-b-2xl shadow-md">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => onNavigate("home")}>
        Kasıbların Qadasın Alım
      </h1>
      {user ? (
        <div className="flex items-center gap-4">
          <span>{user.email}</span>

          {/* Admin düyməsi: sənin emailin */}
          {["bakiliismayil18@gmail.com"].includes(user.email) && (
            <button
              onClick={() => onNavigate("admin")}
              className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
            >
              Admin Panel
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-white text-red-500 px-3 py-1 rounded hover:bg-red-100"
          >
            Çıxış et
          </button>
          <button
            onClick={() => onNavigate("post")}
            className="bg-white text-red-500 px-4 py-2 rounded-xl font-semibold hover:bg-red-100 transition"
          >
            Elan yerləşdir
          </button>
        </div>
      ) : (
        <button
          onClick={() => onNavigate("auth")}
          className="bg-white text-red-500 px-4 py-2 rounded-xl font-semibold hover:bg-red-100 transition"
        >
          Giriş
        </button>
      )}
    </header>
  );
}
