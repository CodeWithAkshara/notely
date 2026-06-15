import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { theme } from '../../utils/theme'


export default function Sidebar({ activeFilter = 'all', onFilterChange, counts = {} }) {
  const { user } = useAuth()
 

  const navItem = (key, icon, label, onClick) => {
    const isActive = activeFilter === key

    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all ${
          isActive ? theme.sidebar.navActive : theme.sidebar.navInactive
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <span className="font-medium">{label}</span>
        </div>

        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${theme.sidebar.badge}`}>
          {counts[key] ?? 0}
        </span>
      </button>
    )
  }

  return (
    <aside
      className={`w-[280px] p-4 h-screen sticky top-0 flex flex-col ${theme.sidebar.bg}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          style={{ width: 40, height: 40, backgroundColor: theme.brand.primary }}
          className="rounded-xl flex items-center justify-center shadow-sm text-white"
        >
          <span className="text-lg">✏️</span>
        </div>

        <div
          onClick={() =>
            onFilterChange({
              status: 'active',
              isFavorite: undefined
            })
          }
        className={`font-extrabold text-xl tracking-tight cursor-pointer ${theme.sidebar.brandText}`}
      >
        Notely
      </div>
      </div>

      <div className="space-y-1.5 flex-1">
        {navItem('all', '📄', 'All Notes', () =>
          onFilterChange({ status: 'active', isFavorite: undefined })
        )}

        {navItem('favorites', '⭐', 'Favorites', () =>
          onFilterChange({ status: 'active', isFavorite: true })
        )}

        {navItem('archive', '🗃️', 'Archive', () =>
          onFilterChange({ status: 'archived', isFavorite: undefined })
        )}

        {navItem('trash', '🗑️', 'Trash', () =>
          onFilterChange({ status: 'trash', isFavorite: undefined })
        )}
      </div>
    </aside>
  )
}