export const theme = {
  // Brand color (purple)
  brand: {
    primary: '#7C3AED',
    primaryHover: '#6D28D9',
    primaryGradient: 'from-[#7C3AED] to-[#8B5CF6]',
    primaryShadow: 'shadow-[#7C3AED]/20',
    primaryRing: 'focus:ring-[#7C3AED]',
    primaryShadowMd: 'shadow-[0_4px_14px_rgba(124,58,237,0.45)]',
    primaryShadowHover: 'hover:shadow-[0_6px_20px_rgba(124,58,237,0.6)]',
  },

  // Main Page Layout
  layout: {
    bodyLight: '#F4F4F0',
    bodyDark: '#0f172a',
    bgClasses: 'bg-[#F4F4F0] dark:bg-[#0f172a]',
    textClasses: 'text-gray-900 dark:text-slate-100',
  },

  // Sidebar Component Styling
  sidebar: {
    bg: 'bg-white border-r border-gray-200 dark:bg-slate-950 dark:border-slate-800/60',
    brandText: 'text-gray-900 dark:text-slate-100',
    navActive: 'bg-[#EDE9FE] text-[#7C3AED] dark:bg-[#7C3AED]/20 dark:text-[#a78bfa] border-l-[3px] border-[#7C3AED]',
    navInactive: 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900/40 dark:hover:text-slate-200 border-l-[3px] border-transparent',
    badge: 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400',
  },

  // Top Bar Component Styling
  topbar: {
    bg: 'bg-white border-b border-gray-100 dark:bg-[#0f172a] dark:border-slate-800/60',
    title: 'text-gray-900 dark:text-slate-100',
    search: {
      input: 'bg-gray-100 border border-transparent focus:bg-white focus:border-gray-200 dark:bg-slate-800/45 dark:border-slate-700/30 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:bg-slate-800/70 dark:focus:border-slate-600/50',
      icon: 'text-gray-400 dark:text-slate-500',
    },
    toggle: 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700',
  },

  // Note Modal Styling
  modal: {
    overlayBg: 'rgba(0,0,0,0.5)',
    container: 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/85 text-gray-900 dark:text-slate-100',
    title: 'text-gray-900 dark:text-slate-100',
    titleInput: 'border-b border-gray-200 dark:border-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:border-[#7C3AED] dark:focus:border-[#7C3AED]',
    contentArea: 'text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500',
    divider: 'border-gray-100 dark:border-slate-800/80',
    cancelBtn: 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200',
    saveBtn: 'bg-[#7C3AED] hover:bg-[#6D28D9] shadow-[#7C3AED]/20',
  },

  // Note Cards Styling
  cards: {
    // Note categories / color maps
    colorMap: {
      'default': 'bg-white border-gray-200 dark:bg-[#1e293b] dark:border-slate-800/80 dark:shadow-[0_4px_20px_rgba(30,41,59,0.15)]',
      'pastel-yellow': 'bg-[#FEFCE8] border-yellow-250 dark:bg-[#2d2a1c] dark:border-yellow-650/45 dark:shadow-[0_4px_20px_rgba(234,179,8,0.07)]',
      'pastel-blue': 'bg-[#EFF6FF] border-blue-250 dark:bg-[#1b263b] dark:border-blue-650/45 dark:shadow-[0_4px_20px_rgba(59,130,246,0.07)]',
      'pastel-green': 'bg-[#F0FDF4] border-green-250 dark:bg-[#152e22] dark:border-green-650/45 dark:shadow-[0_4px_20px_rgba(34,197,94,0.07)]',
      'pastel-pink': 'bg-[#FFF1F2] border-pink-250 dark:bg-[#331c26] dark:border-pink-650/45 dark:shadow-[0_4px_20px_rgba(236,72,153,0.07)]',
      'pastel-purple': 'bg-[#FAF5FF] border-purple-250 dark:bg-[#271c3a] dark:border-purple-650/45 dark:shadow-[0_4px_20px_rgba(168,85,247,0.07)]',
      'pastel-orange': 'bg-[#FFF7ED] border-orange-250 dark:bg-[#32231b] dark:border-orange-650/45 dark:shadow-[0_4px_20px_rgba(249,115,22,0.07)]'
    },
    title: 'text-gray-900 dark:text-slate-100',
    content: 'text-gray-600 dark:text-slate-400',
    date: 'text-gray-400 dark:text-slate-500',
    actionBtn: 'bg-white/95 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 border-black/[0.05] dark:border-white/[0.05]',
  },

  // Note modal color picker styles
  colorPicker: {
    'default': 'bg-white dark:bg-[#1e293b] border-gray-300 dark:border-slate-700',
    'pastel-yellow': 'bg-[#FEFCE8] dark:bg-[#2d2a1c] border-yellow-300/80 dark:border-yellow-700/50',
    'pastel-blue': 'bg-[#EFF6FF] dark:bg-[#1b263b] border-blue-300/80 dark:border-blue-700/50',
    'pastel-green': 'bg-[#F0FDF4] dark:bg-[#152e22] border-green-300/80 dark:border-green-700/50',
    'pastel-pink': 'bg-[#FFF1F2] dark:bg-[#331c26] border-pink-300/80 dark:border-pink-700/50',
    'pastel-purple': 'bg-[#FAF5FF] dark:bg-[#271c3a] border-purple-300/80 dark:border-purple-700/50',
    'pastel-orange': 'bg-[#FFF7ED] dark:bg-[#32231b] border-orange-300/80 dark:border-orange-700/50'
  },

  // NoteGrid Loading skeletons
  skeletons: {
    card: 'bg-gray-200 dark:bg-slate-800/60 border-transparent dark:border-slate-800/50',
  },
  
  // Empty states
  emptyState: {
    text: 'text-gray-400 dark:text-slate-500',
  }
}
