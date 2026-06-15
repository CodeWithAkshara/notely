import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { theme as themeStyles } from '../../utils/theme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button 
      onClick={toggleTheme} 
      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all active:scale-95 duration-200 focus:outline-none shadow-sm ${themeStyles.topbar.toggle}`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}


