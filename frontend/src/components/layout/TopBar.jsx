import React, { useState } from 'react';
import ThemeToggle from '../shared/ThemeToggle';
import { theme } from '../../utils/theme';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext';

export default function TopBar({
  currentFilterName = 'All Notes',
  searchValue,
  onSearchChange,
  isTrash = false,
  isSidebarOpen,
  setIsSidebarOpen
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAllTrash = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete all trash notes?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete("/notes/trash/all");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between p-4 gap-3 transition-colors ${theme.topbar.bg}`}>
      {/* Left Section & Mobile Right Controls */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          >
            ☰
          </button>

          <div className={`text-2xl font-extrabold tracking-tight ${theme.topbar.title}`}>
            {currentFilterName}
          </div>
        </div>

        {/* Right Section for Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          {isTrash && (
            <button
              onClick={handleDeleteAllTrash}
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg text-red-500 hover:bg-red-50"
              title="Delete All Trash Notes"
            >
              🗑️
            </button>
          )}

          <ThemeToggle />

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
            >
              👤
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border dark:border-slate-800 z-50">
                <div className="px-4 py-2 border-b dark:border-slate-800">
                  <p className="font-medium text-gray-900 dark:text-slate-100">{user?.username}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="w-full md:flex-1 md:px-4">
        <div className="max-w-xl mx-auto">
          <div className="relative flex items-center">
            <span
              className={`absolute left-3.5 flex items-center justify-center pointer-events-none ${theme.topbar.search.icon}`}
            >
              🔍
            </span>

            <input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search notes..."
              className={`w-full pl-10 pr-4 py-2 rounded-full transition-all font-medium text-sm focus:outline-none ${theme.topbar.search.input}`}
            />
          </div>
        </div>
      </div>

      {/* Right Section for Desktop */}
      <div className="hidden md:flex items-center gap-3">
        {isTrash && (
          <button
            onClick={handleDeleteAllTrash}
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg text-red-500 hover:bg-red-50"
            title="Delete All Trash Notes"
          >
            🗑️
          </button>
        )}

        <ThemeToggle />

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
          >
            👤
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border dark:border-slate-800 z-50">
              <div className="px-4 py-2 border-b dark:border-slate-800">
                <p className="font-medium text-gray-900 dark:text-slate-100">{user?.username}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}