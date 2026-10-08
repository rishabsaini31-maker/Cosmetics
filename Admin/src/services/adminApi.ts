const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

function getAuthHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('vanya_auth_token') : null;
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
}

export async function fetchAdminDashboard() {
  try {
    const res = await fetch(`${API_URL}/admin/dashboard`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Could not fetch dashboard metrics.' };
  }
}

export async function fetchAdminOrders(status?: string, paymentStatus?: string, search?: string) {
  try {
    const query = new URLSearchParams();
    if (status) query.append('status', status);
    if (paymentStatus) query.append('paymentStatus', paymentStatus);
    if (search) query.append('search', search);

    const res = await fetch(`${API_URL}/admin/orders?${query.toString()}`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function fetchAdminOrderById(id: string) {
  try {
    const res = await fetch(`${API_URL}/admin/orders/${id}`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Order not found.' };
  }
}

export async function updateAdminOrderStatus(id: string, status: string, note?: string) {
  try {
    const res = await fetch(`${API_URL}/admin/orders/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, note }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Failed to update order status.' };
  }
}

export async function fetchAdminProducts() {
  try {
    const res = await fetch(`${API_URL}/admin/products`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function createAdminProduct(productData: any) {
  try {
    const res = await fetch(`${API_URL}/admin/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Failed to create product.' };
  }
}

export async function updateAdminProduct(id: string, productData: any) {
  try {
    const res = await fetch(`${API_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Failed to update product.' };
  }
}

export async function deleteAdminProduct(id: string) {
  try {
    const res = await fetch(`${API_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Failed to delete product.' };
  }
}

export async function fetchAdminInventory() {
  try {
    const res = await fetch(`${API_URL}/admin/inventory`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function updateAdminInventory(id: string, stock: number, lowStockThreshold?: number) {
  try {
    const res = await fetch(`${API_URL}/admin/inventory/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ stock, lowStockThreshold }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Failed to update stock level.' };
  }
}

export async function fetchAdminCustomers() {
  try {
    const res = await fetch(`${API_URL}/admin/customers`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function fetchAdminContent() {
  try {
    const res = await fetch(`${API_URL}/admin/content`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (error) {
    return { success: false, data: {} };
  }
}

export async function updateAdminContent(contentData: any) {
  try {
    const res = await fetch(`${API_URL}/admin/content`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(contentData),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Failed to save content.' };
  }
}

export async function fetchAdminTheme() {
  try {
    const res = await fetch(`${API_URL}/admin/theme`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (error) {
    return { success: false, data: {} };
  }
}

export async function saveDraftThemeApi(draftData: any) {
  try {
    const res = await fetch(`${API_URL}/admin/theme/draft`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(draftData),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Failed to save draft theme.' };
  }
}

export async function publishThemeApi() {
  try {
    const res = await fetch(`${API_URL}/admin/theme/publish`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Failed to publish theme.' };
  }
}

export async function fetchAdminMarketing() {
  try {
    const res = await fetch(`${API_URL}/admin/marketing`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (error) {
    return { success: false, data: {} };
  }
}

export async function updateAdminMarketing(marketingData: any) {
  try {
    const res = await fetch(`${API_URL}/admin/marketing`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(marketingData),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Failed to save marketing data.' };
  }
}

export async function fetchAdminUsers() {
  try {
    const res = await fetch(`${API_URL}/admin/users`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function updateUserRoleApi(id: string, role: string) {
  try {
    const res = await fetch(`${API_URL}/admin/users/${id}/role`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ role }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Failed to update user role.' };
  }
}

export async function fetchAdminActivity() {
  try {
    const res = await fetch(`${API_URL}/admin/activity`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function fetchAdminSettings() {
  try {
    const res = await fetch(`${API_URL}/admin/settings`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (error) {
    return { success: false, data: {} };
  }
}

export async function updateAdminSettings(settingsData: any) {
  try {
    const res = await fetch(`${API_URL}/admin/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settingsData),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Failed to update settings.' };
  }
}
