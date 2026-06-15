import React, { useEffect, useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'
import NoteGrid from '../components/notes/NoteGrid'
import NoteModal from '../components/notes/NoteModal'
import useNotes from '../hooks/useNotes'
import useCsrf from '../hooks/useCsrf'
import { theme } from '../utils/theme'
import api from '../api/axiosInstance'

export default function DashboardPage() {
  const [filters, setFilters] = useState({ search: '', status: 'active', color: '', isFavorite: undefined })
  const [searchInput, setSearchInput] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(null)
  const [users, setUsers] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true)
    }
  }, [])

  useCsrf()
  const { notes, loading, error, fetchNotes, createNote, updateNote, deleteNote, trashNote, archiveNote, restoreNote, pinNote, favoriteNote } = useNotes(filters)
  
  // Fetch all notes once for counting (no filter)
  const { notes: allNotes } = useNotes({ search: '', status: 'active', color: '', isFavorite: undefined })

  useEffect(() => {
    const t = setTimeout(() => setFilters(prev => ({ ...prev, search: searchInput })), 400)
    return () => clearTimeout(t)
  }, [searchInput])

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users')
      setUsers(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  fetchUsers()
}, [])

  const handleNewNote = () => { setNoteToEdit(null); setIsModalOpen(true) }
  const handleEdit = (note) => { setNoteToEdit(note); setIsModalOpen(true) }
  const handleSave = async (formData) => {
    if (noteToEdit) await updateNote(noteToEdit._id, formData)
    else await createNote(formData)
  }

  const handleFilterChange = (newFilt) => {
    setFilters(prev => ({ ...prev, ...newFilt }))
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }

  // compute counts for sidebar — use allNotes (active only) plus separately fetch archived/trash counts
  const allCount = (allNotes || []).length
  const favoriteCount = (allNotes || []).filter(n => n.isFavorite).length
  
  // For archive and trash, we need to fetch them separately
  const { notes: archivedNotes } = useNotes({ search: '', status: 'archived', color: '', isFavorite: undefined })
  const { notes: trashNotes } = useNotes({ search: '', status: 'trash', color: '', isFavorite: undefined })
  
  const archiveCount = (archivedNotes || []).length
  const trashCount = (trashNotes || []).length

  const activeKey = (filters.status === 'archived') ? 'archive' : (filters.status === 'trash') ? 'trash' : (filters.isFavorite ? 'favorites' : 'all')
  const filterLabelMap = { all: 'All Notes', favorites: 'Favorites', archive: 'Archive', trash: 'Trash' }
  const adminCount = users.filter(user => user.role === "admin").length
  return (
    <div className={`flex transition-colors min-h-screen ${theme.layout.bgClasses} ${theme.layout.textClasses}`}>
      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:relative md:z-auto transition-transform duration-300 ease-in-out md:transition-all md:overflow-hidden ${
          isSidebarOpen 
            ? "translate-x-0 md:w-[280px]" 
            : "-translate-x-full md:translate-x-0 md:w-0"
        }`}
      >
        <Sidebar
          activeFilter={activeKey}
          onFilterChange={handleFilterChange}
          counts={{
            all: allCount,
            favorites: favoriteCount,
            archive: archiveCount,
            trash: trashCount,
            admin: adminCount
          }}
        />
      </div>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className={`flex-1 min-h-screen transition-colors flex flex-col ${theme.layout.bgClasses}`}>
        
        <TopBar
        currentFilterName={filterLabelMap[activeKey]}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        isTrash={activeKey === "trash"}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
        <div className="p-4 flex-1">
          <NoteGrid 
            currentFilter={activeKey} 
            notes={notes} 
            loading={loading} 
            error={error} 
            onEdit={handleEdit} 
            onDelete={deleteNote} 
            onPin={pinNote} 
            onFavorite={favoriteNote} 
            onTrash={trashNote} 
            onArchive={archiveNote} 
            onRestore={restoreNote} 
          />
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button 
        onClick={handleNewNote} 
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full text-white flex items-center justify-center text-3xl hover:scale-105 active:scale-95 transition-all duration-200 z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 bg-gradient-to-tr ${theme.brand.primaryGradient} ${theme.brand.primaryShadowMd} ${theme.brand.primaryShadowHover} ${theme.brand.primaryRing}`}
        title="Create New Note"
      >
        +
      </button>

      <NoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        noteToEdit={noteToEdit} 
      />
    </div>
  )
}

