// app/additem/page.jsx
'use client';

import React, { useEffect, useState } from 'react';

// Map categories to images in /public/images/
const categoryImages = {
  'headphone-wired': '/images/headphone.jpg',
  'headphone-wireless': '/images/headphone.jpg',
  'headphone-noise': '/images/headphone.jpg',
  'laptop-windows': '/images/laptop.jpg',
  'laptop-mac': '/images/laptop.jpg',
  'laptop-linux': '/images/laptop.jpg',
  keyboard: '/images/keyboard.jpg',
  mouse: '/images/mouse.jpg',
  camera: '/images/camera.jpg',
  guitar: '/images/guitar.jpg',
};

function getImageForCategory(category) {
  return categoryImages[category] || '/images/default.jpg';
}

export default function AddItemPage() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    category: '',
    quantity: '',
    paymentType: 'visa',
    payment: '',
  });
  const [createForm, setCreateForm] = useState({
    category: '',
    quantity: '',
    paymentType: 'visa',
    payment: '',
  });

  // Fetch items
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const res = await fetch('/api/items');
    const data = await res.json();
    setItems(data);
  }

  // Delete item
  async function handleDelete(id) {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    setItems(items.filter(item => item.id !== id));
  }

  // Start editing
  function handleEdit(item) {
    setEditingId(item.id);
    setEditForm({
      category: item.category,
      quantity: item.quantity,
      paymentType: item.paymentType,
      payment: item.payment,
    });
  }

  // Save edit
  async function handleUpdate(e) {
    e.preventDefault();
    await fetch(`/api/items/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    setEditingId(null);
    fetchItems();
  }

  // Handle edit form change
  function handleEditChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  // Handle create form change
  function handleCreateChange(e) {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  }

  // Create new item
  async function handleCreate(e) {
    e.preventDefault();
    await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createForm),
    });
    setCreateForm({
      category: '',
      quantity: '',
      paymentType: 'visa',
      payment: '',
    });
    fetchItems();
  }

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 8 ,marginLeft:450}}>CART 🛒</h1>
      <p style={{ marginBottom: 24 }}></p>


      {/* Item Boxes */}
      {items.map(item => (
        <div
          key={item.id}
          style={{
            border: '1px solid',
            borderRadius: '5px',
            backgroundColor: 'grey',
            maxWidth: '250px',
            minHeight: '370px',
            textAlign: 'center',
            padding: '20px',
            boxShadow: '10px 9px 5px rgba(65, 63, 63, 0.1)',
            color: 'White',
            display: 'inline-block',
            margin: '10px',
            verticalAlign: 'top',
          }}
        >
          <img
            src={getImageForCategory(item.category)}
            alt={item.category}
            style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
          />
          {editingId === item.id ? (
            <form onSubmit={handleUpdate} style={{ marginTop: 12 }}>
              <input
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                style={{ marginBottom: 8, width: '90%' }}
                required
              />
              <input
                name="quantity"
                type="number"
                min="1"
                value={editForm.quantity}
                onChange={handleEditChange}
                style={{ marginBottom: 8, width: '90%' }}
                required
              />
              <select
                name="paymentType"
                value={editForm.paymentType}
                onChange={handleEditChange}
                style={{ marginBottom: 8, width: '90%' }}
              >
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
                <option value="paypal">PayPal</option>
                <option value="upi">UPI</option>
              </select>
              <input
                name="payment"
                value={editForm.payment}
                onChange={handleEditChange}
                style={{ marginBottom: 8, width: '90%' }}
                required
              />
              <div>
                <button type="submit" style={{ marginRight: 8, padding: '6px 14px', borderRadius: 4, background: '#388e3c', color: '#fff', border: 'none', cursor: 'pointer' }}>
                  Save
                </button>
                <button type="button" style={{ padding: '6px 14px', borderRadius: 4, background: '#aaa', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2 style={{ color: 'yellow' }}>{item.category}</h2>
              <p>PaymentType: {item.paymentType}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Payment: {item.payment}</p>
              <div style={{ marginTop: 16 }}>
                <button
                  style={{
                    padding: '8px 14px',
                    borderRadius: '5px',
                    backgroundColor: '#e53935',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: 8,
                    fontSize: 18,
                  }}
                  onClick={() => handleDelete(item.id)}
                  title="Delete"
                >
                  ➖
                </button>
                <button
                  style={{
                    padding: '8px 14px',
                    borderRadius: '5px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 18,
                  }}
                  onClick={() => handleEdit(item)}
                  title="Edit"
                >
                  ✏️
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
