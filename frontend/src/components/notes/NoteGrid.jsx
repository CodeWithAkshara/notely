import React from 'react'
import NoteCard from './NoteCard'
import { theme } from '../../utils/theme'

export default function NoteGrid({ currentFilter = 'all', notes, loading, error, onEdit, onDelete, onPin, onFavorite, onTrash, onArchive, onRestore }) {


  if (loading) {
    return (
      <div className="py-6 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`h-[180px] animate-pulse rounded-2xl border ${theme.skeletons.card}`} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-6 px-6 text-red-500 font-semibold text-center dark:text-red-400">
        {error}
      </div>
    )
  }

  if (!notes || notes.length === 0) {
    const map = {
      all: { icon: '📝', text: 'No notes here yet' },
      favorites: { icon: '⭐', text: 'No favorites yet' },
      archive: { icon: '🗃️', text: 'No archived notes' },
      trash: { icon: '🗑️', text: 'No trashed notes' },
    }
    const { icon, text } = map[currentFilter] || map.all
    return (
      <div
        style={{ height: 'calc(100vh - 200px)' }}
        className={`flex flex-col items-center justify-center ${theme.emptyState.text}`}
      >
        <div className="text-7xl mb-4 select-none filter dark:opacity-85">{icon}</div>
        <div className="text-lg font-semibold tracking-tight">{text}</div>
      </div>
    )
  }

  const sortedNotes = (notes || []).slice().sort((a, b) => {
    // pinned notes first
    const pa = a.isPinned ? 1 : 0
    const pb = b.isPinned ? 1 : 0
    if (pa !== pb) return pb - pa
    // then newest
    return new Date(b.updatedAt) - new Date(a.updatedAt)
  })

  return (
    <div className="py-6 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedNotes.map(n => (
        <NoteCard
          key={n._id}
          note={n}
          onEdit={onEdit}
          onDelete={onDelete}
          onPin={onPin}
          onFavorite={onFavorite}
          onTrash={onTrash}
          onArchive={onArchive}
          onRestore={onRestore}
        />
      ))}
    </div>
  )
}


