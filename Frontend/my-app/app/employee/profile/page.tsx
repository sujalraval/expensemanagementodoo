"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    const userEmail = localStorage.getItem("userEmail")
    if (role !== "employee") {
      router.push("/")
    }
    if (userEmail) {
      setEmail(userEmail)
    }
  }, [router])

  return (
    <MobileLayout role="employee">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#4E56C0]">Profile</h1>
          <p className="text-[#687FE5] mt-1">Manage your account settings</p>
        </div>

        {/* Profile Header */}
        <div className="glass-effect bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white text-center shadow-lg">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold">{email.charAt(0).toUpperCase()}</span>
          </div>
          <h2 className="text-xl font-bold mb-1">{email.split("@")[0]}</h2>
          <p className="text-blue-100 text-sm">Employee</p>
        </div>

        {/* Account Information */}
        <div className="glass-effect rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Account Information</h3>
            <button onClick={() => setEditing(!editing)} className="text-sm text-blue-600 font-medium">
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
              <Input id="name" placeholder="John Doe" disabled={!editing} className="h-12 rounded-xl border-gray-200" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                Department
              </Label>
              <Input
                id="department"
                placeholder="Engineering"
                disabled={!editing}
                className="h-12 rounded-xl border-gray-200"
              />
            </div>
          </div>

          {editing && (
            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium mt-4">
              Save Changes
            </Button>
          )}
        </div>

        {/* Statistics */}
        <div className="glass-effect rounded-2xl p-5 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-4">Your Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Total Expenses</span>
              <span className="font-semibold text-gray-900">24</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-semibold text-gray-900">$3,245.50</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Approved</span>
              <span className="font-semibold text-green-600">18</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600">Pending</span>
              <span className="font-semibold text-yellow-600">6</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="glass-effect rounded-2xl p-5 shadow-lg space-y-3">
          <h3 className="font-semibold text-gray-900 mb-2">Settings</h3>
          <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-3 -mx-3">
            <span className="text-gray-700">Notifications</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-3 -mx-3">
            <span className="text-gray-700">Change Password</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-3 -mx-3">
            <span className="text-gray-700">Help & Support</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </MobileLayout>
  )
}
