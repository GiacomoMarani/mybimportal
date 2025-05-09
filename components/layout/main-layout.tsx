"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { projectConfig } from "@/config/project-config"
import { Building2, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, logout } = useAuth()

  // Stili inline per garantire che vengano applicati
  const headerStyle = {
    borderBottom: "1px solid var(--border)",
    width: "100%",
  }

  const headerContentStyle = {
    display: "flex",
    height: "4rem",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  }

  const mainStyle = {
    flex: "1",
    width: "100%",
  }

  const mainContentStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    width: "100%",
  }

  const footerStyle = {
    borderTop: "1px solid var(--border)",
    width: "100%",
    padding: "1.5rem 0",
  }

  const footerContentStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
    width: "100%",
  }

  const wrapperStyle = {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
  }

  return (
    <div style={wrapperStyle}>
      <header style={headerStyle}>
        <div style={headerContentStyle}>
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              {projectConfig.logo ? (
                <img src={projectConfig.logo || "/placeholder.svg"} alt={projectConfig.name} className="h-8 w-8" />
              ) : (
                <Building2 className="h-6 w-6" style={{ color: projectConfig.primaryColor }} />
              )}
              <span className="text-xl font-bold">{projectConfig.name}</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {projectConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-primary">
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>
      <main style={mainStyle}>
        <div style={mainContentStyle}>{children}</div>
      </main>
      <footer style={footerStyle}>
        <div style={footerContentStyle}>
          <div className="flex items-center gap-2">
            {projectConfig.logo ? (
              <img src={projectConfig.logo || "/placeholder.svg"} alt={projectConfig.name} className="h-5 w-5" />
            ) : (
              <Building2 className="h-5 w-5" style={{ color: projectConfig.primaryColor }} />
            )}
            <span className="font-medium">{projectConfig.name}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {projectConfig.client}. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  )
}
