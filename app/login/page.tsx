"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Building2 } from "lucide-react"
import { projectConfig } from "@/config/project"

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    setIsLoading(true)
    setError(null)

    const data = new FormData(event.target as HTMLFormElement)
    const email = data.get("email") as string
    const password = data.get("password") as string

    // Simulate an authentication delay.
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (password !== "password") {
      setError("Credenziali non valide")
      setIsLoading(false)
      return
    }

    toast({
      title: "Accesso effettuato",
      description: "Redirect alla dashboard...",
    })

    setIsLoading(false)
    router.push("/dashboard")
  }

  // In the return statement, update the outer div to ensure proper centering
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-muted/40 p-4 sm:p-6 md:p-8 lg:p-12"
      style={{ margin: "0 auto" }}
    >
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center gap-2">
              {projectConfig.logo ? (
                <img src={projectConfig.logo || "/placeholder.svg"} alt={projectConfig.name} className="h-8 w-8" />
              ) : (
                <Building2 className="h-6 w-6" style={{ color: projectConfig.primaryColor }} />
              )}
              <span className="text-xl font-bold">{projectConfig.name}</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Accedi al Progetto</CardTitle>
          <CardDescription className="text-center">
            Inserisci le tue credenziali per accedere alla piattaforma
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 px-6">
            {error && <div className="p-3 text-sm bg-destructive/15 text-destructive rounded-md">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="nome@esempio.it" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
              <p className="text-xs text-muted-foreground mt-1">
                Per questa demo, usa qualsiasi email con password: "password"
              </p>
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Accesso in corso...
                </>
              ) : (
                "Accedi"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
