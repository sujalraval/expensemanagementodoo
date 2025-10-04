"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock authentication - determine role based on email
    setTimeout(() => {
      let role = "employee"
      if (email.includes("admin")) role = "admin"
      else if (email.includes("manager")) role = "manager"

      // Store role in localStorage for demo
      localStorage.setItem("userRole", role)
      localStorage.setItem("userEmail", email)

      // Redirect based on role
      router.push(`/${role}`)
      setLoading(false)
    }, 800)
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <form onSubmit={handleSignIn} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Try: admin@company.com, manager@company.com, or employee@company.com
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-base shadow-sm"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Forgot password?
        </a>
      </div>
    </div>
  )
}
