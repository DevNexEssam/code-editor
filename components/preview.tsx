"use client"

import { FileCode2 } from "lucide-react"

interface PreviewProps {
  previewContent: string
}

export default function Preview({ previewContent }: PreviewProps) {
  return (
    <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-[#2d2d2d] h-[300px] sm:h-[400px] md:h-auto">
      <div className="h-full w-full p-1 sm:p-2">
        <div className="h-full bg-white dark:bg-[#2d2d2d] rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-[#3d3d3d] p-1 sm:p-2 flex items-center gap-1 sm:gap-2">
            <FileCode2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <h2 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Preview</h2>
          </div>
          <div className="p-2 sm:p-4 h-[calc(100%-2rem)] sm:h-[calc(100%-2.5rem)]">
            <iframe
              srcDoc={previewContent}
              className="w-full h-full rounded border border-gray-200 dark:border-[#3d3d3d] bg-white"
              sandbox="allow-scripts"
              title="Preview"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

