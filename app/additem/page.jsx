// app/additem/page.jsx
'use client';
import React, { useEffect, useState } from 'react';

const categoryImages = {
  Headphone: '/last/public/headphone1.jpg',
  Laptop: '/headphone1.jpg',
  // Add more mappings as needed
};

function getImageForCategory(category) {
  return categoryImages[category] || '/images/default.jpg'; // fallback image
}

export default function AddItemPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch('/api/items');
      const data = await res.json();
      console.log('Fetched data:', data); // <-- Add this
      setItems(data);
    }
    fetchItems();
  }, []);

  async function handleDelete(id) {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    setItems(items.filter(item => item.id !== id));
  }

  return (
    <div>
      <h1>CART</h1>
      <p></p>
      {items.map(item => (
        <div
          key={item.id}
          style={{
            border: '1px solid',
            borderRadius: '5px',
            backgroundColor: 'grey',
            maxWidth: '250px',
            maxHeight: '350px', // Increased max height
            minHeight: '320px', // Optional: ensure enough space
            textAlign: 'center',
            padding: '20px',
            boxShadow: '10px 9px 5px rgba(65, 63, 63, 0.1)',
            color: 'White',
            display: 'inline-block',
            margin: '10px',
            cursor: 'pointer',
          }}
        >
          <h2 style={{ color: 'yellow' }}>{item.category}</h2>
          <img
            src={getImageForCategory(item.category)}
            alt={item.category}
            style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
          />
          <p>PaymentType: {item.paymentType}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Payment: {item.payment}</p>
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: '#fff',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => handleDelete(item.id)}
          >
            ➖
          </button>
        </div>
      ))}
    </div>
  );
}
