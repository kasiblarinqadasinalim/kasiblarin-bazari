import React, { useState } from "react";
import { db, collection, addDoc, serverTimestamp } from "../firebase";

export default function PostAd({ onBack }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !price || !preview) {
      alert("Zəhmət olmasa bütün sahələri doldurun");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "ads"), {
        title,
        desc,
        price,
        image: preview,
        createdAt: serverTimestamp(),
      });
      alert("Elan uğurla əlavə edildi!");
      setTitle("");
      setDesc("");
      setPrice("");
      setImage(null);
      setPreview(null);
      onBack();
    } catch (error) {
      alert("Elan əlavə edilərkən xəta baş verdi: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <button onClick={onBack} className="text-red-500 mb-4">
        ← Geri qayıt
      </button>
      <h2 className="text-2xl font-bold mb-4">Yeni Elan Yerləşdir</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Başlıq"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Təsvir"
          rows="4"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Qiymət"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-48 object-cover rounded"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "Yüklənir..." : "Elan Yerləşdir"}
        </button>
      </form>
    </div>
  );
}
