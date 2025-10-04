"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "admin") {
      router.push("/")
    }
  }, [router])

  return (
    <MobileLayout role="admin">
      <div className="space-y-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Admin Control</h2>
          <p className="text-gray-300">Manage system settings</p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">156</div>
            <div className="text-sm text-gray-600 mt-1">Total Users</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">$45.2K</div>
            <div className="text-sm text-gray-600 mt-1">This Month</div>
          </div>
        </div>

        {/* Admin Actions */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Admin Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/admin/users")}
              className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Manage Users</div>
                  <div className="text-sm text-gray-500">Add, edit, or remove users</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => router.push("/admin/rules")}
              className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Approval Rules</div>
                  <div className="text-sm text-gray-500">Configure approval workflows</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: "New user added", user: "Jane Doe", time: "10 min ago" },
              { action: "Approval rule updated", user: "System", time: "1 hour ago" },
              { action: "User role changed", user: "John Smith", time: "3 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-500 mt-1">{activity.user}</div>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
