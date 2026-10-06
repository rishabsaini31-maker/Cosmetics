const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('Backend API unreachable, using fallback products data', error);
    return null;
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('Backend API unreachable, using fallback categories data', error);
    return null;
  }
}

export async function subscribeToNewsletter(email: string) {
  try {
    const res = await fetch(`${API_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('Backend API unreachable', error);
    return { success: false, message: 'Could not connect to backend service.' };
  }
}
