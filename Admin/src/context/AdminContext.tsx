'use client';

import React, { createContext, useContext, useState } from 'react';

export type DateRangeOption =
  | 'Today'
  | 'Yesterday'
  | 'Last 7 Days'
  | 'Last 30 Days'
  | 'Last 90 Days'
  | 'This Month'
  | 'Previous Month'
  | 'This Year'
  | 'Custom Range';

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
}

interface AdminContextType {
  dateRange: DateRangeOption;
  setDateRange: (range: DateRangeOption) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRangeOption>('Last 30 Days');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <AdminContext.Provider
      value={{
        dateRange,
        setDateRange,
        sidebarCollapsed,
        toggleSidebar,
        globalSearch,
        setGlobalSearch,
        toasts,
        showToast,
      }}
    >
      {children}
      {/* Global Admin Toast Floating Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 border text-xs font-label-caps uppercase tracking-wider shadow-2xl flex items-center justify-between transition-all animate-in slide-in-from-bottom-2 ${
              toast.type === 'success'
                ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
                : toast.type === 'error'
                ? 'bg-red-900 text-red-100 border-red-700'
                : 'bg-surface-container-highest text-primary border-surface-container-high'
            }`}
          >
            <span>{toast.text}</span>
            <span className="material-symbols-outlined text-[16px] ml-2">
              {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
            </span>
          </div>
        ))}
      </div>
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return ctx;
}
