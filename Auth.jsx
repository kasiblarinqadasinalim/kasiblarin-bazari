import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "../firebase";

export default function Auth({ onUserChange }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onUserChange(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        onUserChange(userCredential.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    onUserChange(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      {!auth.currentUser ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{isLogin ? "Giriş" : "Qeydiyyat"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="Şifrə"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              {isLogin ? "Daxil ol" : "Qeydiyyatdan keç"}
            </button>
          </form>
          <p className="mt-4 text-center">
            {isLogin ? "Hesabın yoxdur? " : "Hesabın var? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-500 font-semibold underline"
            >
              {isLogin ? "Qeydiyyatdan keç" : "Giriş et"}
            </button>
          </p>
        </>
      ) : (
        <div className="text-center">
          <p className="mb-4">Salam, {auth.currentUser.email}</p>
          <button
            onClick={handleLogout}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Çıxış et
          </button>
        </div>
      )}
    </div>
  );
}
