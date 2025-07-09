import React, { useEffect, useState } from "react";
import { db, collection, getDocs, deleteDoc, doc } from "../firebase";

const adminEmails = ["bakiliismayil18@gmail.com"]; // Sənin admin emailin

export default function AdminPanel({ user }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !adminEmails.includes(user.email)) return;
    async function fetchAds() {
      const querySnapshot = await getDocs(collection(db, "ads"));
      setAds(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchAds();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Elanı silmək istədiyinizdən əminsiniz?")) return;
    await deleteDoc(doc(db, "ads", id));
    setAds(ads.filter(ad => ad.id !== id));
  };

  if (!adminEmails.includes(user.email)) {
    return <p className="p-4 text-red-600 font-bold">Siz admin deyilsiniz!</p>;
  }

  if (loading) return <p className="p-4">Yüklənir...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Elanlar</h2>
      {ads.length === 0 ? (
        <p>Heç bir elan yoxdur.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Başlıq</th>
              <th className="border border-gray-300 p-2">Qiymət</th>
              <th className="border border-gray-300 p-2">Təsvir</th>
              <th className="border border-gray-300 p-2">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {ads.map(ad => (
              <tr key={ad.id}>
                <td className="border border-gray-300 p-2">{ad.title}</td>
                <td className="border border-gray-300 p-2">{ad.price} AZN</td>
                <td className="border border-gray-300 p-2">{ad.desc}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
