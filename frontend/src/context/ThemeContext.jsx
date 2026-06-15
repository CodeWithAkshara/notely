import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    try {
      const t = localStorage.getItem('theme') || 'light'
      setTheme(t)
      if (t === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    } catch (err) { console.warn(err) }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem('theme', next) } catch (e) {}
    if (next === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
