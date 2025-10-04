"use client"

import { useRouter, usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { OdooIcon } from "./odoo-icon"

interface MobileLayoutProps {
  children: ReactNode
  role: "admin" | "manager" | "employee"
}

export function MobileLayout({ children, role }: MobileLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const getNavItems = () => {
    if (role === "employee") {
      return [
        { icon: "home", label: "Home", path: "/employee" },
        { icon: "plus", label: "Submit", path: "/employee/submit" },
        { icon: "history", label: "History", path: "/employee/history" },
        { icon: "user", label: "Profile", path: "/employee/profile" },
      ]
    } else if (role === "manager") {
      return [
        { icon: "home", label: "Home", path: "/manager" },
        { icon: "check", label: "Approvals", path: "/manager/approvals" },
        { icon: "history", label: "History", path: "/manager/history" },
        { icon: "user", label: "Profile", path: "/manager/profile" },
      ]
    } else {
      return [
        { icon: "home", label: "Home", path: "/admin" },
        { icon: "users", label: "Users", path: "/admin/users" },
        { icon: "settings", label: "Rules", path: "/admin/rules" },
        { icon: "user", label: "Profile", path: "/admin/profile" },
      ]
    }
  }

  const navItems = getNavItems()

  const getIcon = (icon: string, isActive: boolean) => {
    const className = `w-6 h-6 ${isActive ? "text-[#EEEEEE]" : "text-[#31363F]"}`

    switch (icon) {
      case "home":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        )
      case "plus":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )
      case "check":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "history":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "users":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )
      case "settings":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      case "user":
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1D1616] via-[#31363F] to-[#31363F] pb-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#EEEEEE] rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#EEEEEE] rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-[#EEEEEE] rounded-full blur-xl"></div>
      </div>

      {/* Header */}
      <header className="glass-effect border-b border-[#EEEEEE]/20 sticky top-0 z-10 shadow-lg backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-10 rounded-xl flex items-center justify-center glass-icon">
              <OdooIcon size="md" className="w-16 h-10 rounded-lg" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#EEEEEE]">ExpenseFlow</h1>
              <p className="text-xs text-[#31363F] capitalize">{role}</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="text-sm text-[#EEEEEE] hover:text-[#31363F] font-medium transition-colors duration-300">
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 glass-effect rounded-3xl shadow-2xl relative z-10">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-[#EEEEEE]/20 safe-area-inset-bottom shadow-lg backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className="flex flex-col items-center justify-center gap-1 min-w-[60px] transition-all duration-300 hover:scale-105"
                >
                  {getIcon(item.icon, isActive)}
                  <span className={`text-xs font-medium transition-colors duration-300 ${isActive ? "text-[#EEEEEE]" : "text-[#31363F]"}`}>
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}
