'use client';

import React, { useState, useEffect } from 'react';
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

  const handleRoleChange = async (id: string, newRole: string) => {
    const res = await updateUserRoleApi(id, newRole);
    if (res.success) {
      showToast('User role updated successfully', 'success');
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
            ACCESS & ROLES
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            User Roles & Administrative Permissions
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
        {loading ? (
          <div className="py-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Loading System Accounts...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-body text-xs">
              <thead>
                <tr className="border-b border-surface-container-high text-secondary font-label-caps text-[0.6875rem] uppercase tracking-wider">
                  <th className="py-3 px-3">User Name</th>
                  <th className="py-3 px-3">Email Address</th>
                  <th className="py-3 px-3">Current Role</th>
                  <th className="py-3 px-3">Registration Date</th>
                  <th className="py-3 px-3 text-right">Role Assignment</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-3 font-display text-sm font-medium text-primary">{u.name}</td>
                    <td className="py-3 px-3 font-mono text-outline">{u.email}</td>
                    <td className="py-3 px-3 font-label-caps text-xs font-bold uppercase text-secondary">{u.role}</td>
                    <td className="py-3 px-3 font-mono text-on-surface-variant">{u.registeredAt}</td>
                    <td className="py-3 px-3 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="bg-surface border border-surface-container-high px-2 py-1 font-label-caps text-[0.625rem] uppercase font-bold text-primary focus:outline-none"
                      >
                        <option value="customer">Customer</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <UsersContent />
      </AdminLayout>
    </AdminProvider>
  );
}
