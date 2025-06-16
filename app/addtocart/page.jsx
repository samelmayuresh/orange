'use client';

import { useForm } from 'react-hook-form';
import { addToCart } from './action';

export default function AddToCartPage() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('category', data.category);
    formData.append('quantity', data.quantity);
    formData.append('paymentType', data.paymentType);
    formData.append('payment', data.payment);

    await addToCart(formData);
    reset();
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Add to Cart</h1>
      <p style={{ marginBottom: 24 }}>This is the Add to Cart page</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>
            Choose an item
          </label>
          <select
            {...register('category', { required: true })}
            defaultValue=""
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #aaa' }}
          >
            <option value="" disabled>
              Select a product
            </option>
            <optgroup label="🎧 Headphones">
              <option value="headphone-wired">Wired</option>
              <option value="headphone-wireless">Wireless</option>
              <option value="headphone-noise">Noise Cancelling</option>
            </optgroup>
            <optgroup label="💻 Laptops">
              <option value="laptop-windows">Windows Laptop</option>
              <option value="laptop-mac">MacBook</option>
              <option value="laptop-linux">Linux Laptop</option>
            </optgroup>
            <optgroup label="⌨️ Accessories">
              <option value="keyboard">Keyboard</option>
              <option value="mouse">Mouse</option>
              <option value="camera">Camera</option>
              <option value="guitar">Guitar</option>
            </optgroup>
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="quantity" style={{ display: 'block', marginBottom: 4 }}>Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            max="100"
            {...register('quantity', { required: true })}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #aaa' }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Payment type:</label>
          <select {...register('paymentType', { required: true })} defaultValue="visa" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #aaa' }}>
            <option value="visa">Visa</option>
            <option value="mastercard">MasterCard</option>
            <option value="paypal">PayPal</option>
            <option value="upi">UPI</option>
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ marginRight: 12 }}>
            <input
              type="radio"
              {...register('payment', { required: true })}
              value="cod"
              style={{ marginRight: 4 }}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              {...register('payment', { required: true })}
              value="online"
              style={{ marginRight: 4 }}
            />
            Online Payment
          </label>
        </div>

        <button type="submit" style={{ padding: '10px 24px', borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}