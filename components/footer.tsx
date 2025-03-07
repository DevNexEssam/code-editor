"use client"

import Link from "next/link"
import { FaGithub } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-3 text-center text-xs sm:text-sm flex justify-center items-center gap-1 sm:gap-2">
      Developed with precision by
      <Link href="https://github.com/DevNexEssam" className="text-blue-500 flex items-center gap-1">
        Esam Mohamed <FaGithub />
      </Link>
    </footer>
  )
}

