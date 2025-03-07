"use client"

import { Code2, Play, Sun, Moon, Save } from "lucide-react"

interface NavbarProps {
  handleRun: () => void
  isRunning: boolean
  toggleDarkMode: () => void
  isDarkMode: boolean
  saveStatus: string
}

export default function Navbar({ handleRun, isRunning, toggleDarkMode, isDarkMode, saveStatus }: NavbarProps) {
  return (
    <nav className="bg-[#1e1e1e] text-white px-3 sm:px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-4">
        <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
        <h1 className="text-base sm:text-lg font-semibold hidden xs:block">Live Code Editor</h1>
        {saveStatus && (
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Save className="w-3 h-3" /> {saveStatus}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={handleRun}
          className={`px-2 sm:px-4 py-1 sm:py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-all ${
            isRunning ? "opacity-75" : ""
          }`}
          disabled={isRunning}
        >
          <Play className={`w-3 h-3 sm:w-4 sm:h-4 ${isRunning ? "animate-pulse" : ""}`} />
          <span className="hidden xs:inline">Run</span>
          <span className="text-xs opacity-50 hidden sm:inline">(Ctrl + Enter)</span>
        </button>
        <button
          onClick={toggleDarkMode}
          className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded text-xs sm:text-sm flex items-center"
        >
          {isDarkMode ? <Sun className="w-3 h-3 sm:w-4 sm:h-4" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4" />}
        </button>
      </div>
    </nav>
  )
}

