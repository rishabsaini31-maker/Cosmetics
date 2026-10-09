'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authStep,
    pendingEmail,
    demoOtpHint,
    closeAuthModal,
    loginUser,
    signupUser,
    verifyOtpCode,
    resendOtpCode,
    forgotPasswordReq,
    resetPasswordReq,
    openAuthModal,
  } = useAuth();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendTimer, setResendTimer] = useState(60);

  // Sync email when step changes to OTP
  useEffect(() => {
    if (pendingEmail) {
      setEmail(pendingEmail);
    }
  }, [pendingEmail, authStep]);

  // Resend OTP Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (authStep === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [authStep, resendTimer]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const res = await loginUser(email, password);
    setLoading(false);

    if (!res.success && !res.requiresOtp) {
      setErrorMsg(res.message || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please ensure both password fields are identical.');
      return;
    }

    setLoading(true);

    const res = await signupUser(name, email, password);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.message || 'Could not complete registration.');
    } else {
      setSuccessMsg(res.message);
      setResendTimer(60);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const res = await verifyOtpCode(email, otp);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.message || 'OTP verification failed. Please try again.');
    }
  };

  const handleResendOtpClick = async () => {
    if (resendTimer > 0) return;
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const res = await resendOtpCode(email);
    setLoading(false);

    if (res.success) {
      setSuccessMsg(`New 6-digit OTP sent to ${email}`);
      setResendTimer(60);
    } else {
      setErrorMsg(res.message || 'Could not resend OTP.');
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const res = await forgotPasswordReq(email);
    setLoading(false);

    if (res.success) {
      setSuccessMsg(res.message);
      setResendTimer(60);
    } else {
      setErrorMsg(res.message || 'Failed to process request.');
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const res = await resetPasswordReq(email, otp, newPassword);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.message || 'Password reset failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-primary/70 backdrop-blur-md transition-opacity">
      <div className="bg-surface p-space-xl lg:p-space-2xl border border-surface-container-high max-w-md w-full relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 font-label-caps text-xs text-on-surface-variant hover:text-primary transition-colors tracking-widest border border-surface-container-high px-2 py-1 bg-surface-container-lowest"
          aria-label="Close Authentication Modal"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="text-center mb-space-xl">
          <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.3em] text-secondary font-bold block mb-1">
            ATELIER PASSPORT
          </span>
          <h2 className="font-display text-3xl uppercase tracking-[0.2em] text-primary font-medium">
            VĀNYA
          </h2>
          <div className="w-8 h-0.5 bg-secondary mx-auto mt-2" />
        </div>

        {/* Mode Selector Tabs (Login vs Signup) */}
        {(authStep === 'login' || authStep === 'signup') && (
          <div className="flex border-b border-surface-container-high mb-space-lg">
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className={`flex-1 py-2 font-label-caps text-xs uppercase tracking-[0.2em] border-b-2 transition-all ${
                authStep === 'login'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => openAuthModal('signup')}
              className={`flex-1 py-2 font-label-caps text-xs uppercase tracking-[0.2em] border-b-2 transition-all ${
                authStep === 'signup'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Status Alerts */}
        {errorMsg && (
          <div className="mb-space-md p-3 bg-error-container/40 border border-error/20 text-error text-xs font-body">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-space-md p-3 bg-surface-container-lowest border border-secondary text-secondary text-xs font-label-caps uppercase tracking-wider">
            {successMsg}
          </div>
        )}

        {/* Demo OTP Hint Box */}
        {demoOtpHint && (authStep === 'otp' || authStep === 'reset') && (
          <div className="mb-space-md p-3 bg-secondary-container/30 border border-secondary/40 text-center">
            <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block">
              DEMO EMAIL VERIFICATION PASSCODE
            </span>
            <span className="font-mono text-2xl font-bold tracking-[0.25em] text-primary block mt-1">
              {demoOtpHint}
            </span>
            <span className="font-body text-[0.6875rem] text-on-surface-variant block mt-1">
              (Auto-generated security OTP for fast verification testing)
            </span>
          </div>
        )}

        {/* ================= STEP: LOGIN ================= */}
        {authStep === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-surface-container-lowest border border-surface-container-high px-3 py-2.5 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => openAuthModal('forgot')}
                  className="font-label-caps text-[0.625rem] uppercase tracking-wider text-secondary hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-container-lowest border border-surface-container-high pl-3 pr-10 py-2.5 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? 'AUTHENTICATING...' : 'SIGN IN TO PASSPORT'}
            </button>
          </form>
        )}

        {/* ================= STEP: SIGNUP ================= */}
        {authStep === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-surface-container-lowest border border-surface-container-high px-3 py-2.5 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-surface-container-lowest border border-surface-container-high px-3 py-2.5 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            {/* Password Field 1 with Show/Hide toggle */}
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-surface-container-lowest border border-surface-container-high pl-3 pr-10 py-2.5 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password Field 2 with Show/Hide toggle */}
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className={`w-full bg-surface-container-lowest border pl-3 pr-10 py-2.5 font-body text-xs text-on-surface focus:outline-none ${
                    confirmPassword && confirmPassword !== password
                      ? 'border-error focus:border-error'
                      : 'border-surface-container-high focus:border-primary'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-1"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <span className="font-body text-[0.6875rem] text-error mt-1 block font-semibold">
                  Passwords do not match.
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || (!!confirmPassword && password !== confirmPassword)}
              className="w-full bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? 'CREATING ACCOUNT...' : 'REGISTER & RECEIVE OTP'}
            </button>
          </form>
        )}

        {/* ================= STEP: OTP VERIFICATION ================= */}
        {authStep === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-space-md">
            <div className="text-center mb-space-md">
              <span className="font-label-caps text-[0.6875rem] uppercase tracking-widest text-secondary font-bold block mb-1">
                EMAIL VERIFICATION REQUIRED
              </span>
              <p className="font-editorial-serif text-xs text-on-surface-variant leading-relaxed">
                A 6-digit passcode was sent to <strong className="text-primary">{email}</strong>.
              </p>
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1 text-center">
                Enter 6-Digit Passcode
              </label>
              <input
                type="text"
                required
                maxLength={6}
                pattern="[0-9]{6}"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full bg-surface-container-lowest border border-surface-container-high px-3 py-3 text-center font-mono text-xl tracking-[0.4em] text-primary focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
            >
              {loading ? 'VERIFYING PASSCODE...' : 'VERIFY & ACCESS PASSPORT'}
            </button>

            <div className="flex justify-between items-center pt-2 text-xs font-label-caps uppercase tracking-wider">
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="text-on-surface-variant hover:text-primary"
              >
                ← Back to Login
              </button>

              <button
                type="button"
                onClick={handleResendOtpClick}
                disabled={resendTimer > 0 || loading}
                className="text-secondary font-bold hover:underline disabled:opacity-40"
              >
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend Code'}
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP: FORGOT PASSWORD ================= */}
        {authStep === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-space-md">
            <div className="text-center mb-space-md">
              <span className="font-label-caps text-[0.6875rem] uppercase tracking-widest text-secondary font-bold block mb-1">
                RECOVER ACCESS
              </span>
              <p className="font-editorial-serif text-xs text-on-surface-variant">
                Enter your account email to receive a password reset OTP.
              </p>
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-surface-container-lowest border border-surface-container-high px-3 py-2.5 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
            >
              {loading ? 'SENDING RESET CODE...' : 'SEND RESET OTP'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary"
              >
                ← Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP: RESET PASSWORD ================= */}
        {authStep === 'reset' && (
          <form onSubmit={handleResetSubmit} className="space-y-space-md">
            <div className="text-center mb-space-md">
              <span className="font-label-caps text-[0.6875rem] uppercase tracking-widest text-secondary font-bold block mb-1">
                RESET PASSWORD
              </span>
              <p className="font-editorial-serif text-xs text-on-surface-variant">
                Enter the OTP sent to <strong className="text-primary">{email}</strong> and your new password.
              </p>
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                6-Digit Passcode
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full bg-surface-container-lowest border border-surface-container-high px-3 py-2 text-center font-mono text-lg tracking-[0.3em] text-primary focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-surface-container-lowest border border-surface-container-high pl-3 pr-10 py-2.5 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
            >
              {loading ? 'RESETTING PASSWORD...' : 'UPDATE PASSWORD & SIGN IN'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
