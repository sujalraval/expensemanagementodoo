"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"

export default function ManagerDashboard() {
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "manager") {
      router.push("/")
    }
  }, [router])

  return (
    <MobileLayout role="manager">
      <div className="space-y-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Manager Dashboard</h2>
          <p className="text-purple-100">Review and approve expenses</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-orange-600">8</div>
            <div className="text-xs text-gray-600 mt-1">Pending</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">45</div>
            <div className="text-xs text-gray-600 mt-1">Approved</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-xs text-gray-600 mt-1">Rejected</div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">Pending Approvals</h3>
            <button onClick={() => router.push("/manager/approvals")} className="text-sm text-blue-600 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {[
              { employee: "John Smith", title: "Conference Travel", amount: "$850.00", date: "2 hours ago" },
              { employee: "Sarah Johnson", title: "Client Lunch", amount: "$125.00", date: "5 hours ago" },
              { employee: "Mike Chen", title: "Software License", amount: "$299.00", date: "Yesterday" },
            ].map((expense, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-900">{expense.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{expense.employee}</div>
                  </div>
                  <div className="font-bold text-gray-900">{expense.amount}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">{expense.date}</div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200">
                      Reject
                    </button>
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200">
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Overview */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Team Overview</h3>
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            {[
              { name: "John Smith", expenses: 12, amount: "$2,450" },
              { name: "Sarah Johnson", expenses: 8, amount: "$1,890" },
              { name: "Mike Chen", expenses: 15, amount: "$3,120" },
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.expenses} expenses</div>
                  </div>
                </div>
                <div className="font-semibold text-gray-900">{member.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
