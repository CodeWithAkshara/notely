import React, { useState } from 'react'
import { downloadNoteAsTxt, copyToClipboard } from '../../utils/noteUtils'
import { theme } from '../../utils/theme'

export default function NoteCard({ note, onEdit, onDelete, onPin, onTrash, onArchive, onRestore, onFavorite }) {
  const [copied, setCopied] = useState(false)
  const bgClasses = theme.cards.colorMap[note.color] || theme.cards.colorMap['default']
  const formatted = note.updatedAt ? new Date(note.updatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''

  const handleCopy = async (e) => {
    e.stopPropagation()
    const success = await copyToClipboard(note.content)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={`relative p-5 rounded-2xl border flex flex-col justify-between group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md min-h-[180px] ${bgClasses}`}>
      <div>
        {/* show pinned badge only for non-trash notes */}
        {note.status !== 'trash' && note.isPinned && (
          <div className="absolute right-3.5 top-3.5 transition-opacity duration-150 opacity-100 group-hover:opacity-0 text-amber-500 dark:text-amber-400">📌</div>
        )}
        <div className={`font-bold text-lg mb-2 tracking-tight ${theme.cards.title}`}>{note.title}</div>
        <div className={`text-sm mb-4 line-clamp-5 leading-relaxed break-words whitespace-pre-wrap ${theme.cards.content}`}>{note.content}</div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/[0.03] dark:border-white/[0.03]">
        <div className={`text-xs font-medium mr-2 ${theme.cards.date}`}>{formatted}</div>

        {/* action buttons */}
        <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 justify-end">          {note.status === 'trash' ? (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onRestore(note._id); }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-105 active:scale-95 border ${theme.cards.actionBtn}`}
              title="Restore Note"
            >
              🔄
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(note._id); }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-105 active:scale-95 border ${theme.cards.actionBtn}`}
              title="Delete Permanently"
            >
              🗑️
            </button>
          </>
        ) : note.status === 'archived' ? (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(note); }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-105 active:scale-95 border ${theme.cards.actionBtn}`}
              title="Edit Note"
            >
              ✏️
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onRestore(note._id); }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-105 active:scale-95 border ${theme.cards.actionBtn}`}
              title="Unarchive"
            >
              ↩️
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onTrash(note._id); }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-105 active:scale-95 border ${theme.cards.actionBtn}`}
              title="Move to Trash"
            >
              🗑️
            </button>
          </>
        ) : (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(note); }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-105 active:scale-95 border ${theme.cards.actionBtn}`}
              title="Edit Note"
            >
              ✏️
            </button>
            <button
              onClick={handleCopy}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-105 active:scale-95 border font-medium ${theme.cards.actionBtn}`}
              title="Copy Content"
            >
              {copied ? '✅' : '📋'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); downloadNoteAsTxt(note); }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-105 active:scale-95 border ${theme.cards.actionBtn}`}
              title="Download .txt"
            >
              ⬇️
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onFavorite(note._id, note.isFavorite); }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-105 active:scale-95 border font-medium ${theme.cards.actionBtn}`}
              title={note.isFavorite ? "Remove Favorite" : "Add Favorite"}
            >
              {note.isFavorite ? '⭐' : '☆'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onPin(note._id, note.isPinned); }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-105 active:scale-95 border ${theme.cards.actionBtn}`}
              title={note.isPinned ? "Unpin Note" : "Pin Note"}
            >
              📌
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onArchive(note._id); }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-105 active:scale-95 border ${theme.cards.actionBtn}`}
              title="Archive Note"
            >
              🗄️
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onTrash(note._id); }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-105 active:scale-95 border ${theme.cards.actionBtn}`}
              title="Move to Trash"
            >
              🗑️
            </button>
          </>
        )}
        </div>
      </div>
    </div>
  )
}
