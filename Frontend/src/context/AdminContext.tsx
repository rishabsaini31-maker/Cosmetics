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

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AdminContextType {
  dateRange: DateRangeOption;
  setDateRange: (range: DateRangeOption) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRangeOption>('Last 30 Days');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}`;
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

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
        setSidebarCollapsed,
        toggleSidebar,
        globalSearch,
        setGlobalSearch,
        toasts,
        showToast,
      }}
    >
      {children}
      {/* Toast Notification Portal */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 border shadow-xl flex items-center justify-between text-xs font-label-caps uppercase tracking-wider animate-in fade-in slide-in-from-bottom-2 ${
              toast.type === 'error'
                ? 'bg-surface-container-lowest border-error text-error'
                : toast.type === 'info'
                ? 'bg-surface-container-lowest border-primary text-primary'
                : 'bg-surface-container-lowest border-secondary text-secondary'
            }`}
          >
            <span>{toast.message}</span>
            <span className="ml-3 font-mono opacity-60">✓</span>
          </div>
        ))}
      </div>
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
