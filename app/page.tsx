"use client"

import { useState, useEffect } from "react"
import CodeEditor from "@/components/code-editor"
import Preview from "@/components/preview"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { defaultHTML, defaultCSS, defaultJS } from "@/lib/default-code"

export default function Home() {
  const [html, setHtml] = useState(defaultHTML)
  const [css, setCss] = useState(defaultCSS)
  const [js, setJs] = useState(defaultJS)
  const [activeTab, setActiveTab] = useState("html")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [saveStatus, setSaveStatus] = useState("")
  const [previewContent, setPreviewContent] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set initial dark mode preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDarkMode(true)
      }

      // Load saved code
      try {
        const saved = localStorage.getItem("code-editor-state")
        if (saved) {
          const { html: savedHtml, css: savedCss, js: savedJs } = JSON.parse(saved)
          setHtml(savedHtml)
          setCss(savedCss)
          setJs(savedJs)
          // Generate initial preview
          generateOutput(savedHtml, savedCss, savedJs)
        } else {
          // Generate initial preview with default code
          generateOutput(defaultHTML, defaultCSS, defaultJS)
        }
      } catch (error) {
        console.error("Failed to load saved code:", error)
        // Generate initial preview with default code on error
        generateOutput(defaultHTML, defaultCSS, defaultJS)
      }
    }
  }, [])

  // Auto-save to localStorage when code changes
  useEffect(() => {
    const saveToLocalStorage = () => {
      try {
        localStorage.setItem("code-editor-state", JSON.stringify({ html, css, js }))
        setSaveStatus("Saved")
        setTimeout(() => setSaveStatus(""), 2000)
      } catch (error) {
        console.error("Failed to save:", error)
      }
    }

    saveToLocalStorage()
  }, [html, css, js])

  const generateOutput = (htmlCode: string, cssCode: string, jsCode: string) => {
    const combinedOutput = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `
    setPreviewContent(combinedOutput)
    setIsRunning(true)
    setTimeout(() => setIsRunning(false), 500)
  }

  const handleRun = () => {
    generateOutput(html, css, js)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        handleRun()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [html, css, js])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <Navbar
        handleRun={handleRun}
        isRunning={isRunning}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        saveStatus={saveStatus}
      />

      <div className="flex-1 flex flex-col md:flex-row bg-[#1e1e1e]">
        <CodeEditor
          html={html}
          css={css}
          js={js}
          setHtml={setHtml}
          setCss={setCss}
          setJs={setJs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
        />

        <Preview previewContent={previewContent} />
      </div>

      <Footer />
    </div>
  )
}

