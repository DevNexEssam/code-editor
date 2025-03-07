"use client"

import { useEffect, useState } from "react"
import Editor from "@monaco-editor/react"

interface CodeEditorProps {
  html: string
  css: string
  js: string
  setHtml: (value: string) => void
  setCss: (value: string) => void
  setJs: (value: string) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  isDarkMode: boolean
}

export default function CodeEditor({
  html,
  css,
  js,
  setHtml,
  setCss,
  setJs,
  activeTab,
  setActiveTab,
  isDarkMode,
}: CodeEditorProps) {
  const [fontSize, setFontSize] = useState(14)

  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth < 640 ? 12 : 14)
    }

    // Set initial font size
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const editorOptions = {
    fontSize,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: "on",
    lineNumbers: "on",
    tabSize: 2,
    automaticLayout: true,
    quickSuggestions: true,
    formatOnPaste: true,
    formatOnType: true,
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    autoIndent: "full",
    renderWhitespace: "selection",
  }

  return (
    <div className="w-full md:w-1/2 flex flex-col h-[300px] sm:h-[400px] md:h-auto">
      {/* Tabs */}
      <div className="flex border-b border-[#2d2d2d] overflow-x-auto">
        {["html", "css", "js"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === tab
                ? "text-white border-b-2 border-blue-500 bg-[#2d2d2d]"
                : "text-gray-400 hover:text-gray-300 hover:bg-[#2d2d2d]"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          {activeTab === "html" && (
            <Editor
              height="100%"
              defaultLanguage="html"
              value={html}
              onChange={(value) => setHtml(value || "")}
              theme={isDarkMode ? "vs-dark" : "light"}
              options={editorOptions}
              loading={<div className="text-gray-400 p-4">Loading editor...</div>}
            />
          )}
          {activeTab === "css" && (
            <Editor
              height="100%"
              defaultLanguage="css"
              value={css}
              onChange={(value) => setCss(value || "")}
              theme={isDarkMode ? "vs-dark" : "light"}
              options={editorOptions}
              loading={<div className="text-gray-400 p-4">Loading editor...</div>}
            />
          )}
          {activeTab === "js" && (
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={js}
              onChange={(value) => setJs(value || "")}
              theme={isDarkMode ? "vs-dark" : "light"}
              options={editorOptions}
              loading={<div className="text-gray-400 p-4">Loading editor...</div>}
            />
          )}
        </div>
      </div>
    </div>
  )
}

