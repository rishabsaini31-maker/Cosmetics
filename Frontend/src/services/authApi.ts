const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  requiresOtp?: boolean;
  email?: string;
  demoOtpHint?: string;
  token?: string;
  user?: User;
}

export async function apiSignup(name: string, email: string, password: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, message: 'Could not connect to authentication server.' };
  }
}

export async function apiVerifyOtp(email: string, otp: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Verify OTP error:', error);
    return { success: false, message: 'Could not connect to authentication server.' };
  }
}

export async function apiResendOtp(email: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Resend OTP error:', error);
    return { success: false, message: 'Could not connect to authentication server.' };
  }
}

export async function apiLogin(email: string, password: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Could not connect to authentication server.' };
  }
}

export async function apiGetMe(token: string): Promise<{ success: boolean; user?: User }> {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Get me error:', error);
    return { success: false };
  }
}

export async function apiForgotPassword(email: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Could not connect to server.' };
  }
}

export async function apiResetPassword(email: string, otp: string, newPassword: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Could not connect to server.' };
  }
}
