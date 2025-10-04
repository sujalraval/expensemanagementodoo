"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminProfilePage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    const userEmail = localStorage.getItem("userEmail")
    if (role !== "admin") {
      router.push("/")
    }
    if (userEmail) {
      setEmail(userEmail)
    }
  }, [router])

  return (
    <MobileLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account settings</p>
        </div>

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold">{email.charAt(0).toUpperCase()}</span>
          </div>
          <h2 className="text-xl font-bold mb-1">{email.split("@")[0]}</h2>
          <p className="text-gray-300 text-sm">Administrator</p>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Account Information</h3>
            <button onClick={() => setEditing(!editing)} className="text-sm text-gray-900 font-medium">
              {editing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editing}
                className="h-12 rounded-xl border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Admin User"
                disabled={!editing}
                className="h-12 rounded-xl border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                Company
              </Label>
              <Input
                id="company"
                placeholder="Acme Corporation"
                disabled={!editing}
                className="h-12 rounded-xl border-gray-200"
              />
            </div>
          </div>

          {editing && (
            <Button className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium mt-4">
              Save Changes
            </Button>
          )}
        </div>

        {/* System Statistics */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">System Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Total Users</span>
              <span className="font-semibold text-gray-900">156</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Active Rules</span>
              <span className="font-semibold text-gray-900">8</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Total Expenses (Month)</span>
              <span className="font-semibold text-gray-900">$45,230</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600">Pending Approvals</span>
              <span className="font-semibold text-orange-600">24</span>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Database</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Operational</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">API Services</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Operational</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Email Service</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Operational</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="font-semibold text-gray-900 mb-2">Settings</h3>
          <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-3 -mx-3">
            <span className="text-gray-700">System Configuration</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-3 -mx-3">
            <span className="text-gray-700">Security Settings</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-3 -mx-3">
            <span className="text-gray-700">Audit Logs</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-3 -mx-3">
            <span className="text-gray-700">Backup & Restore</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </MobileLayout>
  )
}
