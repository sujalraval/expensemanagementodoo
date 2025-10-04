"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ManagerProfilePage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    const userEmail = localStorage.getItem("userEmail")
    if (role !== "manager") {
      router.push("/")
    }
    if (userEmail) {
      setEmail(userEmail)
    }
  }, [router])

  return (
    <MobileLayout role="manager">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account settings</p>
        </div>

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-6 text-white text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold">{email.charAt(0).toUpperCase()}</span>
          </div>
          <h2 className="text-xl font-bold mb-1">{email.split("@")[0]}</h2>
          <p className="text-purple-100 text-sm">Manager</p>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Account Information</h3>
            <button onClick={() => setEditing(!editing)} className="text-sm text-purple-600 font-medium">
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
                placeholder="Jane Manager"
                disabled={!editing}
                className="h-12 rounded-xl border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                Department
              </Label>
              <Input
                id="department"
                placeholder="Operations"
                disabled={!editing}
                className="h-12 rounded-xl border-gray-200"
              />
            </div>
          </div>

          {editing && (
            <Button className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium mt-4">
              Save Changes
            </Button>
          )}
        </div>

        {/* Manager Statistics */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Manager Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Total Reviewed</span>
              <span className="font-semibold text-gray-900">156</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Approved</span>
              <span className="font-semibold text-green-600">142</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Rejected</span>
              <span className="font-semibold text-red-600">14</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600">Team Members</span>
              <span className="font-semibold text-gray-900">12</span>
            </div>
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Team Performance</h3>
          <div className="space-y-3">
            {[
              { name: "John Smith", expenses: 12, amount: "$2,450", trend: "up" },
              { name: "Sarah Johnson", expenses: 8, amount: "$1,890", trend: "down" },
              { name: "Mike Chen", expenses: 15, amount: "$3,120", trend: "up" },
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.expenses} expenses</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 text-sm">{member.amount}</div>
                  <div className="flex items-center gap-1 justify-end">
                    {member.trend === "up" ? (
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
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
