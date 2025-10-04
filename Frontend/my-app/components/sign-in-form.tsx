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
    <div className="bg-gradient-to-br from-[#EEEEEE]/20 to-[#31363F]/20 rounded-3xl shadow-lg p-8 backdrop-blur-sm border border-[#EEEEEE]/30">
      <form onSubmit={handleSignIn} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-[#EEEEEE]">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 rounded-xl bg-[#EEEEEE]/10 border-[#31363F]/50 text-[#EEEEEE] placeholder-[#31363F] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300"
          />
          <p className="text-xs text-[#31363F] mt-1">
            Try: admin@company.com, manager@company.com, or employee@company.com
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-[#EEEEEE]">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 rounded-xl bg-[#EEEEEE]/10 border-[#31363F]/50 text-[#EEEEEE] placeholder-[#31363F] focus:border-[#EEEEEE] focus:ring-[#EEEEEE]/50 focus:bg-[#EEEEEE]/20 transition-all duration-300"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-[#31363F] to-[#31363F] hover:from-[#1D1616] hover:to-[#31363F] text-[#EEEEEE] rounded-xl font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#EEEEEE]/30 border-t-[#EEEEEE] rounded-full animate-spin"></div>
              Signing in...
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="mt-6 flex justify-between items-center">
        <a href="#" className="text-sm text-[#EEEEEE] hover:text-[#31363F] font-medium transition-colors duration-300">
          Forgot password?
        </a>
        <a href="/signup" className="text-sm text-[#EEEEEE] hover:text-[#31363F] font-medium transition-colors duration-300">
          Sign Up
        </a>
      </div>
    </div>
  )
}
