'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminUsers, updateUserRoleApi } from '@/services/adminApi';

function UsersContent() {
  const { showToast } = useAdmin();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    const res = await fetchAdminUsers();
    if (res.success) {
      setUsers(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string, email: string) => {
    const res = await updateUserRoleApi(userId, newRole);
    if (res.success) {
      showToast(`Updated role for ${email} to ${newRole}`, 'success');
      loadUsers();
    } else {
      showToast(res.message || 'Role update failed', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            ACCESS CONTROL
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Users & Role Permissions
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-surface-container-high overflow-x-auto">
        {loading ? (
          <div className="p-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Loading user permissions...
          </div>
        ) : (
          <table className="w-full text-left font-body text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container-high font-label-caps text-[0.6875rem] uppercase tracking-wider text-secondary">
                <th className="p-3">User Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Role Assignment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-3 font-display text-sm font-medium text-primary">{u.name}</td>
                  <td className="p-3 font-mono text-outline">{u.email}</td>
                  <td className="p-3">
                    <span className="font-label-caps text-[0.625rem] uppercase tracking-wider bg-surface-container px-2 py-0.5 border border-surface-container-high font-bold text-primary">
                      {u.role || 'user'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 font-label-caps text-[0.625rem] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {u.isVerified ? 'VERIFIED' : 'UNVERIFIED'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <select
                      value={u.role || 'user'}
                      onChange={(e) => handleRoleChange(u.id, e.target.value, u.email)}
                      className="bg-surface-container-lowest border border-surface-container-high px-2 py-1 font-label-caps text-[0.625rem] uppercase tracking-wider text-primary focus:outline-none"
                    >
                      <option value="user">User (Customer)</option>
                      <option value="admin">Master Administrator</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <UsersContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
