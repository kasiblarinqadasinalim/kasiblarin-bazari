import React from "react";

export default function Home({ products }) {
  return (
    <main className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Təzə Elanlar</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">Hələ elan yoxdur.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt="Elan"
                  className="mb-2 w-full h-48 object-cover rounded-md"
                />
              )}
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
              <p className="text-sm text-red-500 font-semibold">{item.price} AZN</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
