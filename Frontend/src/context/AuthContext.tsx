'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  AuthResponse,
  apiLogin,
  apiSignup,
  apiVerifyOtp,
  apiResendOtp,
  apiGetMe,
  apiForgotPassword,
  apiResetPassword,
} from '@/services/authApi';

type AuthStep = 'login' | 'signup' | 'otp' | 'forgot' | 'reset';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authStep: AuthStep;
  pendingEmail: string;
  demoOtpHint?: string;
  openAuthModal: (step?: AuthStep, initialEmail?: string) => void;
  closeAuthModal: () => void;
  signupUser: (name: string, email: string, pass: string) => Promise<AuthResponse>;
  verifyOtpCode: (email: string, otp: string) => Promise<AuthResponse>;
  resendOtpCode: (email: string) => Promise<AuthResponse>;
  loginUser: (email: string, pass: string) => Promise<AuthResponse>;
  forgotPasswordReq: (email: string) => Promise<AuthResponse>;
  resetPasswordReq: (email: string, otp: string, newPass: string) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [pendingEmail, setPendingEmail] = useState('');
  const [demoOtpHint, setDemoOtpHint] = useState<string | undefined>(undefined);

  // Restore token & session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('vanya_auth_token');
    const savedUser = localStorage.getItem('vanya_auth_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        
        // Verify with server asynchronously
        apiGetMe(savedToken).then((res) => {
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('vanya_auth_user', JSON.stringify(res.user));
          } else {
            // Token expired or invalid
            logout();
          }
        });
      } catch (err) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const openAuthModal = (step: AuthStep = 'login', initialEmail: string = '') => {
    setAuthStep(step);
    if (initialEmail) setPendingEmail(initialEmail);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setDemoOtpHint(undefined);
  };

  const handleAuthSuccess = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('vanya_auth_token', newToken);
    localStorage.setItem('vanya_auth_user', JSON.stringify(newUser));
    closeAuthModal();
  };

  const signupUser = async (name: string, email: string, pass: string): Promise<AuthResponse> => {
    const res = await apiSignup(name, email, pass);
    if (res.success && res.requiresOtp) {
      setPendingEmail(email);
      setDemoOtpHint(res.demoOtpHint);
      setAuthStep('otp');
    }
    return res;
  };

  const verifyOtpCode = async (email: string, otp: string): Promise<AuthResponse> => {
    const res = await apiVerifyOtp(email, otp);
    if (res.success && res.token && res.user) {
      handleAuthSuccess(res.token, res.user);
    }
    return res;
  };

  const resendOtpCode = async (email: string): Promise<AuthResponse> => {
    const res = await apiResendOtp(email);
    if (res.success) {
      setDemoOtpHint(res.demoOtpHint);
    }
    return res;
  };

  const loginUser = async (email: string, pass: string): Promise<AuthResponse> => {
    const res = await apiLogin(email, pass);
    if (res.success && res.token && res.user) {
      handleAuthSuccess(res.token, res.user);
    } else if (res.requiresOtp) {
      setPendingEmail(email);
      setDemoOtpHint(res.demoOtpHint);
      setAuthStep('otp');
    }
    return res;
  };

  const forgotPasswordReq = async (email: string): Promise<AuthResponse> => {
    const res = await apiForgotPassword(email);
    if (res.success) {
      setPendingEmail(email);
      setDemoOtpHint(res.demoOtpHint);
      setAuthStep('reset');
    }
    return res;
  };

  const resetPasswordReq = async (email: string, otp: string, newPass: string): Promise<AuthResponse> => {
    const res = await apiResetPassword(email, otp, newPass);
    if (res.success && res.token && res.user) {
      handleAuthSuccess(res.token, res.user);
    }
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('vanya_auth_token');
    localStorage.removeItem('vanya_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthModalOpen,
        authStep,
        pendingEmail,
        demoOtpHint,
        openAuthModal,
        closeAuthModal,
        signupUser,
        verifyOtpCode,
        resendOtpCode,
        loginUser,
        forgotPasswordReq,
        resetPasswordReq,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
