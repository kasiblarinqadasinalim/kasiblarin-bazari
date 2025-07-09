import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import PostAd from "./pages/PostAd";
import Auth from "./components/Auth";
import AdminPanel from "./components/AdminPanel";
import { auth } from "./firebase";

function App() {
  const [page, setPage] = useState("auth");
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usr) => {
      setUser(usr);
      if (usr) setPage("home");
      else setPage("auth");
    });
    return unsubscribe;
  }, []);

  if (!user) {
    return <Auth onUserChange={setUser} />;
  }

  return (
    <div className="min-h-screen">
      <Header onNavigate={setPage} user={user} setUser={setUser} />
      {page === "home" && <Home products={products} />}
      {page === "post" && <PostAd onSubmit={ad => setProducts([ad, ...products])} onBack={() => setPage("home")} />}
      {page === "admin" && <AdminPanel user={user} />}
    </div>
  );
}

export default App;
