"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"

export default function EmployeeDashboard() {
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "employee") {
      router.push("/")
    }
  }, [router])

  return (
    <MobileLayout role="employee">
      <div className="space-y-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
          <p className="text-blue-100">Ready to submit your expenses?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600 mt-1">Pending</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">$2,450</div>
            <div className="text-sm text-gray-600 mt-1">This Month</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/employee/submit")}
              className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Submit Expense</div>
                  <div className="text-sm text-gray-500">Add a new expense</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => router.push("/employee/history")}
              className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">View History</div>
                  <div className="text-sm text-gray-500">Track your expenses</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Recent Expenses */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Recent Expenses</h3>
          <div className="space-y-3">
            {[
              { title: "Client Dinner", amount: "$125.00", status: "Pending", date: "Today" },
              { title: "Taxi to Airport", amount: "$45.00", status: "Approved", date: "Yesterday" },
              { title: "Office Supplies", amount: "$89.50", status: "Pending", date: "2 days ago" },
            ].map((expense, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-900">{expense.title}</div>
                  <div className="font-bold text-gray-900">{expense.amount}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">{expense.date}</div>
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      expense.status === "Approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {expense.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
