import React, { useEffect, useState } from 'react'
import { theme } from '../../utils/theme'

const colors = ['default','pastel-yellow','pastel-blue','pastel-green','pastel-pink','pastel-purple','pastel-orange']

export default function NoteModal({ isOpen, onClose, onSave, noteToEdit }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [color, setColor] = useState('default')

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title || '')
      setContent(noteToEdit.content || '')
      setColor(noteToEdit.color || 'default')
    } else {
      setTitle('')
      setContent('')
      // Generate and pre-select a random background color (excluding default white)
      const randomColors = ['pastel-yellow', 'pastel-blue', 'pastel-green', 'pastel-pink', 'pastel-purple', 'pastel-orange']
      const rand = randomColors[Math.floor(Math.random() * randomColors.length)]
      setColor(rand)
    }
  }, [noteToEdit, isOpen])

  if (!isOpen) return null

  const handleSave = () => {
    onSave({ title, content, color })
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[100] px-4" 
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}
    >
      <div 
        style={{ width: 520, maxWidth: '100%' }} 
        className={`p-5 sm:p-7 rounded-[20px] shadow-2xl transition-all transform scale-100 animate-in fade-in zoom-in-95 duration-200 border ${theme.modal.container}`}
      >
        <div className={`mb-5 text-xl font-bold tracking-tight ${theme.modal.title}`}>
          {noteToEdit ? 'Edit Note' : 'New Note'}
        </div>
        
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Note title..." 
          className={`w-full mb-4 pb-2 text-lg bg-transparent focus:outline-none transition-colors ${theme.modal.titleInput}`} 
        />
        
        <textarea 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          rows={8} 
          className={`w-full mb-4 text-base bg-transparent focus:outline-none resize-none min-h-[160px] ${theme.modal.contentArea}`} 
          placeholder="Write your note..." 
        />
        
        <div className="flex justify-end gap-3 font-medium mt-4">
          <button 
            onClick={onClose} 
            className={`px-4 py-2 text-sm transition-colors focus:outline-none ${theme.modal.cancelBtn}`}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className={`px-5 py-2 rounded-lg text-sm text-white active:scale-95 transition-all shadow-sm focus:outline-none ${theme.modal.saveBtn}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}


