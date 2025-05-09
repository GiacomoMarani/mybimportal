import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"
import { DebugMargins } from "@/components/debug-margins"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className={inter.className} style={{ margin: 0, padding: 0, width: "100%" }}>
        <AuthProvider>{children}</AuthProvider>
        <DebugMargins />
      </body>
    </html>
  )
}
