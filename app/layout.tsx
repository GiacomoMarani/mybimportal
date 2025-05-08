import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"
import { DebugMargins } from "@/components/debug-margins"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        <DebugMargins />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
